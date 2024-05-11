import { eventGetRowFixerData, eventSendRowFixerData } from "../../data/event";
import port from "../modules/utils/port";

const settings = {};
const oldSettings = {};

const resolution = {
  lg: 1000,
  md: 768,
  sm: 640,
};

// Event handler function to handle the received data event
const handleDataEvent = ({ detail: { data } }) => {
  settings.dynamicVideoPerRow = data.dynamicVideoPerRow;
  settings.elementsPerRow = data.videoPerRow;
  settings.postsPerRow = data.postPerRow;
  settings.slimItemsPerRow = data.shelfItemPerRow;
  settings.gameCardsPerRow = data.shelfItemPerRow;

  oldSettings.dynamicVideoPerRow = data.dynamicVideoPerRow;
  oldSettings.elementsPerRow = data.videoPerRow;
  oldSettings.postsPerRow = data.postPerRow;
  oldSettings.slimItemsPerRow = data.shelfItemPerRow;
  oldSettings.gameCardsPerRow = data.shelfItemPerRow;
};

// Listen for the sendRowFixerData event and invoke handleDataEvent
port.listen(eventSendRowFixerData, handleDataEvent);

// Dispatch a custom event to get storage data
port.callEvent({ name: eventGetRowFixerData, detail: "give me data" });

// responsive => true: apply to mobile
// responsive => false: apply to desktop
let responsive = true;
const setSettings = (elements, posts, slimItems, isResponsive) => {
  settings.elementsPerRow = elements;
  settings.postsPerRow = posts;
  settings.slimItemsPerRow = slimItems;
  settings.gameCardsPerRow = slimItems;
  responsive = isResponsive;
};

ytZara.ytProtoAsync("ytd-rich-grid-renderer").then((proto) => {
  const oldRefreshGridLayout = proto.refreshGridLayout;

  proto.calcElementsPerRow733 = proto.calcElementsPerRow;
  proto.reflowContent733 = proto.reflowContent;

  proto.calcElementsPerRow = function (a, b) {
    // fix for "Breaking news" section for a large resolution
    if (!responsive) {
      return a === 194 ? settings.slimItemsPerRow : settings.elementsPerRow;
    }

    // fix "Breaking news" section for a small resolution
    if (a === 310) return settings.elementsPerRow;

    // fix "Short reels" section for a small resolution
    if (a === 194) return settings.slimItemsPerRow;

    return this.calcElementsPerRow733(a, b);
  };

  proto.calcMaxSlimElementsPerRow733 = proto.calcMaxSlimElementsPerRow;

  proto.calcMaxSlimElementsPerRow = function (a, b, c) {
    if (!responsive) return settings.slimItemsPerRow;
    return this.calcMaxSlimElementsPerRow733(a, b, c);
  };
  proto.refreshGridLayout = function () {
    responsive = true;

    const clientWidth = this.hostElement.clientWidth;

    // break point for smaller resolution
    if (settings.dynamicVideoPerRow) {
      if (clientWidth <= resolution.sm) {
        setSettings(2, 2, 3, true);
      } else if (clientWidth <= resolution.md) {
        setSettings(3, 3, 4, true);
      } else if (clientWidth <= resolution.lg) {
        setSettings(4, 4, 5, true);
      } else {
        setSettings(
          oldSettings.elementsPerRow,
          oldSettings.postsPerRow,
          oldSettings.slimItemsPerRow,
          false
        );
      }
    } else {
      setSettings(
        settings.elementsPerRow,
        settings.postsPerRow,
        settings.slimItemsPerRow,
        false
      );
    }

    const props = [
      "elementsPerRow",
      "postsPerRow",
      "slimItemsPerRow",
      "gameCardsPerRow",
    ];

    props.forEach((prop) => {
      Object.defineProperty(this, prop, {
        get() {
          return settings[prop];
        },
        set(nv) {
          return true;
        },
        configurable: true,
        enumerable: true,
      });
    });

    const result = oldRefreshGridLayout.apply(this, arguments);

    props.forEach((prop) => {
      // remove constant properties
      delete this[prop];

      // set the values
      this[prop] = settings[prop];
    });

    return result;
  };
});
