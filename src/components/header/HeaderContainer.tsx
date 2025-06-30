/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
import React, { FC, ReactElement } from 'react'

import { useLink } from '@atom/link/useLink'
import { useCart } from '@atom/cart/useCart'
import { useAppSetting } from '@atom/app-setting/useAppSetting'
import { convertBackground } from '@components/utils'
import { useIonHeaderCollapse } from '@hooks/useIonHeaderCollapse'
import { contactOA } from '@services/zalo-api'

import { HeaderContainerProps } from './helper'

// Mock Ionic components for testing
const IonHeader: FC<any> = ({ children, ...props }) => (
  <header {...props}>{children}</header>
)
const IonToolbar: FC<any> = ({ children, ...props }) => (
  <div {...props}>{children}</div>
)
const IonTitle: FC<any> = ({ children, ...props }) => (
  <div {...props}>{children}</div>
)

interface HeaderContainerWrapperProps {
  children: ReactElement
  props: HeaderContainerProps
}

const HeaderContainer: FC<HeaderContainerWrapperProps> = ({ children, props }) => {
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

  const updatedProps: HeaderContainerProps = {
    ...props,
    logo: appSetting?.logo || undefined, // Fix type error: convert null to undefined
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