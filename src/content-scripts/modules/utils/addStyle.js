import { removeElementById } from "./removeElement";

export const addStyle = (id, css) => {
  // remove before insert the style
  removeElementById(id);

  const style = document.createElement("style");
  style.id = id;
  style.className = "RFYT";
  style.textContent = css;

  if (document.head) {
    document.head.append(style);
  }
  document.documentElement.append(style);
};
