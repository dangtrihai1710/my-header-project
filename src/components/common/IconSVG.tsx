import React from 'react';

export const Icons = {
  search: 'search',
  cart: 'cart',
  chat: 'chat',
  arrowLeft: 'arrow-left',
  close: 'close'
} as const;

interface IconSVGProps {
  name: keyof typeof Icons;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
  onClick?: () => void;
}

const IconSVG: React.FC<IconSVGProps> = ({ 
  name, 
  size = 24, 
  color = '#000', 
  className,
  onClick 
}) => {
  const getIcon = () => {
    switch (name) {
      case 'search':
        return '🔍';
      case 'cart':
        return '🛒';
      case 'chat':
        return '💬';
      case 'arrowLeft':
        return '←';
      case 'close':
        return '✕';
      default:
        return '?';
    }
  };

  return (
    <div 
      style={{ 
        width: size, 
        height: size, 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.7,
        cursor: onClick ? 'pointer' : 'default',
        color: color
      }} 
      className={className}
      onClick={onClick}
    >
      {getIcon()}
    </div>
  );
};

export default IconSVG;