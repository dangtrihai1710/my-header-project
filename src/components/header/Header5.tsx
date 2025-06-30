/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'
// import { Buy, ChevronLeft, Home, Search } from 'react-iconly' // Comment out if not installed
import { HeaderContainerProps, defaultHeader5 } from './helper'
import SearchBar from './SearchBar'
import classNames from 'classnames'
import { AppEnvironment } from '@helpers/linkApp'

// Mock react-iconly icons if package is not installed
const Buy: FC<{ size?: number }> = ({ size = 24 }) => (
  <div style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    🛒
  </div>
);

const ChevronLeft: FC<{ size?: number }> = ({ size = 24 }) => (
  <div style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    ←
  </div>
);

const Home: FC<{ size?: number }> = ({ size = 24 }) => (
  <div style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    🏠
  </div>
);

const Search: FC<{ size?: number }> = ({ size = 24 }) => (
  <div style={{ width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    🔍
  </div>
);

// Component IconButton cho Header5
interface IconButtonProps {
  icon: React.ReactNode
  onClick: () => void
}

const IconButton: FC<IconButtonProps> = ({ icon, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: 'pointer',
        padding: '4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {icon}
    </div>
  )
}

const Header5: FC<HeaderContainerProps> = (props) => {
  const { settings, cartLength, navigate, goBack } = props
  const isAiminiPlatform =
    new URLSearchParams(window.location.search).get('aimini_app_env') ===
    AppEnvironment.Aimini

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
    placeholderSearchBar,
    visibleFilterIcon,
    visibleLeftIcon = true,
  } = settings || defaultHeader5.settings

  const headerStyle = {
    margin,
    padding,
    background: 'transparent',
    border,
    borderRadius,
    boxShadow,
  }

  return (
    <div style={headerStyle}>
      {visibleLeftIcon && (
        <div className='d-flex align-items-center gap-2'>
          <div
            className='d-flex align-items-center justify-content-evenly rounded-pill'
            style={{
              width: 80,
              height: 34,
              border: '1px solid rgba(0, 0, 0, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.6)',
            }}
          >
            <IconButton
              icon={<ChevronLeft size={18} />}
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
          }}
        >
          {title}
        </div>
      )}
      {visibleSearchBar && (
        <div className='mt-2'>
          <SearchBar
            placeholderSearchBar={placeholderSearchBar}
            visibleFilterIcon={visibleFilterIcon}
            onClick={(href: string) => !!navigate && navigate(href)}
          />
        </div>
      )}
    </div>
  )
}

export default Header5