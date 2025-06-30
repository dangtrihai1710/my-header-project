import { BoxShadowType } from '@components/utils'

export interface HeaderSettingProps {
  margin: string
  padding: string
  background: string
  border: string
  borderRadius: string
  boxShadow: BoxShadowType
  visibleTitle: boolean
  title: string
  colorTitle: string
  fontSizeTitle: number
  visibleSubTitle: boolean
  subTitle: string
  colorSubTitle: string
  fontSizeSubTitle: number
  visibleCartIcon: boolean
  visibleFilterIcon: boolean
  visibleLogo: boolean
  visibleMessageIcon: boolean
  visibleSearchBar: boolean
  visibleSearchIcon: boolean
  visibleLeftIcon?: boolean
  placeholderSearchBar: string
  hideOnScroll: boolean
  translucent: boolean
  collapse: 'condense' | 'fade' | undefined
}

export interface HeaderProps {
  settings: HeaderSettingProps
  visible: boolean
}

export interface HeaderContainerProps extends HeaderProps {
  logo?: string
  cartLength?: number
  navigate?: (href: string) => void
  goBack?: () => void
  routerRoot?: string
}

export const settingHeader1: HeaderSettingProps = {
  margin: '0px 0px 0px 0px',
  padding: '0px 8px 8px 8px',
  background: '',
  border: '0px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '0px 0px 0px 0px',
  boxShadow: '',
  visibleTitle: true,
  title: 'Aimini xin chào',
  colorTitle: 'rgba(0, 0, 0, 1)',
  fontSizeTitle: 14,
  fontSizeSubTitle: 12,
  visibleSubTitle: true,
  subTitle: 'Ngày mới tốt lành 👋',
  colorSubTitle: 'rgba(0, 0, 0, 1)',
  visibleCartIcon: true,
  visibleFilterIcon: true,
  visibleLogo: true,
  visibleMessageIcon: true,
  visibleSearchIcon: false,
  visibleSearchBar: true,
  placeholderSearchBar: 'Bạn đang cần gì?',
  hideOnScroll: true,
  translucent: true,
  collapse: 'condense',
}

export const defaultHeader1: HeaderProps = {
  visible: true,
  settings: settingHeader1,
}

export const settingHeader2: HeaderSettingProps = {
  margin: '0px 0px 0px 0px',
  padding: '0px 8px 8px 8px',
  background: '',
  border: '0px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '0px 0px 0px 0px',
  boxShadow: '',
  visibleTitle: true,
  title: 'Aimini xin chào',
  visibleSubTitle: true,
  subTitle: 'Ngày mới tốt lành 👋',
  colorTitle: 'rgba(0, 0, 0, 1)',
  colorSubTitle: 'rgba(0, 0, 0, 1)',
  fontSizeTitle: 14,
  fontSizeSubTitle: 12,
  visibleCartIcon: true,
  visibleFilterIcon: false,
  visibleLogo: true,
  visibleMessageIcon: true,
  visibleSearchIcon: false,
  visibleSearchBar: false,
  placeholderSearchBar: 'Bạn đang cần gì?',
  hideOnScroll: true, // cho phép ẩn khi scroll,
  translucent: true,
  collapse: 'condense',
}

export const defaultHeader2: HeaderProps = {
  visible: true,
  settings: settingHeader2,
}

export const settingHeader3: HeaderSettingProps = {
  margin: '0px 0px 0px 0px',
  padding: '0px 8px 8px 8px',
  background: '',
  border: '0px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '0px 0px 0px 0px',
  boxShadow: '',
  visibleTitle: true,
  title: 'Aimini xin chào',
  visibleSubTitle: true,
  subTitle: 'Ngày mới tốt lành 👋',
  colorTitle: 'rgba(0, 0, 0, 1)',
  colorSubTitle: 'rgba(0, 0, 0, 1)',
  fontSizeTitle: 14,
  fontSizeSubTitle: 12,
  visibleCartIcon: false,
  visibleFilterIcon: false,
  visibleLogo: true,
  visibleMessageIcon: false,
  visibleSearchIcon: true,
  visibleSearchBar: false,
  placeholderSearchBar: 'Bạn đang cần gì?',
  hideOnScroll: true, // cho phép ẩn khi scroll,
  translucent: true,
  collapse: 'condense',
}

