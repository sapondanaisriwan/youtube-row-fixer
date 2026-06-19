import { eventGetRowFixerData, eventSendRowFixerData } from "../../data/event";
import { settingKey } from "../../data/storage-key";
import port from "../modules/utils/port";
import { getAllStorage } from "../modules/utils/storage";

// https://stackoverflow.com/questions/76937442/chrome-extension-manifest-v3-is-there-a-way-to-communicate-between-background-s
// According to @wOxxOm comment (thanks), need to use two content_scripts:
// - first one (without specified "world" property) to run WebSocket;
// - second one in "world": "MAIN" to work with page api;
// To communicate between them we can use CustomEvent, window.dispatchEvent and window.addEventListener. So for now when script #1 with WebSocket receiving specific command message I can dispatch event requesting data from script #2.

const sendSettings = async () => {
  const allData = await getAllStorage(settingKey);
  port.callEvent({
    name: eventSendRowFixerData,
    detail: allData,
  });
};

chrome.storage.onChanged.addListener(async () => {
  await sendSettings();
});

port.listen(eventGetRowFixerData, async () => {
  await sendSettings();
});

// The MAIN and ISOLATED world scripts are registered separately, so Chrome
// does not give us a reliable listener-registration order at document_start.
// Sending once proactively makes the handshake work regardless of which
// script starts first.
sendSettings();

// window.addEventListener(eventGetRowFixerData, async (event) => {
//   const allData = await getAllStorage(settingKey);
//   port.callEvent({ name: eventSendRowFixerData, detail: allData });
// });
