import {
  KeyChannelPageWideLayout,
  KeyDisplayFullTitle,
  KeyHideChannelProfile,
  KeyHideShort,
  KeyVideoPerRow,
} from "../../../data/storage-key";
import { optionDisplayFullTitle } from "./displayFullTitle";
import { optionHideChannelProfile } from "./hideChannelProfile";
import { optionHideShort } from "./hideShort";
import { optionSkeletonPerRow } from "./skeletonPerRow";
import { optionWideChannelLayout } from "./wideChannleLayout";

export const injectAllChanges = (data) => {
  optionHideChannelProfile(data[KeyHideChannelProfile]);
  optionDisplayFullTitle(data[KeyDisplayFullTitle]);
  optionSkeletonPerRow(data[KeyVideoPerRow]);
  optionHideShort(data[KeyHideShort]);
  optionWideChannelLayout(data[KeyChannelPageWideLayout]);
};
