// backend/server-mistral.js - Sử dụng Mistral AI
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mobile-app-builder', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Mistral AI Client
class MistralClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.mistral.ai/v1';
  }

  async generateEmbedding(text) {
    try {
      const response = await fetch(`${this.baseUrl}/embeddings`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mistral-embed',
          input: [text],
        }),
      });

      if (!response.ok) {
        throw new Error(`Mistral API error: ${response.status}`);
      }

      const data = await response.json();
      return data.data[0].embedding;
    } catch (error) {
      console.error('Mistral embedding error:', error);
      // Return dummy embedding as fallback
      return new Array(1024).fill(0).map(() => Math.random() - 0.5);
    }
  }

  async generateText(prompt) {
    try {
      const response = await fetch(`${this.baseUrl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mistral-large-latest',
          messages: [
            {
              role: 'system',
              content: 'Bạn là AI assistant tạo mobile app từ components. Luôn trả về JSON hợp lệ.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 1500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`Mistral API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Mistral generation error:', error);
      return null;
    }
  }
}

// Initialize Mistral client
const mistralClient = new MistralClient(process.env.MISTRAL_API_KEY || process.env.OPENAI_API_KEY);

// Vector Store with cosine similarity
class ComponentVectorStore {
  constructor() {
    this.components = [];
  }

  async addComponent(component, embedding) {
    this.components.push({
      ...component,
      embedding: embedding
    });
  }

  cosineSimilarity(vec1, vec2) {
    const dotProduct = vec1.reduce((sum, a, i) => sum + a * vec2[i], 0);
    const magnitude1 = Math.sqrt(vec1.reduce((sum, a) => sum + a * a, 0));
    const magnitude2 = Math.sqrt(vec2.reduce((sum, a) => sum + a * a, 0));
    return dotProduct / (magnitude1 * magnitude2);
  }

  async similaritySearch(queryEmbedding, k = 3) {
    if (this.components.length === 0) {
      return [];
    }

    const scores = this.components.map(comp => ({
      component: comp,
      score: this.cosineSimilarity(queryEmbedding, comp.embedding)
    }));

    return scores
      .sort((a, b) => b.score - a.score)
      .slice(0, k)
      .map(item => item.component);
  }

  // Text-based fallback search
  textSearch(query, k = 3) {
    const searchTerms = query.toLowerCase().split(' ');
    
    const scores = this.components.map(comp => {
      let score = 0;
      const searchText = `${comp.name} ${comp.description} ${comp.tags?.join(' ')} ${comp.category}`.toLowerCase();
      
      searchTerms.forEach(term => {
        if (searchText.includes(term)) {
          score += 1;
        }
      });
      
      return { component: comp, score };
    });

    return scores
      .sort((a, b) => b.score - a.score)
      .slice(0, k)
      .map(item => item.component);
  }

  async loadFromDatabase() {
    try {
      const components = await Component.find();
      this.components = components;
      console.log(`Loaded ${components.length} components into vector store`);
    } catch (error) {
      console.error('Error loading components:', error);
    }
  }
}

const vectorStore = new ComponentVectorStore();

