import "./my-element.js";

export default () => ({
  async mount({ container, data }) {
    container.innerHTML = "";
    const element = document.createElement("my-element");
    Object.assign(element, data);

    container.appendChild(element);
  },
  async unmount({ container }) {
    container.innerHTML = "";
  },
});
