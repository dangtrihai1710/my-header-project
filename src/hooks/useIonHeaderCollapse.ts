// src/hooks/useIonHeaderCollapse.ts
import { useRef } from 'react';

// Tạo interface cho HTMLIonHeaderElement thay vì sử dụng type không tồn tại
interface HTMLIonHeaderElement extends HTMLElement {
  // Thêm các properties riêng của Ion Header nếu cần
  translucent?: boolean;
  collapse?: string;
}

export const useIonHeaderCollapse = () => {
  const ref = useRef<HTMLIonHeaderElement>(null);
  
  return {
    ref
  };
};