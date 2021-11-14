import style from "./style.css";

interface WebWidgetApplicationInterface {
  container: HTMLElement;
  data: any;
  name: string;
}

export default () => ({
  async mount({ container, data }: WebWidgetApplicationInterface) {
    container.innerHTML = `
      <style>${style}</style>
      <div class="app">${data.message}</div>
    `;
  },
});
