export const KeyExtensionStatus = "extensionStatus";

export const KeyExtensionTheme = "extensionTheme";

// Main Page
export const KeyHideChannelProfile = "hideChannelProfile";
export const KeyHideShort = "hideShort";
export const KeyDisplayFullTitle = "displayFullTitle";
export const KeyDynamicVideo = "dynamicVideoPerRow";
export const KeyVideoPerRow = "videoPerRow";
export const KeyPostPerRow = "postPerRow";
export const KeyShelfItemPerRow = "shelfItemPerRow";

// Channel Page
export const KeyChannelPageVideoPerRow = "channelPageVideoPerRow";
export const KeyChannelPageShelfItemPerRow = "channelPageShelfItemPerRow";

export const settingKey = [
  KeyExtensionStatus,
  KeyExtensionTheme,

  KeyDynamicVideo,
  KeyHideChannelProfile,
  KeyHideShort,
  KeyDisplayFullTitle,
  KeyVideoPerRow,
  KeyPostPerRow,
  KeyShelfItemPerRow,

  KeyChannelPageVideoPerRow,
  KeyChannelPageShelfItemPerRow,
];

export const defaultSetting = {
  [KeyExtensionStatus]: true,
  [KeyExtensionTheme]: true,

  [KeyDynamicVideo]: false,
  [KeyHideChannelProfile]: true,
  [KeyHideShort]: false,
  [KeyDisplayFullTitle]: false,
  [KeyVideoPerRow]: 5,
  [KeyPostPerRow]: 3,
  [KeyShelfItemPerRow]: 12,

  [KeyChannelPageVideoPerRow]: 5,
  [KeyChannelPageShelfItemPerRow]: 8,
};