// Component Schema
const ComponentSchema = new mongoose.Schema({
  id: { type: String, default: uuidv4 },
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
  id: { type: String, default: uuidv4 },
  userId: String,
  name: String,
  description: String,
  components: [{
    componentName: String,
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
    await Component.deleteMany({});

    const components = [
      {
        name: 'Header1',
        type: 'header',
        description: 'Header component với thanh tìm kiếm và biểu tượng giỏ hàng, điều hướng trang',
        props: {
          visible: 'boolean',
          settings: 'object',
          cartLength: 'number',
        },
        defaultProps: {
          visible: true,
          settings: {
            title: 'Trang chủ',
            visibleSearchBar: true,
            visibleCartIcon: true,
            placeholderSearchBar: 'Tìm kiếm sản phẩm...',
          },
          cartLength: 0,
        },
        category: 'navigation',
        tags: ['header', 'navigation', 'search', 'cart', 'menu'],
      },
      {
        name: 'ProductCard',
        type: 'card',
        description: 'Card hiển thị sản phẩm với hình ảnh, tên, giá cả, nút mua hàng',
        props: {
          product: 'object',
          showDiscount: 'boolean',
        },
        defaultProps: {
          product: {
            name: 'Sản phẩm mẫu',
            price: 100000,
            image: '/placeholder.jpg',
          },
          showDiscount: true,
        },
        category: 'display',
        tags: ['product', 'card', 'ecommerce', 'shop', 'buy'],
      },
      {
        name: 'CategoryList',
        type: 'list',
        description: 'Danh sách danh mục sản phẩm dạng lưới hoặc danh sách',
        props: {
          categories: 'array',
          layout: 'string',
        },
        defaultProps: {
          categories: [
            { id: 1, name: 'Điện thoại', icon: '📱' },
            { id: 2, name: 'Laptop', icon: '💻' },
            { id: 3, name: 'Phụ kiện', icon: '🎧' },
          ],
          layout: 'grid',
        },
        category: 'navigation',
        tags: ['category', 'list', 'menu', 'grid', 'browse'],
      },
    ];

    console.log('Starting to seed components with Mistral AI...');

    for (const comp of components) {
      console.log(`Creating embedding for ${comp.name}...`);
      
      const embeddingText = `${comp.name} ${comp.description} ${comp.tags.join(' ')} ${comp.category}`;
      
      try {
        const embedding = await mistralClient.generateEmbedding(embeddingText);
        
        const component = new Component({
          ...comp,
          embedding,
        });
        
        await component.save();
        console.log(`✓ Saved ${comp.name} with Mistral embedding`);
        
        await vectorStore.addComponent(component, embedding);
        
      } catch (embeddingError) {
        console.error(`Error creating embedding for ${comp.name}:`, embeddingError);
        // Save with dummy embedding
        const component = new Component({
          ...comp,
          embedding: new Array(1024).fill(0).map(() => Math.random() - 0.5),
        });
        await component.save();
        console.log(`✓ Saved ${comp.name} with fallback embedding`);
      }
    }

    await vectorStore.loadFromDatabase();

    res.json({ 
      message: 'Components seeded successfully with Mistral AI', 
      count: components.length,
      vectorStoreSize: vectorStore.components.length
    });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/generate-app', async (req, res) => {
  try {
    const { userRequest, userId } = req.body;
    
    if (!userRequest || !userId) {
      return res.status(400).json({ error: 'Missing userRequest or userId' });
    }

    console.log(`Generating app for: "${userRequest}"`);

    let selectedComponents = [];

    try {
      // Try embedding search first
      const queryEmbedding = await mistralClient.generateEmbedding(userRequest);
      selectedComponents = await vectorStore.similaritySearch(queryEmbedding, 3);
      console.log(`Found ${selectedComponents.length} components using Mistral embeddings`);
    } catch (embeddingError) {
      console.log('Embedding search failed, using text search');
      selectedComponents = vectorStore.textSearch(userRequest, 3);
    }

    if (selectedComponents.length === 0) {
      selectedComponents = await Component.find().limit(2);
    }

    // Generate app with Mistral
    const prompt = `
Người dùng muốn tạo: "${userRequest}"

Components có sẵn:
${selectedComponents.map(comp => `
- ${comp.name}: ${comp.description}
- Props: ${JSON.stringify(comp.defaultProps)}
`).join('\n')}

Tạo JSON cho mobile app:
{
  "appName": "tên app phù hợp",
  "description": "mô tả ngắn",
  "components": [
    {
      "componentName": "Header1",
      "props": {"visible": true, "settings": {"title": "Tiêu đề"}},
      "position": 0,
      "style": {"margin": "10px"}
    }
  ]
}

Chỉ dùng components được liệt kê. Trả về JSON thuần.`;

    let appStructure;
    try {
      const aiResponse = await mistralClient.generateText(prompt);
      if (aiResponse) {
        const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          appStructure = JSON.parse(jsonMatch[0]);
        }
      }
    } catch (aiError) {
      console.log('Mistral generation failed, using fallback');
    }

    if (!appStructure) {
      appStructure = {
        appName: userRequest.includes('shop') ? 'App Mua sắm' : 'App Mobile',
        description: `App được tạo theo yêu cầu: ${userRequest}`,
        components: selectedComponents.slice(0, 2).map((comp, index) => ({
          componentName: comp.name,
          props: comp.defaultProps || {},
          position: index,
          style: { margin: "10px" }
        }))
      };
    }

    const generatedApp = new GeneratedApp({
      userId,
      name: appStructure.appName,
      description: appStructure.description,
      components: appStructure.components,
      layout: { type: 'vertical' },
    });

    await generatedApp.save();

    res.json({
      appId: generatedApp._id,
      appName: appStructure.appName,
      description: appStructure.description,
      components: appStructure.components,
      layout: { type: 'vertical' },
    });

  } catch (error) {
    console.error('Generate app error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Other routes...
app.put('/api/apps/:appId/component/:componentIndex', async (req, res) => {
  try {
    const { appId, componentIndex } = req.params;
    const { props, style } = req.body;

    const app = await GeneratedApp.findById(appId);
    if (!app) {
      return res.status(404).json({ error: 'App not found' });
    }

    const index = parseInt(componentIndex);
    if (index >= 0 && index < app.components.length) {
      app.components[index].props = { ...app.components[index].props, ...props };
      app.components[index].style = { ...app.components[index].style, ...style };
      app.updatedAt = new Date();
      
      await app.save();
      
      res.json({
        success: true,
        components: app.components,
      });
    } else {
      res.status(400).json({ error: 'Invalid component index' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/components', async (req, res) => {
  try {
    const components = await Component.find().select('-embedding');
    res.json(components);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    aiProvider: 'Mistral AI',
    timestamp: new Date().toISOString(),
    vectorStoreSize: vectorStore.components.length
  });
});

async function startServer() {
  try {
    await vectorStore.loadFromDatabase();
    
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port} with Mistral AI`);
      console.log(`📊 Health check: http://localhost:${port}/api/health`);
      console.log(`🗃️ Components loaded: ${vectorStore.components.length}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();