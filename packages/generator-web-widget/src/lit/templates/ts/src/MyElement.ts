import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class MyElement extends LitElement {
  static styles = css`
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

  /**
   * The name to say "Hello" to.
   */
  @property()
  name = "World";

  /**
   * The number of times the button has been clicked.
   */
  @property({ type: Number })
  count = 0;

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

  private _onClick() {
    this.count++;
  }

  foo(): string {
    return "foo";
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "my-element": MyElement;
  }
}
