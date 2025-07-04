// src/components/ProductCard.tsx
import React from 'react';

type Product = {
  name: string;
  price: number;
  image?: string;
  originalPrice?: number;
  discount?: string;
}

type ProductCardProps = {
  product: Product;
  showDiscount?: boolean;
  onAddToCart?: () => void;
  onViewDetail?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product = {
    name: 'Sản phẩm mẫu',
    price: 100000,
    image: '/placeholder.jpg'
  },
  showDiscount = true,
  onAddToCart = () => console.log('Add to cart clicked'),
  onViewDetail = () => console.log('View detail clicked')
}) => {
  const formatPrice = (price: number) => {
    return price.toLocaleString('vi-VN') + 'đ';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 max-w-sm">
      {/* Product Image */}
      <div className="relative mb-3">
        <div className="w-full h-40 bg-gray-200 rounded-lg flex items-center justify-center">
          {product.image ? (
            <img 
              src={product.image} 
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                target.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className="text-gray-400 text-4xl">📦</div>
        </div>
        
        {/* Discount Badge */}
        {showDiscount && product.originalPrice && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">
          {product.name}
        </h3>
        
        <div className="flex items-center space-x-2">
          <span className="text-lg font-bold text-red-600">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
        
        {/* Rating */}
        <div className="flex items-center space-x-1">
          <div className="flex text-yellow-400 text-sm">
            ⭐⭐⭐⭐⭐
          </div>
          <span className="text-xs text-gray-500">(4.5)</span>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-2 pt-2">
          <button
            onClick={onViewDetail}
            className="flex-1 py-2 border border-blue-600 text-blue-600 rounded text-sm font-medium hover:bg-blue-50 transition-colors"
          >
            Xem chi tiết
          </button>
          <button
            onClick={onAddToCart}
            className="flex-1 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Thêm vào giỏ
          </button>
        </div>
      </div>
    </div>
  );
};