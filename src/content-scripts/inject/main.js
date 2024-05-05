import { eventGetRowFixerData, eventSendRowFixerData } from "../../data/event";
import port from "../modules/utils/port";

const settings = {};

const resolution = {
  lg: 1024,
  md: 768,
  sm: 640,
};

// Event handler function to handle the received data event
const handleDataEvent = ({ detail: { data } }) => {
  settings.elementsPerRow = data.videoPerRow;
  settings.postsPerRow = data.postPerRow;
  settings.slimItemsPerRow = data.shelfItemPerRow;
  settings.gameCardsPerRow = data.shelfItemPerRow;
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
    if (clientWidth <= resolution.lg) {
      // return the original function
      return oldRefreshGridLayout.apply(this, arguments);
    }
    responsive = false;

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
