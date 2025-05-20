import { eventGetRowFixerData, eventSendRowFixerData } from "../../data/event";
import { settingKey } from "../../data/storage-key";
import port from "../modules/utils/port";
import { getAllStorage } from "../modules/utils/storage";

// https://stackoverflow.com/questions/76937442/chrome-extension-manifest-v3-is-there-a-way-to-communicate-between-background-s
// According to @wOxxOm comment (thanks), need to use two content_scripts:
// - first one (without specified "world" property) to run WebSocket;
// - second one in "world": "MAIN" to work with page api;
// To communicate between them we can use CustomEvent, window.dispatchEvent and window.addEventListener. So for now when script #1 with WebSocket receiving specific command message I can dispatch event requesting data from script #2.

chrome.storage.onChanged.addListener(async (changes) => {
  const allData = await getAllStorage(settingKey);
  port.callEvent({
    name: eventSendRowFixerData,
    detail: allData,
  });
});

port.listen(eventGetRowFixerData, async (event) => {
  const allData = await getAllStorage(settingKey);
  port.callEvent({
    name: eventSendRowFixerData,
    detail: allData,
  });
});

// window.addEventListener(eventGetRowFixerData, async (event) => {
//   const allData = await getAllStorage(settingKey);
//   port.callEvent({ name: eventSendRowFixerData, detail: allData });
// });
