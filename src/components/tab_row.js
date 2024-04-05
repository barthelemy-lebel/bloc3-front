/**Pop-up Componnents
 * Génère une pop-up.
 * 
 * Propriétés :
 *  - type: type[str]
 *  - text: type[str]
 *  - visible: type[str]
 * 
 * Example : 
 *    <app-popup type="validation" text="L'annonce à bien été ajouté."></app-popup>
 */

import { LitElement, css, html } from 'https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js';

class Popup extends LitElement {
  static styles = css`
    tr {
      background: white;
      border: solid 1px 
    }
  `;

  static get properties() {
    return {
      name: { type: String },
      email: { type: String },
      actions: { type: Map },
    };
  }

  constructor() {
    super();
    this.name = '';
    this.email = '';
    this.actions = {};
  }

  render() {
    return html`
    <tr class="bg-white border-b border-gray-700">
      <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
        ${this.name}
      </th>
      <td class="px-6 py-4">
        ${this.email}
      </td>
      <td class="px-6 py-4">
        <button action="${this.actions.value}>${this.actions.key}</button>
      </td>
    </tr>
    `;
  }
}

customElements.define('client-row', Popup);
