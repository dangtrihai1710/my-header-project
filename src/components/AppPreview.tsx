import React from 'react';
import { Header1 } from './header';

interface AppPreviewProps {
  app: any;
  onEditComponent: (index: number) => void;
}

export const AppPreview: React.FC<AppPreviewProps> = ({ app, onEditComponent }) => {
  const renderComponent = (component: any, index: number) => {
    switch (component.componentName) {
      case 'Header1':
        return (
          <div key={index} className="relative group">
            <Header1
              {...component.props}
              navigate={(href: string) => console.log('Navigate to:', href)}
            />
            <button
              onClick={() => onEditComponent(index)}
              className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Chỉnh sửa
            </button>
          </div>
        );
      default:
        return (
          <div key={index} className="p-4 bg-gray-200 rounded relative group">
            <p>Unknown component: {component.componentName}</p>
            <button
              onClick={() => onEditComponent(index)}
              className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Chỉnh sửa
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gray-800 text-white p-4">
        <h3 className="text-lg font-bold">{app.appName}</h3>
        <p className="text-sm opacity-90">{app.description}</p>
      </div>
      
      <div className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Mobile preview frame */}
          <div className="relative" style={{ aspectRatio: '9/16' }}>
            {app.components && app.components.length > 0 ? (
              app.components.map((component: any, index: number) => 
                renderComponent(component, index)
              )
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                <p>Chưa có component nào</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};