export const defaultHeader3: HeaderProps = {
  visible: true,
  settings: settingHeader3,
}

export const settingHeader4: HeaderSettingProps = {
  margin: '0px 0px 0px 0px',
  padding: '0px 8px 8px 8px',
  background: '',
  border: '0px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '0px 0px 0px 0px',
  boxShadow: '',
  visibleTitle: true,
  title: 'Aimini xin chào',
  visibleSubTitle: true,
  subTitle: 'Ngày mới tốt lành 👋',
  colorTitle: 'rgba(0, 0, 0, 1)',
  colorSubTitle: 'rgba(0, 0, 0, 1)',
  fontSizeTitle: 14,
  fontSizeSubTitle: 12,
  visibleCartIcon: true,
  visibleFilterIcon: true,
  visibleLogo: true,
  visibleMessageIcon: true,
  visibleSearchIcon: false,
  visibleSearchBar: true,
  placeholderSearchBar: 'Bạn đang cần gì?',
  hideOnScroll: true, // cho phép ẩn khi scroll,
  translucent: true,
  collapse: 'condense',
}

export const defaultHeader4: HeaderProps = {
  visible: true,
  settings: settingHeader4,
}

export const settingHeader5: HeaderSettingProps = {
  margin: '0px 0px 0px 0px',
  padding: '0px 8px 8px 8px',
  background: '',
  border: '0px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '0px 0px 0px 0px',
  boxShadow: '',
  visibleTitle: true,
  title: 'Aimini xin chào',
  visibleSubTitle: true,
  subTitle: 'Ngày mới tốt lành 👋',
  colorTitle: 'rgba(0, 0, 0, 1)',
  colorSubTitle: 'rgba(0, 0, 0, 1)',
  fontSizeTitle: 16,
  fontSizeSubTitle: 12,
  visibleCartIcon: false,
  visibleFilterIcon: false,
  visibleLogo: false,
  visibleMessageIcon: false,
  visibleSearchIcon: false,
  visibleSearchBar: false,
  placeholderSearchBar: 'Bạn đang cần gì?',
  hideOnScroll: true, // cho phép ẩn khi scroll,
  translucent: false,
  visibleLeftIcon: true,
  collapse: 'condense',
}

export const defaultHeader5: HeaderProps = {
  visible: true,
  settings: settingHeader5,
}

export const settingHeader6: HeaderSettingProps = {
  margin: '0px 0px 0px 0px',
  padding: '0px 8px 8px 8px',
  background: '',
  border: '0px solid rgba(0, 0, 0, 0.1)',
  borderRadius: '0px 0px 0px 0px',
  boxShadow: '',
  visibleTitle: true,
  title: 'Aimini xin chào',
  visibleSubTitle: true,
  subTitle: 'Ngày mới tốt lành 👋',
  colorTitle: 'rgba(0, 0, 0, 1)',
  colorSubTitle: 'rgba(0, 0, 0, 1)',
  fontSizeTitle: 14,
  fontSizeSubTitle: 12,
  visibleCartIcon: false,
  visibleFilterIcon: true,
  visibleLogo: false,
  visibleMessageIcon: false,
  visibleSearchIcon: false,
  visibleSearchBar: true,
  placeholderSearchBar: 'Bạn đang cần gì?',
  hideOnScroll: true, // cho phép ẩn khi scroll,
  translucent: true,
  collapse: 'condense',
}

export const defaultHeader6: HeaderProps = {
  visible: true,
  settings: settingHeader6,
}
