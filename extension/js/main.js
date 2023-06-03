const ChromeRequest = (() => {
  let requestId = 0;

  function getData(data) {
    const id = requestId++;

    return new Promise((resolve, reject) => {
      const listener = (evt) => {
        if (evt.detail.requestId === id) {
          // Deregister self
          window.removeEventListener("sendChromeData", listener);
          resolve(evt.detail.data);
        }
      };

      window.addEventListener("sendChromeData", listener);

      const payload = { data, id };

      window.dispatchEvent(
        new CustomEvent("getChromeData", { detail: payload })
      );
    });
  }

  return { getData };
})();

ChromeRequest.getData("whatever").then((data) => {
  console.log("Received data:", data);
});
