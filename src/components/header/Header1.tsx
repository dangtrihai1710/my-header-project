/* eslint-disable @typescript-eslint/no-explicit-any */
import classNames from 'classnames'
import React, { FC } from 'react'
import IconSVG, { Icons } from '@components/common/IconSVG'
import logoAimini from '@static/images/logo'
import { defaultHeader1, HeaderContainerProps } from './helper'
import SearchBar from './SearchBar'
import { isZaloPlatform } from '@components/utils'

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
      {hideOnScroll && (
        <div
          id='header-search-bar'
          className='flex-row align-items-center gap-1'
          style={{
            display: visibleSearchBar ? 'flex' : 'none',
            paddingTop: '5px',
          }}
        >
          <SearchBar
            placeholderSearchBar={placeholderSearchBar}
            visibleFilterIcon={visibleFilterIcon}
            onClick={() => !!navigate && navigate('/search')}
          />
          <div
            className='align-items-center gap-2'
            id='header-search-actions'
            style={{ display: 'none' }}
          >
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
          </div>
        </div>
      )}
    </div>
  )
}

export default Header1

const IconButton = ({
  icon,
  onClick,
  cartLength = undefined,
}: {
  icon: keyof typeof Icons
  onClick: () => void
  cartLength?: number | undefined
}) => {
  return (
    <div className='position-relative h-100 d-flex align-items-center justify-content-center'>
      <div
        onClick={onClick}
        className='rounded-circle d-flex align-items-center justify-content-center '
        style={{
          width: 32,
          height: 32,
          backgroundColor: 'rgba(255, 255, 255, 0.6)',
          border: '1px solid rgba(0,0,0,0.1)',
        }}
      >
        <IconSVG
          name={icon}
          size={20}
          color='#344054'
          strokeWidth={1.5}
        />
      </div>
      {cartLength !== undefined && cartLength !== 0 && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: -2,
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
