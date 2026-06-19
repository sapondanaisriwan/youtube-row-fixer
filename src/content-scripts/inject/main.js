import { eventGetRowFixerData, eventSendRowFixerData } from "../../data/event";
import port from "../modules/utils/port";

const settings = {};
const oldSettings = {};
let resolveSettingsReady;
const settingsReady = new Promise((resolve) => {
  resolveSettingsReady = resolve;
});

const resolution = {
  lg: 1000,
  md: 768,
  sm: 640,
};

// Event handler function to handle the received data event
const handleDataEvent = (obj) => {
  let data;
  try {
    ({ data } = JSON.parse(obj.detail));
  } catch (error) {
    return;
  }

  const numericSettings = [
    "videoPerRow",
    "postPerRow",
    "shelfItemPerRow",
    "channelPageVideoPerRow",
    "channelPageShelfItemPerRow",
  ];
  if (
    !data ||
    numericSettings.some((key) => !Number.isFinite(data[key]) || data[key] <= 0)
  ) {
    return;
  }

  settings.dynamicVideoPerRow = data.dynamicVideoPerRow;
  settings.elementsPerRow = data.videoPerRow;
  settings.postsPerRow = data.postPerRow;
  settings.slimItemsPerRow = data.shelfItemPerRow;
  settings.gameCardsPerRow = data.shelfItemPerRow;

  // Channel page
  settings.channelVideoPerRow = data.channelPageVideoPerRow;
  settings.channelSlimItemsPerRow = data.channelPageShelfItemPerRow;

  oldSettings.dynamicVideoPerRow = data.dynamicVideoPerRow;
  oldSettings.elementsPerRow = data.videoPerRow;
  oldSettings.postsPerRow = data.postPerRow;
  oldSettings.slimItemsPerRow = data.shelfItemPerRow;
  oldSettings.gameCardsPerRow = data.shelfItemPerRow;

  // channel page
  oldSettings.channelVideoPerRow = data.channelPageVideoPerRow;
  oldSettings.channelSlimItemsPerRow = data.channelPageShelfItemPerRow;

  resolveSettingsReady();
  reflowLayout(data);
};

// Listen for the sendRowFixerData event and invoke handleDataEvent
port.listen(eventSendRowFixerData, handleDataEvent);

// Dispatch a custom event to get storage data
port.callEvent({ name: eventGetRowFixerData, detail: {} });

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

const reflowLayout = (data) => {
  const grids = document.querySelectorAll("ytd-rich-grid-renderer");

  if (!grids.length) {
    return;
  }

  const {
    channelVideoPerRow,
    channelSlimItemsPerRow,
    videoPerRow,
    postPerRow,
    shelfItemPerRow,
  } = data;

  grids.forEach((ele) => {
    const setStyleProps = (props) => {
      for (const [prop, value] of Object.entries(props)) {
        ele.style.setProperty(prop, value);
      }
    };

    if (ele.isChannelPage) {
      setStyleProps({
        "--ytd-rich-grid-items-per-row": channelVideoPerRow,
        "--ytd-rich-grid-slim-items-per-row": channelSlimItemsPerRow,
      });
    } else {
      setStyleProps({
        "--ytd-rich-grid-items-per-row": videoPerRow,
        "--ytd-rich-grid-mini-game-cards-per-row": videoPerRow,
        "--ytd-rich-grid-posts-per-row": postPerRow,
        "--ytd-rich-grid-slim-items-per-row": shelfItemPerRow,
        "--ytd-rich-grid-game-cards-per-row": shelfItemPerRow,
      });
    }
  });
};

const observablePromise = (proc, timeoutPromise) => {
  let promise = null;
  return {
    obtain() {
      if (!promise) {
        promise = new Promise((resolve) => {
          let mo = null;
          const f = () => {
            let t = proc();
            if (t) {
              mo.disconnect();
              mo.takeRecords();
              mo = null;
              resolve(t);
            }
          };
          mo = new MutationObserver(f);
          mo.observe(document, { subtree: true, childList: true });
          f();
          timeoutPromise &&
            timeoutPromise.then(() => {
              resolve(null);
            });
        });
      }
      return promise;
    },
  };
};

