// src/components/AppPreview.tsx - Updated
import React from 'react';
import { Header1 } from './header';
import { ProductCard } from './ProductCard';

type AppPreviewProps = {
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
              className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              ✏️ Sửa
            </button>
          </div>
        );
        
      case 'ProductCard':
        return (
          <div key={index} className="relative group p-4">
            <ProductCard
              {...component.props}
              onAddToCart={() => console.log('Add to cart')}
              onViewDetail={() => console.log('View detail')}
            />
            <button
              onClick={() => onEditComponent(index)}
              className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              ✏️ Sửa
            </button>
          </div>
        );
        
      case 'CategoryList':
        return (
          <div key={index} className="relative group p-4">
            <div className="bg-white rounded-lg shadow p-4">
              <h3 className="font-semibold mb-3">Danh mục sản phẩm</h3>
              <div className="grid grid-cols-3 gap-3">
                {(component.props?.categories || [
                  { id: 1, name: 'Điện thoại', icon: '📱' },
                  { id: 2, name: 'Laptop', icon: '💻' },
                  { id: 3, name: 'Phụ kiện', icon: '🎧' },
                ]).map((cat: any) => (
                  <div key={cat.id} className="text-center p-3 bg-gray-50 rounded-lg hover:bg-blue-50 cursor-pointer transition-colors">
                    <div className="text-2xl mb-1">{cat.icon}</div>
                    <div className="text-xs font-medium">{cat.name}</div>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={() => onEditComponent(index)}
              className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              ✏️ Sửa
            </button>
          </div>
        );
        
      case 'SearchBar':
        return (
          <div key={index} className="relative group p-4">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder={component.props?.placeholder || 'Tìm kiếm...'}
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  🔍
                </button>
              </div>
              {component.props?.suggestions && (
                <div className="mt-2 space-y-1">
                  {component.props.suggestions.slice(0, 3).map((suggestion: string, i: number) => (
                    <div key={i} className="text-xs text-gray-600 px-2 py-1 bg-gray-50 rounded cursor-pointer hover:bg-gray-100">
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => onEditComponent(index)}
              className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              ✏️ Sửa
            </button>
          </div>
        );
        
      case 'UserProfile':
        return (
          <div key={index} className="relative group p-4">
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                  {component.props?.user?.name?.charAt(0) || 'U'}
                </div>
                <div>
                  <div className="font-semibold text-sm">{component.props?.user?.name || 'Người dùng'}</div>
                  <div className="text-xs text-gray-500">{component.props?.user?.email || 'user@email.com'}</div>
                </div>
              </div>
              {component.props?.showActions && (
                <div className="mt-3 space-y-2">
                  <button className="w-full py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded px-2">
                    📝 Chỉnh sửa thông tin
                  </button>
                  <button className="w-full py-2 text-left text-sm text-gray-700 hover:bg-gray-50 rounded px-2">
                    🚪 Đăng xuất
                  </button>
                </div>
              )}
            </div>
            <button
              onClick={() => onEditComponent(index)}
              className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              ✏️ Sửa
            </button>
          </div>
        );
        
      default:
        return (
          <div key={index} className="relative group p-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="text-yellow-700 font-medium">⚠️ Unknown component: {component.componentName}</div>
              <div className="text-yellow-600 text-sm mt-1">Component này chưa được implement</div>
            </div>
            <button
              onClick={() => onEditComponent(index)}
              className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              ✏️ Sửa
            </button>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* App Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <h3 className="text-lg font-bold">{app.appName}</h3>
        <p className="text-sm opacity-90">{app.description}</p>
        <div className="text-xs mt-1 opacity-75">
          Components: {app.components?.length || 0}
        </div>
      </div>
      
      {/* Mobile Preview Frame */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-4">
        <div className="max-w-sm mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
          {/* Phone Frame */}
          <div className="relative bg-black rounded-2xl p-2">
            <div className="bg-white rounded-xl overflow-hidden" style={{ aspectRatio: '9/16', minHeight: '600px' }}>
              {/* Status Bar */}
              <div className="bg-gray-50 px-4 py-1 flex justify-between items-center text-xs">
                <span>9:41</span>
                <span>100% 🔋</span>
              </div>
              
              {/* App Content */}
              <div className="flex-1">
                {app.components && app.components.length > 0 ? (
                  <div className="space-y-0">
                    {app.components.map((component: any, index: number) => 
                      renderComponent(component, index)
                    )}
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <div className="text-center">
                      <div className="text-4xl mb-2">📱</div>
                      <p className="text-sm">Chưa có component nào</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Instructions */}
        <div className="text-center mt-4 text-sm text-gray-500">
          💡 Hover vào component để chỉnh sửa
        </div>
      </div>
    </div>
  );
};