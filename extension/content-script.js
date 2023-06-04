const browser = chrome || browser;
const runtime = browser.runtime;
const storage = browser.storage.sync;

let data;
const config = { childList: true };
const settingKeys = ["isEnable", "hideProfile", "videosPerRow", "shortsPerRow"];
const styles = {
  hideProfile: {
    id: "hide-ch-profile",
    css: `
    .channel-avatar.ytd-ghost-grid-renderer,
    #home-page-skeleton .channel-avatar {
        display: none;
    }
  
    ytd-rich-grid-media a#avatar-link {
        display: none;
    }
    `,
  },
};

// Function to remove DOM element
const removeEle = (id) => {
  const ele = document.getElementById(id);
  ele && ele.remove();
};

// Function to inject a script into the webpage
const injectScript = (src) => {
  const script = document.createElement("script");
  script.src = runtime.getURL(src);
  script.type = "text/javascript";
  script.id = "yt-row-fixer";

  const observer = new MutationObserver((mutations, observer) => {
    if (document.body) {
      observer.disconnect();
      document.body.appendChild(script);
      console.log("Script Injected");
    }
  });
  observer.observe(document.documentElement, config);
};

// Function to inject a style into the webpage
const injectStyle = (id, css) => {
  // Remove before adding
  removeEle(id);

  const style = document.createElement("style");
  style.type = "text/css";
  style.id = id;
  style.textContent = css;
  document.documentElement.appendChild(style);
  console.log("CSS Injected");
};

const menuChanges = async () => {
  const { hideProfile } = await storage.get(settingKeys);
  hideProfile
    ? injectStyle(styles.hideProfile.id, styles.hideProfile.css)
    : removeEle(styles.hideProfile.id);
};

/* 
  Function to send storage data to the injected script.
  If you have a better way please tell me.
*/
const sendStorageData = () => {
  window.addEventListener("getRowFixerData", async (e) => {
    const responseData = await storage.get(settingKeys);
    window.dispatchEvent(
      new CustomEvent("sendRowFixerData", {
        detail: { data: responseData },
      })
    );
  });
};

browser.storage.onChanged.addListener((changes) => {
  menuChanges();
});

const initStyles = async () => {
  const { hideProfile, videosPerRow } = await storage.get(settingKeys);
  injectStyle(
    "unload-videos",
    `
  #home-page-skeleton .rich-grid-media-skeleton,
  #home-page-skeleton .rich-shelf-videos .rich-grid-media-skeleton.mini-mode,
  #home-page-skeleton #home-container-media .rich-grid-media-skeleton.mini-mode {
    min-width: calc(100% / ${videosPerRow} - 1.6rem);
    max-width: calc(100% / ${videosPerRow} - 1.6rem);
  }
  `
  );
  hideProfile && injectStyle(styles.hideProfile.id, styles.hideProfile.css);
};

const initScripts = () => {
  injectScript("./js/customElements.js");
  injectScript("./js/main.js");
  sendStorageData();
};

const runExtension = async () => {
  const { isEnable } = await storage.get(settingKeys);
  if (isEnable) {
    initScripts();
    initStyles();
  }
};
runExtension();
