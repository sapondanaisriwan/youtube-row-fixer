import SwitchControl from "../ui/SwitchControl";
import SliderControl from "../ui/SliderControl";
import {
  KeyChannelPageShelfItemPerRow,
  KeyChannelPageVideoPerRow,
  KeyDisplayFullTitle,
  KeyDynamicVideo,
  KeyHideChannelProfile,
  KeyPostPerRow,
  KeyShelfItemPerRow,
  KeyVideoPerRow,
} from "../../data/storage-key";

function Main() {
  return (
    <main className="overflow-auto">
      <div className="flex flex-col p-3 bg-content2 dark:bg-background">
        <p>Main page</p>
        <div className="bg-content1 rounded-lg">
          <SwitchControl
            label="Show Full Video Titles"
            storageKey={KeyDisplayFullTitle}
          />
          <SwitchControl
            label="Hide Channel Profile"
            storageKey={KeyHideChannelProfile}
          />
          <SwitchControl
            label="Auto-Adjust Videos Per Row"
            storageKey={KeyDynamicVideo}
          />
          <SliderControl
            label="Videos Per Row"
            storageKey={KeyVideoPerRow}
            maxValue={15}
          />
          <SliderControl
            label="Posts Per Row"
            storageKey={KeyPostPerRow}
            maxValue={6}
          />
          <SliderControl
            label="Shorts Per Row"
            storageKey={KeyShelfItemPerRow}
            maxValue={12}
            borderBottom={false}
          />
        </div>
      </div>
      <div className="flex flex-col p-3 bg-content2 dark:bg-background">
        <p>Channel page</p>
        <div className="bg-content1 rounded-lg">
          <SliderControl
            label="Videos Per Row"
            storageKey={KeyChannelPageVideoPerRow}
            maxValue={15}
          />
          <SliderControl
            label="Shorts Per Row"
            storageKey={KeyChannelPageShelfItemPerRow}
            maxValue={15}
            borderBottom={false}
          />
        </div>
      </div>
    </main>
  );
}

export default Main;
