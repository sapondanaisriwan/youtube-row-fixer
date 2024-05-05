import SwitchControl from "../ui/SwitchControl";
import SliderControl from "../ui/SliderControl";
import {
  KeyDisplayFullTitle,
  KeyHideChannelProfile,
  KeyPostPerRow,
  KeyShelfItemPerRow,
  KeyVideoPerRow,
} from "../../data/storage-key";

function Main() {
  return (
    // gap-2
    <div className="flex flex-col p-3 bg-content2 dark:bg-background">
      <div className="bg-content1 rounded-lg overflow-hidden">
        <SwitchControl
          label="Display Full Title"
          storageKey={KeyDisplayFullTitle}
        />
        <SwitchControl
          label="Hide Channel Profile"
          storageKey={KeyHideChannelProfile}
        />
        <SliderControl
          label="Video Per Row"
          storageKey={KeyVideoPerRow}
          maxValue={15}
        />
        <SliderControl
          label="Post Per Row"
          storageKey={KeyPostPerRow}
          maxValue={6}
        />
        <SliderControl
          label="Shelf Items Per Row"
          storageKey={KeyShelfItemPerRow}
          maxValue={12}
          borderBottom={false}
        />
      </div>
    </div>
  );
}

export default Main;
