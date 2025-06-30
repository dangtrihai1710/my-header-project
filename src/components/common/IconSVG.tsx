import React from 'react';

export const Icons = {
  search: 'search',
  cart: 'cart',
  chat: 'chat'
} as const;

interface IconSVGProps {
  name: keyof typeof Icons;
  size?: number;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

const IconSVG: React.FC<IconSVGProps> = ({ 
  name, 
  size = 24, 
  color = '#000', 
  className 
}) => {
  return (
    <div style={{ 
      width: size, 
      height: size, 
      backgroundColor: color,
      borderRadius: '50%' 
    }} className={className}>
      {name}
    </div>
  );
};

export default IconSVG;