import { html, css, LitElement } from "lit";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyElement extends LitElement {
  static get styles() {
    return css`
      .app {
        width: 512px;
        margin: auto;
        padding: 128px;
        font-family: Avenir, Helvetica, Arial, sans-serif;
        text-align: center;
        color: #000;
        font-size: 1.5em;
        font-weight: bold;
        text-align: center;
        border: 5px solid #000;
        border-radius: 10px;
      }
    `;
  }

  static get properties() {
    return {
      /**
       * The name to say "Hello" to.
       */
      name: { type: String },

      /**
       * The number of times the button has been clicked.
       */
      count: { type: Number },
    };
  }

  constructor() {
    super();
    this.name = "World";
    this.count = 0;
  }

  render() {
    return html`
      <div class="app">
        <h1>Hello, ${this.name}!</h1>
        <button @click=${this._onClick} part="button">
          Click Count: ${this.count}
        </button>
        <slot></slot>
      </div>
    `;
  }

  _onClick() {
    this.count++;
  }
}
