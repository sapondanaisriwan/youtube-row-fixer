import {
  KeyChannelPageWideLayout,
  KeyDisplayFullTitle,
  KeyHideChannelProfile,
  KeyHideShort,
  KeyMetadataTitles,
  KeyShelfItemPerRow,
  KeyVideoPerRow,
} from "../../../data/storage-key";
import { optionDisplayFullTitle } from "./displayFullTitle";
import { optionHideChannelProfile } from "./hideChannelProfile";
import { optionHideShort } from "./hideShort";
import { optionMetadataTitles } from "./metadataTitles";
import { optionShortsPerRow } from "./shortsPerRow";
import { optionSkeletonPerRow } from "./skeletonPerRow";
import { optionWideChannelLayout } from "./wideChannleLayout";

export const injectAllChanges = (data) => {
  optionHideChannelProfile(data[KeyHideChannelProfile]);
  optionDisplayFullTitle(data[KeyDisplayFullTitle]);
  optionMetadataTitles(data[KeyMetadataTitles]);
  optionSkeletonPerRow(data[KeyVideoPerRow]);
  optionHideShort(data[KeyHideShort]);
  optionWideChannelLayout(data[KeyChannelPageWideLayout]);
  optionShortsPerRow(data[KeyShelfItemPerRow]);
};
