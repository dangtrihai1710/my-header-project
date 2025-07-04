// src/components/header/types.ts
export type HeaderSettings = {
  title?: string;
  visibleSearchBar?: boolean;
  visibleCartIcon?: boolean;
  placeholderSearchBar?: string;
  background?: string;
  translucent?: boolean;
}

export type HeaderContainerProps = {
  visible?: boolean;
  settings: HeaderSettings;
  cartLength?: number;
  navigate?: (href: string) => void;
  goBack?: () => void;
  logo?: string;
  style?: React.CSSProperties;
}

export type Header1Props = HeaderContainerProps;