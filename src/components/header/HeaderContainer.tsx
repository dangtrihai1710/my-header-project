/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import React, { FC, ReactElement } from 'react'
import { IonHeader, IonTitle, IonToolbar } from '@ionic/react'

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
  const { ref } = useIonHeaderCollapse()
  const { OA, appSetting } = useAppSetting()
  const { isAiminiPlatform } = useLink()
  const { cart } = useCart()

  const { background, translucent } = props.settings

  const handleNavigate = (href: string): void => {
    if (isAiminiPlatform) return
    else {
      if (href == '/chat') contactOA({ oaType: OA.oaType, oaId: OA.oaId })
      else {
        // Mock navigation
        console.log('Navigate to:', href);
        if (props.navigate) {
          props.navigate(href);
        }
      }
    }
  }

  const updatedProps = {
    ...props,
    logo: appSetting?.logo,
    cartLength: cart.length,
    navigate: (href: string) => handleNavigate(href),
    goBack: () => {
      const listPathAllowGoBackInAimini = ['/category/result'] // danh sách các đường dẫn cho phép goback

      // Mock goBack functionality
      console.log('Go back called');
      if (props.goBack) {
        props.goBack();
      }
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