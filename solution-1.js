const target = "ytd-rich-grid-renderer";

customElements.whenDefined(target).then(() => {
  const proto = customElements.get(target).prototype;

  const waitUntilExits = () => {
    // call waitUntilExits again after 0ms until it exits
    if (!proto.calcElementsPerRow) return setTimeout(waitUntilExits, 0);

    // Set the value of calcElementsPerRow to 5
    proto.calcElementsPerRow = () => 5;
  };
  waitUntilExits();
});