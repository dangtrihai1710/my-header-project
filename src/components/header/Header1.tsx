/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames'
import React, { FC } from 'react'
import IconSVG, { Icons } from '@components/common/IconSVG'
import logoAimini from '@static/images/logo'
import { defaultHeader1, HeaderContainerProps } from './helper'
import SearchBar from './SearchBar'
import { isZaloPlatform } from '@components/utils'

// Component IconButton
interface IconButtonProps {
  icon: keyof typeof Icons | string
  onClick: () => void
  cartLength?: number
}

const IconButton: FC<IconButtonProps> = ({ icon, onClick, cartLength }) => {
  return (
    <div
      onClick={onClick}
      style={{
        position: 'relative',
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
      <IconSVG name={icon as keyof typeof Icons} size={20} />
      {cartLength && cartLength > 0 && (
        <div
          style={{
            position: 'absolute',
            top: -2,
            right: -2,
            backgroundColor: '#ff4444',
            color: 'white',
            borderRadius: '50%',
            width: 16,
            height: 16,
            fontSize: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
          }}
        >
          {cartLength > 9 ? '9+' : cartLength}
        </div>
      )}
    </div>
  )
}

const Header1: FC<HeaderContainerProps> = (props) => {
  const { settings, logo, cartLength, navigate } = props

  const {
    margin,
    padding,
    border,
    borderRadius,
    boxShadow,
    visibleTitle,
    title,
    visibleSubTitle,
    subTitle,
    colorTitle,
    colorSubTitle,
    fontSizeTitle,
    fontSizeSubTitle,
    visibleLogo,
    visibleCartIcon,
    visibleMessageIcon,
    visibleSearchIcon,
    visibleSearchBar,
    placeholderSearchBar,
    visibleFilterIcon,
    hideOnScroll,
  } = settings || defaultHeader1.settings

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
      <div
        id='header-content'
        className={classNames(
          'align-items-center gap-2',
          !isZaloPlatform && 'justify-content-between'
        )}
        style={{
          width: isZaloPlatform ? '80%' : '100%',
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div className='d-flex align-items-center'>
          {visibleLogo && (
            <img
              className='me-2'
              style={{ height: 40, objectFit: 'contain', maxWidth: 80 }}
              src={logo || logoAimini}
            />
          )}
          <div>
            {visibleTitle && (
              <div
                className='body-medium-medium text-start text-truncate-1'
                style={{
                  color: colorTitle,
                  fontSize: fontSizeTitle,
                }}
              >
                {title}
              </div>
            )}
            {visibleSubTitle && (
              <div
                className='body-small-medium text-start text-truncate-1'
                style={{
                  color: colorSubTitle,
                  fontSize: fontSizeSubTitle,
                  marginTop: 2,
                }}
              >
                {subTitle}
              </div>
            )}
          </div>
        </div>
        <div className='d-flex align-items-center gap-2'>
          {visibleCartIcon && (
            <IconButton
              icon={'cart'}
              onClick={() => !!navigate && navigate('/cart')}
              cartLength={cartLength}
            />
          )}
          {visibleMessageIcon && (
            <IconButton
              icon={'chat'}
              onClick={() => !!navigate && navigate('/chat')}
            />
          )}
          {visibleSearchIcon && (
            <IconButton
              icon={'search'}
              onClick={() => !!navigate && navigate('/search')}
            />
          )}
        </div>
      </div>
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

export default Header1