import style from "./style.css";

export default () => ({
  async mount({ container, data }) {
    container.innerHTML = `
      <style>${style}</style>
      <div class="app">${data.message}</div>
    `;
  },
});
