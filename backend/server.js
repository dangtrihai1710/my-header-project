const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { OpenAI } = require('openai');
const { MongoClient } = require('mongodb');
const { MongoVectorStore } = require('langchain/vectorstores/mongodb');
const { OpenAIEmbeddings } = require('langchain/embeddings/openai');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mobile-app-builder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// OpenAI setup
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const embeddings = new OpenAIEmbeddings({
  openAIApiKey: process.env.OPENAI_API_KEY,
});

// Vector store setup
const vectorStore = new MongoVectorStore(embeddings, {
  collection: 'component_embeddings',
  mongodbConfig: {
    uri: 'mongodb://localhost:27017/mobile-app-builder',
    dbName: 'mobile-app-builder',
  },
});

// Component Schema
const ComponentSchema = new mongoose.Schema({
  name: String,
  type: String,
  description: String,
  props: Object,
  defaultProps: Object,
  code: String,
  embedding: [Number],
  category: String,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

const Component = mongoose.model('Component', ComponentSchema);

// Generated App Schema
const GeneratedAppSchema = new mongoose.Schema({
  userId: String,
  name: String,
  description: String,
  components: [{
    componentId: String,
    props: Object,
    position: Number,
    style: Object,
  }],
  layout: Object,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const GeneratedApp = mongoose.model('GeneratedApp', GeneratedAppSchema);

// Routes
app.post('/api/components/seed', async (req, res) => {
  try {
    // Seed components from your existing code
    const components = [
      {
        name: 'Header1',
        type: 'header',
        description: 'Header component với search bar và cart icon',
        props: {
          visible: 'boolean',
          settings: 'object',
          cartLength: 'number',
          navigate: 'function',
          goBack: 'function',
        },
        defaultProps: {
          visible: true,
          settings: {
            title: 'Header',
            visibleSearchBar: true,
            visibleCartIcon: true,
            placeholderSearchBar: 'Tìm kiếm...',
          },
          cartLength: 0,
        },
        code: `// Header1 component code here`,
        category: 'navigation',
        tags: ['header', 'navigation', 'search', 'cart'],
      },
      // Add more components here
    ];

    for (const comp of components) {
      const embedding = await embeddings.embedQuery(
        `${comp.name} ${comp.description} ${comp.tags.join(' ')}`
      );
      
      const component = new Component({
        ...comp,
        embedding,
      });
      
      await component.save();
    }

    res.json({ message: 'Components seeded successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/generate-app', async (req, res) => {
  try {
    const { userRequest, userId } = req.body;
    
    // Generate embedding for user request
    const queryEmbedding = await embeddings.embedQuery(userRequest);
    
    // Search for relevant components
    const similarComponents = await vectorStore.similaritySearch(userRequest, 5);
    
    // Generate app structure using OpenAI
    const prompt = `
    Người dùng yêu cầu: "${userRequest}"
    
    Các component có sẵn:
    ${similarComponents.map(comp => `
    - ${comp.metadata.name}: ${comp.metadata.description}
    - Props: ${JSON.stringify(comp.metadata.props)}
    - Default Props: ${JSON.stringify(comp.metadata.defaultProps)}
    `).join('\n')}
    
    Hãy tạo ra một mobile app layout sử dụng các component này. Trả về JSON với format:
    {
      "appName": "tên app",
      "description": "mô tả app",
      "layout": {
        "screens": [
          {
            "name": "screen name",
            "components": [
              {
                "componentName": "tên component",
                "props": { "prop1": "value1" },
                "position": 0,
                "style": { "margin": "10px" }
              }
            ]
          }
        ]
      }
    }
    
    Chỉ sử dụng các component có sẵn và chỉ thay đổi props, không thay đổi cấu trúc.
    `;
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
    });
    
    const appStructure = JSON.parse(response.choices[0].message.content);
    
    // Save generated app
    const generatedApp = new GeneratedApp({
      userId,
      name: appStructure.appName,
      description: appStructure.description,
      components: appStructure.layout.screens.flatMap(screen => screen.components),
      layout: appStructure.layout,
    });
    
    await generatedApp.save();
    
    res.json({
      appId: generatedApp._id,
      ...appStructure,
    });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/apps/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const apps = await GeneratedApp.find({ userId });
    res.json(apps);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/apps/:appId/component/:componentIndex', async (req, res) => {
  try {
    const { appId, componentIndex } = req.params;
    const { props, style } = req.body;
    
    const app = await GeneratedApp.findById(appId);
    if (!app) {
      return res.status(404).json({ error: 'App not found' });
    }
    
    // Chỉ cho phép sửa props và style
    if (app.components[componentIndex]) {
      app.components[componentIndex].props = { ...app.components[componentIndex].props, ...props };
      app.components[componentIndex].style = { ...app.components[componentIndex].style, ...style };
      app.updatedAt = new Date();
      
      await app.save();
    }
    
    res.json(app);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});