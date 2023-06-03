const browser = chrome || browser;
const runtime = browser.runtime;
const storage = browser.storage.sync;

const settingKeys = ["isEnable", "videosPerRow", "shortsPerRow"];
const config = { childList: true };

let data;

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

/* 
  Function to send storage data to the injected script.
  If you have a better way please tell me.
*/
const sendStorageData = () => {
  window.addEventListener("getRowFixerData", async (e) => {
    console.log(e);
    const responseData = await storage.get(settingKeys);
    window.dispatchEvent(
      new CustomEvent("sendRowFixerData", {
        detail: { data: responseData },
      })
    );
  });
};

const runExtension = async () => {
  const { isEnable } = await storage.get(["isEnable"]);
  if (isEnable) {
    injectScript("./js/customElements.js");
    injectScript("./js/main.js");
    sendStorageData();
  }
};
runExtension();
