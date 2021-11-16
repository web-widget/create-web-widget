import "./my-element.ts";

interface WebWidgetApplicationInterface {
  container: HTMLElement;
  data: any;
  name: string;
}

export default () => ({
  async mount({ container, data }: WebWidgetApplicationInterface) {
    container.innerHTML = "";
    const element = document.createElement("my-element");
    Object.assign(element, data);

    container.appendChild(element);
  },
  async unmount({ container }) {
    container.innerHTML = "";
  },
});
