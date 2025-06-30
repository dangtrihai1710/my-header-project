import { useRef } from 'react';

export const useIonHeaderCollapse = () => {
  const ref = useRef<HTMLIonHeaderElement>(null);
  
  return {
    ref
  };
};