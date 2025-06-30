/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'
import { Buy, ChevronLeft, Home, Search } from 'react-iconly'
import { HeaderContainerProps, defaultHeader5 } from './helper'
import SearchBar from './SearchBar'
import classNames from 'classnames'
import { AppEnvironment } from '@helpers/linkApp'

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
                cartLength={cartLength}
              />
            )}
          </div>
          {visibleTitle && (
            <div
              className='body-large-medium text-start text-truncate-1 w-50'
              style={{ color: colorTitle, fontSize: fontSizeTitle }}
            >
              {title}
            </div>
          )}
        </div>
      )}
      {visibleSearchBar && (
        <div
          style={{ marginTop: 7 }}
          className={classNames('', {
            'w-75': !visibleLeftIcon && !isAiminiPlatform,
          })}
        >
          <SearchBar
            placeholderSearchBar={placeholderSearchBar}
            visibleFilterIcon={visibleFilterIcon}
            onClick={() => !!navigate && navigate('/search')}
          />
        </div>
      )}
    </div>
  )
}

export default Header5

const IconButton = ({
  icon,
  onClick,
  cartLength = undefined,
}: {
  icon: any
  onClick: () => void
  cartLength?: number | undefined
}) => {
  return (
    <div
      onClick={onClick}
      className='position-relative d-flex align-items-center justify-content-center text-body-primary'
    >
      {icon}
      {cartLength !== undefined && cartLength !== 0 && (
        <div
          style={{
            position: 'absolute',
            top: -3,
            right: -6,
            width: 12,
            height: 12,
            fontSize: 8,
          }}
          className='font-base text-white bg-danger rounded-circle d-flex align-items-center justify-content-center text-center'
        >
          {cartLength}
        </div>
      )}
    </div>
  )
}
