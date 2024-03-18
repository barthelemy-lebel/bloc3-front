import { LitElement, css, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class Card extends LitElement {
  static styles = css`
    .custom-container {
      width: 75%;
      background-color: #79a9d1;
      border-radius: 0.25rem;
      margin-top: 2rem;
      margin-left: auto;
      margin-right: auto;
    }

    .image-link {
        display: block;
        border-radius: 0.5rem 0.5rem 0 0;
    }

    .image-link img {
        width: 100%;
        display: block;
        border-radius: 0.5rem 0.5rem 0 0;
    }

    .content {
        padding: 1.25rem;
    }

    .title-link {
        text-decoration: none;
    }

    .title {
        margin-bottom: 0.5rem;
        font-size: 1.25rem;
        font-weight: 700;
        line-height: 1.25;
        color: #1F2937;
    }

    .description {
        margin-bottom: 0;
        font-size: 0.875rem;
        color: #FFF;
    }
  `;

  static get properties() {
    return {
      title: {type: String},
      price: {type: String},
      surface: {type: String},
      location: {type: String},
      id: {type:String},
    }
  }

  constructor() {
    super();
    this.title = ""
    this.price = ""
    this.surface = ""
    this.location = ""
    this.redirection = ""
  }

  render() {
    return html`
    <div class="custom-container">
      <a href="annonce-detail.html" class="image-link">
        <img class="rounded-top" src="/src/assets/fond-annonce.jpg" alt="" />
      </a>
      <div class="content">
        <a href="annonce-detail.html" class="title-link">
            <h5 class="title">${this.title}</h5>
        </a>
        <p class="description">${this.price}€/mois - ${this.surface}m² - ${this.location}</p>
      </div>
    </div>

    `;
  }
}

customElements.define('app-submission', Card);
