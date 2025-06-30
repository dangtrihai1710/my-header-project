// 4. Fix Header4.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'
import logoAimini from '../../static/images/logo/Logo-Aimini.jpg'
import { defaultHeader4, HeaderContainerProps } from './helper'
import Header1 from './Header1'

const Header4: FC<HeaderContainerProps> = (props) => {
  const { visible, settings, logo, cartLength, navigate } = props

  return (
    <>
      <Header1
        visible={visible || defaultHeader4.visible}
        settings={settings || defaultHeader4.settings}
        logo={logo || logoAimini}
        navigate={navigate}
        cartLength={cartLength}
      />
    </>
  )
}

export default Header4