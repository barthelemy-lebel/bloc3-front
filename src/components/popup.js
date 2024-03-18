import { LitElement, css, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class Popup extends LitElement {
  static styles = css`
    .popup {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 10;

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      padding: 10px;
      background: rgb(58, 80, 165);
      border-radius: 0.5rem;

      color: white;
      font-size: 1em;
      width: 70%;

      opacity: 0;
      transition: opacity 0.5s ease-in-out;
    }

    .popup.visible {
      opacity: 1;
    }

    .popup svg {
      margin-right: 5px;
      fill: green;
    }
  `;

  static get properties() {
    return {
      type: { type: String },
      text: { type: String },
      visible: { type: Boolean },
    };
  }

  constructor() {
    super();
    this.type = '';
    this.text = '';
    this.visible = false; // Initialiser la visibilité à false
  }

  // Méthode pour afficher la popup
  show() {
    this.visible = true;
  }

  // Méthode pour masquer la popup
  hide() {
    this.visible = false;
  }

  render() {
    return html`
      <div class="popup ${this.visible ? 'visible' : ''} ${this.type}">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="${this.svgColor}" class="bi bi-check-circle" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
        </svg>
        ${this.text}
      </div>
    `;
  }
}

customElements.define('app-popup', Popup);
