import SwitchControl from "../ui/SwitchControl";
import SliderControl from "../ui/SliderControl";
import {
  KeyChannelPageShelfItemPerRow,
  KeyChannelPageVideoPerRow,
  KeyDisplayFullTitle,
  KeyDynamicVideo,
  KeyHideChannelProfile,
  KeyHideShort,
  KeyPostPerRow,
  KeyShelfItemPerRow,
  KeyVideoPerRow,
} from "../../data/storage-key";

function Main() {
  return (
    <main className="overflow-auto max-h-[536px] p-3">
      <div className="flex flex-col bg-content2 dark:bg-background">
        <p className="bg-content1 dark:bg-background text-small font-semibold pb-2">Home page</p>
        <div className="bg-content1 rounded-lg overflow-hidden">
          <SwitchControl
            label="Hide shorts"
            storageKey={KeyHideShort}
          />
          <SwitchControl
            label="Hide channel profile"
            storageKey={KeyHideChannelProfile}
          />
          <SwitchControl
            label="Show full video titles"
            storageKey={KeyDisplayFullTitle}
          />
          <SwitchControl
            label="Auto-adjust videos per row"
            description={"Automatically adjust video size on screen resize"}
            storageKey={KeyDynamicVideo}
          />
          <SliderControl
            label="Videos per row"
            storageKey={KeyVideoPerRow}
            maxValue={15}
          />
          <SliderControl
            label="Posts per row"
            storageKey={KeyPostPerRow}
            maxValue={6}
          />
          <SliderControl
            label="Shorts per row"
            storageKey={KeyShelfItemPerRow}
            maxValue={12}
            minValue={1}
            borderBottom={false}
          />
        </div>
      </div>
      <div className="flex flex-col bg-content2 dark:bg-background">
        <p className="bg-content1 dark:bg-background text-small font-semibold pt-6 pb-2">Channel page</p>
        <div className="bg-content1 rounded-lg overflow-hidden">
          <SliderControl
            label="Videos per row"
            storageKey={KeyChannelPageVideoPerRow}
            maxValue={15}
          />
          <SliderControl
            label="Shorts per row"
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
