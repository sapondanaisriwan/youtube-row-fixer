import { getAllStorage, getStorage } from "./modules/utils/storage";
import { KeyExtensionStatus, KeyShelfItemPerRow, settingKey } from "../data/storage-key";
import { injectAllChanges } from "./modules/options/optionsChanges";
import { optionPostsPerRow } from "./modules/options/postsPerRow";
import { optionShortsPerRow } from "./modules/options/shortsPerRow";
// import message from "../data/message";
// import { sendMessage } from "./modules/utils/sendMessage";

let allData;

chrome.storage.onChanged.addListener(async (changes) => {
  if (changes[KeyExtensionStatus]) {
    // window.location.reload();
    return;
  }

  allData = await getAllStorage(settingKey);

  // will return if the extension is disabled
  if (!allData[KeyExtensionStatus]) {
    return;
  }
  injectAllChanges(allData);
});

const main = async () => {
  const extensionStatus = await getStorage(KeyExtensionStatus);

  // will return if the extension is disabled
  if (!extensionStatus) {
    // try {
    //   const response = await sendMessage({ cmd: message.extensionStatus });
    //   console.log(response)
    // } catch (error) {
    //   console.log(error);
    // }
    return;
  }

  allData = await getAllStorage(settingKey);

  injectAllChanges(allData);
  optionPostsPerRow();
  optionShortsPerRow(allData[KeyShelfItemPerRow])
  // try {
  //   console.log("send");
  //   const response = await sendMessage({ cmd: message.injected });
  //   console.log(response);
  //   console.log(response);
  // } catch (error) {
  //   console.log(error);
  // }
};

main();
