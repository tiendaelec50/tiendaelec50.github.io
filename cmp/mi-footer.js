class MiFooter
  extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /* html */
      `<p>
        &copy; 2021
        Ramos Vazquez Nicolas.
      </p>`;
  }
}

customElements.define(
  "mi-footer", MiFooter);
