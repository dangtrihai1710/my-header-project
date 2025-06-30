/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react'
import logoAimini from '@static/images/logo'
import { defaultHeader2, HeaderContainerProps } from './helper'
import Header1 from './Header1'

const Header2: FC<HeaderContainerProps> = (props) => {
  const { visible, settings, logo, cartLength, navigate } = props

  return (
    <>
      <Header1
        visible={visible || defaultHeader2.visible}
        settings={settings || defaultHeader2.settings}
        logo={logo || logoAimini}
        navigate={navigate}
        cartLength={cartLength}
      />
    </>
  )
}

export default Header2
