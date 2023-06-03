let data;
const browser = chrome || browser;
const [runtime, storage] = [browser.runtime, browser.storage.sync];
const settingKeys = ["isEnable", "videosPerRow", "shortsPerRow"];

const config = { childList: true };

const addScript = (src) => {
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

const run = async () => {
  const { isEnable } = await storage.get(["isEnable"]);
  if (isEnable) {
    // addScript("./js/customElements.js");
    addScript("./js/main.js");
  }
};
run();

storage.onChanged.addListener(async () => {
  data = await storage.get(settingKeys);
});

window.addEventListener("getChromeData", async function (evt) {
  const responseData = await storage.get(settingKeys);
  window.dispatchEvent(
    new CustomEvent("sendChromeData", {
      detail: { data: responseData, requestId: evt.detail.id },
    })
  );
});
