// src/atom/app-setting/useAppSetting.ts
export const useAppSetting = () => ({
  OA: { oaType: '', oaId: '' },
  appSetting: { logo: '' } // Changed from null to empty string to fix type error
});