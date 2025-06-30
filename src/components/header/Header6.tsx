// 5. Fix Header6.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'
import logoAimini from '../../static/images/logo/Logo-Aimini.jpg'
import { defaultHeader6, HeaderContainerProps } from './helper'
import Header5 from './Header5'

const Header6: FC<HeaderContainerProps> = (props) => {
  const { visible, settings, logo, cartLength, navigate, goBack } = props

  return (
    <>
      <Header5
        visible={visible || defaultHeader6.visible}
        settings={settings || defaultHeader6.settings}
        logo={logo || logoAimini}
        cartLength={cartLength}
        navigate={navigate}
        goBack={goBack}
      />
    </>
  )
}

export default Header6