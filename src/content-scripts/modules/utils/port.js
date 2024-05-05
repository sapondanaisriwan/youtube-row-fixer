const port = {};

port.listen = (name, callback) => {
  window.addEventListener(name, callback);
};

port.callEvent = ({ name, detail }) => {
  const customEvent = new CustomEvent(name, {
    detail: { data: detail },
  });
  window.dispatchEvent(customEvent);
};

export default port;
