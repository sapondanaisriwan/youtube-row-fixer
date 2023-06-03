let videosPerRow;
let shortsPerRow;
const target = "ytd-rich-grid-renderer";

// Event handler function to handle the received data event
const handleDataEvent = ({ detail: { data } }) => {
  videosPerRow = data.videosPerRow;
  shortsPerRow = data.shortsPerRow;
};

// Listen for the sendChromeData event and invoke handleDataEvent
window.addEventListener("sendRowFixerData", handleDataEvent);

// Dispatch a custom event to get storage data
window.dispatchEvent(new CustomEvent("getRowFixerData"));

if (customYtElements) {
  customYtElements.whenRegistered(target, (proto) => {
    proto.calcElementsPerRow = (a, b) => {
      return a === 154 ? shortsPerRow : videosPerRow;
    };
  });
}