(async () => {
  await observablePromise(() => {
    return document.querySelector("ytd-page-manager");
  }).obtain();

  // Retry after YouTube has initialized in case the bridge was not listening
  // to the document_start request yet. Never patch with empty settings.
  port.callEvent({ name: eventGetRowFixerData, detail: {} });
  await settingsReady;

  ytZara.ytProtoAsync("ytd-rich-grid-renderer").then((proto) => {
    const patchKey = Symbol.for("youtube-row-fixer.rich-grid-patch");
    if (proto[patchKey]) {
      return;
    }

    const oldCalcElementsPerRow = proto.calcElementsPerRow;
    const oldCalcMaxSlimElementsPerRow = proto.calcMaxSlimElementsPerRow;
    const oldRefreshGridLayout = proto.refreshGridLayout;

    if (
      typeof oldCalcElementsPerRow !== "function" ||
      typeof oldRefreshGridLayout !== "function"
    ) {
      return;
    }

    Object.defineProperty(proto, patchKey, {
      value: true,
      configurable: false,
      enumerable: false,
    });

    proto.calcElementsPerRow = function (a, b) {
      // return 7;
      // fix for "Breaking news" section for a large resolution
      if (!responsive) {
        return a === 194 ? settings.slimItemsPerRow : settings.elementsPerRow;
      }

      // fix "Breaking news" section for a small resolution
      if (a === 310) return settings.elementsPerRow;

      // fix "Short reels" section for a small resolution
      if (a === 194) return settings.slimItemsPerRow;

      return oldCalcElementsPerRow.apply(this, arguments);
    };

    if (typeof oldCalcMaxSlimElementsPerRow === "function") {
      proto.calcMaxSlimElementsPerRow = function () {
        if (!responsive) return settings.slimItemsPerRow;
        return oldCalcMaxSlimElementsPerRow.apply(this, arguments);
      };
    }

    proto.refreshGridLayout = function () {
      responsive = true;

      const isChannelPage = this.isChannelPage;
      const clientWidth = this.hostElement.clientWidth;

      // break point for smaller resolution
      if (settings.dynamicVideoPerRow) {
        if (clientWidth > 0) {
          if (clientWidth <= resolution.sm) {
            setSettings(2, 2, 3, true);
          } else if (clientWidth <= resolution.md) {
            setSettings(3, 3, 4, true);
          } else if (clientWidth <= resolution.lg) {
            setSettings(4, 4, 5, true);
          } else {
            if (isChannelPage) {
              setSettings(
                oldSettings.channelVideoPerRow,
                oldSettings.postsPerRow,
                oldSettings.channelSlimItemsPerRow,
                false
              );
            } else {
              setSettings(
                oldSettings.elementsPerRow,
                oldSettings.postsPerRow,
                oldSettings.slimItemsPerRow,
                false
              );
            }
          }
        }
      } else {
        if (isChannelPage) {
          setSettings(
            settings.channelVideoPerRow,
            settings.postsPerRow,
            settings.channelSlimItemsPerRow,
            false
          );
        } else {
          setSettings(
            settings.elementsPerRow,
            settings.postsPerRow,
            settings.slimItemsPerRow,
            false
          );
        }
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

      try {
        return oldRefreshGridLayout.apply(this, arguments);
      } finally {
        props.forEach((prop) => {
          // remove constant properties
          delete this[prop];

          // set the values
          this[prop] = settings[prop];
        });
      }
    };
  });

  ytZara.ytProtoAsync("ytd-rich-shelf-renderer").then((proto) => {
    proto.refreshGridLayoutNew = function () {};
  });
})();
