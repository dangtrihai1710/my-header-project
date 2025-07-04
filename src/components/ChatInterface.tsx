import React, { useState } from 'react';
import { AppPreview } from './AppPreview';
import { ComponentEditor } from './ComponentEditor';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface GeneratedApp {
  appId: string;
  appName: string;
  description: string;
  layout: any;
  components: any[];
}

export const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedApp, setGeneratedApp] = useState<GeneratedApp | null>(null);
  const [selectedComponent, setSelectedComponent] = useState<any>(null);
  const [userId] = useState('user-' + Date.now()); // Mock user ID

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/generate-app', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userRequest: inputText,
          userId,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        const botMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: `Tôi đã tạo ra mobile app "${data.appName}" cho bạn! ${data.description}`,
          isUser: false,
          timestamp: new Date(),
        };

        setMessages(prev => [...prev, botMessage]);
        setGeneratedApp(data);
      } else {
        throw new Error(data.error || 'Đã có lỗi xảy ra');
      }
    } catch (error: any) { // Fixed: Added type annotation
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: `Xin lỗi, có lỗi xảy ra: ${error?.message || 'Lỗi không xác định'}`,
        isUser: false,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditComponent = (componentIndex: number) => {
    if (generatedApp) {
      setSelectedComponent({
        ...generatedApp.components[componentIndex],
        index: componentIndex,
      });
    }
  };

  const handleUpdateComponent = async (props: any, style: any) => {
    if (!generatedApp || selectedComponent === null) return;

    try {
      const response = await fetch(`/api/apps/${generatedApp.appId}/component/${selectedComponent.index}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ props, style }),
      });

      if (response.ok) {
        const updatedApp = await response.json();
        setGeneratedApp(prev => prev ? { ...prev, components: updatedApp.components } : null);
        setSelectedComponent(null);
      }
    } catch (error) {
      console.error('Error updating component:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Chat Panel */}
      <div className="w-1/2 flex flex-col border-r border-gray-300">
        <div className="bg-blue-600 text-white p-4">
          <h2 className="text-xl font-bold">AI Mobile App Builder</h2>
          <p className="text-sm opacity-90">Mô tả ứng dụng bạn muốn tạo</p>
        </div>
        
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map(message => (
            <div key={message.id} className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                message.isUser 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-800 border border-gray-300'
              }`}>
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white text-gray-800 border border-gray-300 px-4 py-2 rounded-lg">
                <p className="text-sm">Đang tạo ứng dụng...</p>
              </div>
            </div>
          )}
        </div>
        
        {/* Input */}
        <div className="p-4 border-t border-gray-300">
          <div className="flex space-x-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Mô tả ứng dụng bạn muốn tạo..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={isLoading}
            />
            <button
              onClick={handleSendMessage}
              disabled={isLoading || !inputText.trim()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              Gửi
            </button>
          </div>
        </div>
      </div>
      
      {/* Preview Panel */}
      <div className="w-1/2 flex flex-col">
        {generatedApp ? (
          <AppPreview 
            app={generatedApp} 
            onEditComponent={handleEditComponent}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500">
            <p>Ứng dụng sẽ được hiển thị ở đây sau khi tạo</p>
          </div>
        )}
      </div>
      
      {/* Component Editor Modal */}
      {selectedComponent && (
        <ComponentEditor
          component={selectedComponent}
          onUpdate={handleUpdateComponent}
          onClose={() => setSelectedComponent(null)}
        />
      )}
    </div>
  );
};