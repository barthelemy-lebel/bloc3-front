/**Navbar Componnents
 * Génère une nav bar en fonction des items passé.
 * 
 * Propriétés :
 *  - items: type[list]
 * 
 * Example : 
 *    <app-navbar items='["Accueil", "Clients", "Annonces", "Profil"]'></app-navbar>
 */

import { LitElement, css, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class Navbar extends LitElement {
    static styles = css`
    :host {
      display: block;
    }

    nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      color: white;
      background: #79a9d1;
    }

    nav #logo a {
      display: flex;
      flex-direction: row;
      align-items: center;
      font-family: 'Madimi One';
      font-size: 18px;
    }

    nav #logo a img {
      width: 4rem;
      height: 4rem;
    }

    ul {
      list-style: none;
      display: flex;
      gap: 1rem;
    }

    li {
      margin-right: 1rem;
    }


    a {
      text-decoration: none;
      color: white;
      font-size: 1.2rem;
    }

    .burger-menu {
      display: none;
      cursor: pointer;
      font-size: 2rem;
    }

    @media (max-width: 768px) {
      ul {
        display: none;
        flex-direction: column;
        position: absolute;
        top: 50px;
        left: 0;
        width: 100%;
        background-color: #79a9d1;
        padding: 1rem;
        z-index: 10000;
      }

      ul.show {
        display: flex;
      }

      .burger-menu {
        display: block;
      }
    }
  `;

  static get properties() {
    return {
      items: { type: Array },
    };
  }

  constructor() {
    super();
    this.items = [];
  }

  render() {
    return html`
      <nav>
        <div id="logo">
          <a href="/src/admin/accueil.html">
            <img src="/src/assets/logo-white.png" alt="logo"></img>Meet-Imo
          </a>
        </div>

        <ul>
          ${this.items.map(item => html`<li><a href="/src/admin/${item.toLowerCase()}.html">${item}</a></li>`)}
        </ul>

        <div class="burger-menu" @click="${this.toggleMenu}">&#9776;</div>
      </nav>
    `;
  }

  toggleMenu() {
    const menu = this.shadowRoot.querySelector('ul');
    menu.classList.toggle('show');
  }
}

customElements.define('app-navbar', Navbar);
