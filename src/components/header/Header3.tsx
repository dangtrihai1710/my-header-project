// 3. Fix Header3.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'
import logoAimini from '../../static/images/logo/Logo-Aimini.jpg'
import { defaultHeader3, HeaderContainerProps } from './helper'
import Header1 from './Header1'

const Header3: FC<HeaderContainerProps> = (props) => {
  const { visible, settings, logo, cartLength, navigate } = props

  return (
    <>
      <Header1
        visible={visible || defaultHeader3.visible}
        settings={settings || defaultHeader3.settings}
        logo={logo || logoAimini}
        navigate={navigate}
        cartLength={cartLength}
      />
    </>
  )
}

export default Header3