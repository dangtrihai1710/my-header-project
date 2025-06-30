/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import React, { FC, ReactElement } from 'react'
import { IonHeader, IonTitle, IonToolbar } from '@ionic/react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'zmp-ui'

import { useLink } from '@atom/link/useLink'
import { useCart } from '@atom/cart/useCart'
import { useAppSetting } from '@atom/app-setting/useAppSetting'
import { convertBackground } from '@components/utils'
import { useIonHeaderCollapse } from '@hooks/useIonHeaderCollapse'
import { contactOA } from '@services/zalo-api'

import { HeaderProps } from './helper'

interface HeaderContainerProps {
  children: ReactElement
  props: HeaderProps
}

const HeaderContainer: FC<HeaderContainerProps> = ({ children, props }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const { ref } = useIonHeaderCollapse()
  const { OA, appSetting } = useAppSetting()
  const { isAiminiPlatform } = useLink()
  const { cart } = useCart()

  const { background, translucent } = props.settings

  const handleNavigate = (href) => {
    if (isAiminiPlatform) return
    else {
      if (href == '/chat') contactOA({ oaType: OA.oaType, oaId: OA.oaId })
      else navigate(href, { animate: false })
    }
  }

  const updatedProps = {
    ...props,
    logo: appSetting?.logo,
    cartLength: cart.length,
    navigate: (href) => handleNavigate(href),
    goBack: () => {
      const listPathAllowGoBackInAimini = ['/category/result'] // danh sách các đường dẫn cho phép goback

      // nếu là platform Aimini và trang hiện tại không nằm trong danh sách cho phép goback thì return
      if (
        isAiminiPlatform &&
        !listPathAllowGoBackInAimini.some((path) =>
          location.pathname.includes(path)
        )
      )
        return
      if (location.pathname == '/ordered-success') return navigate('/home') // trường hợp back trang order success
      return navigate(-1)
    },
  }

  return (
    <IonHeader
      mode='ios'
      ref={ref}
      translucent={background !== '' ? false : translucent}
      className='shadow-none ion-no-border'
      style={{
        ...(props as any)?.style,
        background: convertBackground(background),
      }}
    >
      <IonToolbar className='ion-no-padding ion-no-border'>
        <IonTitle
          size='small'
          className='ion-no-padding'
        >
          {React.cloneElement(children, updatedProps)}
        </IonTitle>
      </IonToolbar>
    </IonHeader>
  )
}

export default HeaderContainer
