class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        &copy; 2021
        Palma Hernandez Daniel.
      </p>`;
  }
}

customElements.define(
  "mi-footer", MiFooter);
