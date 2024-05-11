import { LitElement, css, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class Client extends LitElement {
  static get properties() {
    return {
      client: { type: String }
    };
  }

  static styles = css `
    .tag {
      width: auto;
      background-color: #7c3aed;
      border-radius: 5px;
      padding-left: 5px;
      padding-right: 5px;
      color: white;
    }
  `

  render() {
    const apiEndpoint = 'http://127.0.0.1:8000/'
    const token = localStorage.getItem('jwt-token')
    if (this.client) {
      fetch(`${apiEndpoint}${this.client}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
        })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Erreur HTTP ! Statut : ${response.status}`)
          }
          return response.json()
        })
        .then(clientData => {
          this.client = clientData.firstname + " " + clientData.name
        })
        .catch(error => {
          console.error('Erreur lors de la requête :', error)
        })
        return html`
          <div class="tag">
            <p>${this.client}</p>
          </div>
        `;
      }
    }
  }

customElements.define('app-client', Client);

class AnnonceImmobiliere extends LitElement {
  static get properties() {
    return {
      title: { type: String },
      price: { type: String },
      surface: {type: String },
      location: { type: String },
      id: {type: String},
      image: { type: String },
      client: { type: String },
    };
    if (!this.image) {
      this.image = '/src/assets/default-image.png'
    }
  }

  static styles = css`
    .annonce-container {
      width: 300px;
      @apply sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 px-4 mb-8;
    }

    .card {
      background-color: white;
      border-radius: 0.5rem;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .image {
      width: 100%;
      height: 10rem;
      object-fit: cover;
      border-top-left-radius: 0.5rem;
      border-top-right-radius: 0.5rem;
    }

    .content {
      padding: 1rem;
    }

    .head-submission {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 100%
    }

    .title {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 60%;
    }

    .location,
    .surface {
      color: #4b5563;
      margin: 0;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      width: 100%;
    }

    .link {
      color: #3b82f6;
      text-decoration: none;
    }

    .text-black {
      color: black!important;
    }
  `;


  render() {
    return html`
      <div class="annonce-container">
        <div class="card">
          <img class="image" src="${this.image}" alt="Annonce Image">
          <div class="content">
            <div class="head-submission flex flex-row items-center justify-between">
              <h2 class="title">${this.title}</h2>
              <p class="price"><span class="text-black">${this.price}€</span> /mois</p> 
            </div>
            
            <p class="surface">Surface : ${this.surface}m²</p>
            <p class="location" title="${this.location}">Localisation : ${this.location}</p>
            <div class="head-submission">
              <a href="/src/submission/annonce-detailV2.html?id=${this.id}" class="link">Voir plus</a>
              <app-client client="${this.client}"></app-client>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define('app-submission', AnnonceImmobiliere);
