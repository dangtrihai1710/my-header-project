import React, { useState } from 'react';

interface ComponentEditorProps {
  component: any;
  onUpdate: (props: any, style: any) => void;
  onClose: () => void;
}

export const ComponentEditor: React.FC<ComponentEditorProps> = ({ 
  component, 
  onUpdate, 
  onClose 
}) => {
  const [props, setProps] = useState(component.props || {});
  const [style, setStyle] = useState(component.style || {});

  const handlePropChange = (key: string, value: any) => {
    setProps((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleStyleChange = (key: string, value: any) => {
    setStyle((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onUpdate(props, style);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full m-4">
        <h3 className="text-lg font-bold mb-4">Chỉnh sửa Component</h3>
        
        <div className="space-y-4">
          {/* Props Editor */}
          <div>
            <h4 className="font-semibold mb-2">Properties</h4>
            {Object.entries(props).map(([key, value]) => (
              <div key={key} className="mb-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {key}
                </label>
                {typeof value === 'boolean' ? (
                  <input
                    type="checkbox"
                    checked={value as boolean}
                    onChange={(e) => handlePropChange(key, e.target.checked)}
                    className="rounded"
                  />
                ) : typeof value === 'string' ? (
                  <input
                    type="text"
                    value={value as string}
                    onChange={(e) => handlePropChange(key, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : typeof value === 'number' ? (
                  <input
                    type="number"
                    value={value as number}
                    onChange={(e) => handlePropChange(key, Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <textarea
                    value={JSON.stringify(value, null, 2)}
                    onChange={(e) => {
                      try {
                        handlePropChange(key, JSON.parse(e.target.value));
                      } catch (error) {
                        console.error('Invalid JSON:', error);
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                )}
              </div>
            ))}
          </div>
          
          {/* Style Editor */}
          <div>
            <h4 className="font-semibold mb-2">Styles</h4>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Margin
                </label>
                <input
                  type="text"
                  value={(style.margin as string) || ''}
                  onChange={(e) => handleStyleChange('margin', e.target.value)}
                  placeholder="10px"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Padding
                </label>
                <input
                  type="text"
                  value={(style.padding as string) || ''}
                  onChange={(e) => handleStyleChange('padding', e.target.value)}
                  placeholder="10px"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};