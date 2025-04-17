import {
  KeyDisplayFullTitle,
  KeyHideChannelProfile,
  KeyVideoPerRow,
} from "../../../data/storage-key";
import { optionDisplayFullTitle } from "./displayFullTitle";
import { optionHideChannelProfile } from "./hideChannelProfile";
import { optionSkeletonPerRow } from "./skeletonPerRow";

export const injectAllChanges = (data) => {
  optionHideChannelProfile(data[KeyHideChannelProfile]);
  optionDisplayFullTitle(data[KeyDisplayFullTitle]);
  optionSkeletonPerRow(data[KeyVideoPerRow]);
};
