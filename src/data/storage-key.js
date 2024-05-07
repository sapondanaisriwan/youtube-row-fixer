export const KeyExtensionStatus = "extensionStatus";

export const KeyExtensionTheme = "extensionTheme";

export const KeyHideChannelProfile = "hideChannelProfile";
export const KeyDisplayFullTitle = "displayFullTitle";
export const KeyDynamicVideo = "dynamicVideoPerRow";
export const KeyVideoPerRow = "videoPerRow";
export const KeyPostPerRow = "postPerRow";
export const KeyShelfItemPerRow = "shelfItemPerRow";

export const settingKey = [
  KeyExtensionStatus,
  KeyExtensionTheme,

  KeyDynamicVideo,
  KeyHideChannelProfile,
  KeyDisplayFullTitle,
  KeyVideoPerRow,
  KeyPostPerRow,
  KeyShelfItemPerRow,
];

export const defaultSetting = {
  [KeyExtensionStatus]: true,
  [KeyExtensionTheme]: true,

  [KeyDynamicVideo]: false,
  [KeyHideChannelProfile]: true,
  [KeyDisplayFullTitle]: false,
  [KeyVideoPerRow]: 5,
  [KeyPostPerRow]: 3,
  [KeyShelfItemPerRow]: 12,
};
