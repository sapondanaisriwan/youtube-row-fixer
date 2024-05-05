export const removeElementById = (id) => {
  const element = document.getElementById(id);
  element && element.remove();
};

export const removeElement = (selector) => {
  const element = document.querySelector(selector);
  element && element.remove();
};
