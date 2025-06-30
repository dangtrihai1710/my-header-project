/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';
import { defaultHeader5, HeaderContainerProps } from './helper';
import SearchBar from './SearchBar';

// Mock icons để thay thế cho lucide-react
const ArrowLeft = ({ size }: { size: number }) => (
  <div style={{ fontSize: size * 0.8 }}>←</div>
);

const Home = ({ size }: { size: number }) => (
  <div style={{ fontSize: size * 0.8 }}>🏠</div>
);

const Search = ({ size }: { size: number }) => (
  <div style={{ fontSize: size * 0.8 }}>🔍</div>
);

const Buy = ({ size }: { size: number }) => (
  <div style={{ fontSize: size * 0.8 }}>🛒</div>
);

// Component IconButton cho Header5
interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
}

const IconButton: React.FC<IconButtonProps> = ({ icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: 'pointer',
        padding: '8px',
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        border: '1px solid rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 40,
        height: 40,
      }}
    >
      {icon}
    </div>
  );
};

const Header5: FC<HeaderContainerProps> = (props) => {
  const { visible, settings, cartLength, navigate, goBack } = props;

  const {
    margin,
    padding,
    border,
    borderRadius,
    boxShadow,
    visibleTitle,
    title,
    colorTitle,
    fontSizeTitle,
    visibleCartIcon,
    visibleSearchIcon,
    visibleSearchBar,
    visibleLeftIcon,
    placeholderSearchBar,
    visibleFilterIcon,
  } = settings || defaultHeader5.settings;

  if (!visible) return null;

  return (
    <div
      style={{
        margin,
        padding,
        border,
        borderRadius,
        boxShadow,
        background: 'white',
      }}
    >
      {visibleLeftIcon && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: visibleTitle ? 8 : 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <IconButton
              icon={<ArrowLeft size={18} />}
              onClick={() => !!goBack && goBack()}
            />
            <div
              style={{
                width: 1,
                height: '60%',
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
              }}
            />
            {!visibleCartIcon && !visibleSearchIcon && (
              <IconButton
                icon={<Home size={18} />}
                onClick={() => !!navigate && navigate('/home')}
              />
            )}
            {visibleSearchIcon && (
              <IconButton
                icon={<Search size={18} />}
                onClick={() => !!navigate && navigate('/search')}
              />
            )}
            {visibleCartIcon && (
              <IconButton
                icon={<Buy size={18} />}
                onClick={() => !!navigate && navigate('/cart')}
              />
            )}
          </div>
        </div>
      )}
      {visibleTitle && (
        <div
          className='body-medium-medium text-center mt-2'
          style={{
            color: colorTitle,
            fontSize: fontSizeTitle,
            textAlign: 'center',
            marginTop: 8,
          }}
        >
          {title}
        </div>
      )}
      {visibleSearchBar && (
        <div style={{ marginTop: 8 }}>
          <SearchBar
            placeholderSearchBar={placeholderSearchBar}
            visibleFilterIcon={visibleFilterIcon}
            onClick={(href: string) => !!navigate && navigate(href)}
          />
        </div>
      )}
    </div>
  );
};

export default Header5;