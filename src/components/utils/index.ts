// src/components/utils/index.ts

// Export type BoxShadowType để fix lỗi import
export type BoxShadowType = string;

export const isZaloPlatform = false; // Mock value for testing

export const convertBackground = (background?: string): string => {
  if (!background) return 'transparent';
  return background;
};

// Thêm các utils khác nếu cần
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

export const debounce = (func: Function, wait: number) => {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Thêm các utility functions khác
export const generateBoxShadow = (
  offsetX: number = 0,
  offsetY: number = 2,
  blurRadius: number = 4,
  spreadRadius: number = 0,
  color: string = 'rgba(0, 0, 0, 0.1)'
): BoxShadowType => {
  return `${offsetX}px ${offsetY}px ${blurRadius}px ${spreadRadius}px ${color}`;
};

export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Color utilities
export const hexToRgba = (hex: string, alpha: number = 1): string => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Platform detection
export const isMobileDevice = (): boolean => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

export const isTabletDevice = (): boolean => {
  return /iPad|Android(?=.*\bMobile\b)(?=.*\bSafari\b)|KFAPWI|LG-V500|SAMSUNG|BGP|Sony|ASUSTeK/i.test(
    navigator.userAgent
  );
};