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

ytZara.ytProtoAsync("ytd-rich-grid-renderer").then((proto) => {
  const oldRefreshGridLayout = proto.refreshGridLayout;

  proto.calcElementsPerRow733 = proto.calcElementsPerRow;
  proto.reflowContent733 = proto.reflowContent;

  let responsive = true;
  proto.calcElementsPerRow = function (a, b) {
    console.log(a);
    if (!responsive && a === 194) return settings.slimItemsPerRow;
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
        settings.elementsPerRow = 2;
        settings.postsPerRow = 2;

        // working but it leaves some blank spaces
        settings.slimItemsPerRow = 2;
        settings.gameCardsPerRow = 2;
        responsive = true;
      } else if (clientWidth <= resolution.md) {
        settings.elementsPerRow = 3;
        settings.postsPerRow = 3;

        // working but it leaves some blank spaces
        settings.slimItemsPerRow = 3;
        settings.gameCardsPerRow = 3;
        responsive = true;
      } else if (clientWidth <= resolution.lg) {
        settings.elementsPerRow = 4;
        settings.postsPerRow = 4;

        // working but it leaves some blank spaces
        settings.slimItemsPerRow = 3;
        settings.gameCardsPerRow = 3;
        responsive = true;
      } else {
        settings.elementsPerRow = oldSettings.elementsPerRow;
        settings.postsPerRow = oldSettings.postsPerRow;
        settings.slimItemsPerRow = oldSettings.slimItemsPerRow;
        settings.gameCardsPerRow = oldSettings.slimItemsPerRow;
        responsive = false;
      }
    } else {
      settings.elementsPerRow = settings.elementsPerRow;
      settings.postsPerRow = settings.postsPerRow;
      settings.slimItemsPerRow = settings.slimItemsPerRow;
      settings.gameCardsPerRow = settings.slimItemsPerRow;
      responsive = false;
    }

    // if (clientWidth <= resolution.sm && settings.dynamicVideoPerRow) {
    //   settings.elementsPerRow = 2;
    //   settings.postsPerRow = 2;

    //   // working but it leaves some blank spaces
    //   settings.slimItemsPerRow = 2;
    //   settings.gameCardsPerRow = 2;
    //   responsive = true;
    // } else if (clientWidth <= resolution.md && settings.dynamicVideoPerRow) {
    //   settings.elementsPerRow = 3;
    //   settings.postsPerRow = 3;

    //   // working but it leaves some blank spaces
    //   settings.slimItemsPerRow = 3;
    //   settings.gameCardsPerRow = 3;
    //   responsive = true;
    // } else if (clientWidth <= resolution.lg && settings.dynamicVideoPerRow) {
    //   settings.elementsPerRow = 4;
    //   settings.postsPerRow = 4;

    //   // working but it leaves some blank spaces
    //   settings.slimItemsPerRow = 3;
    //   settings.gameCardsPerRow = 3;
    //   responsive = true;
    // } else {
    //   settings.elementsPerRow = oldSettings.elementsPerRow;
    //   settings.postsPerRow = oldSettings.postsPerRow;
    //   settings.slimItemsPerRow = oldSettings.slimItemsPerRow;
    //   settings.gameCardsPerRow = oldSettings.slimItemsPerRow;
    //   responsive = false;
    // }

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
