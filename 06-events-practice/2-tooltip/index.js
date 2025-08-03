class Tooltip {
  static #singleton;

  #element;
  get element() { return this.#element; }

  #elementPointerOverHandler;

  #elementPointerOutHandler;

  constructor() {
    if (!Tooltip.#singleton) {
      Tooltip.#singleton = this;
    }

    return Tooltip.#singleton;
  }

  initialize () {
    this.#createElement();
    this.#addPointerOverHandler();
    this.#addPointerOutHandler();
  }

  render(message = '') {
    if (!this.#element) { return; }

    this.#element.textContent = message;

    const container = document.getElementById('container');
    container.append(this.#element);
  }

  remove() {
    if (!this.#element) { return; }

    this.#element.remove();
  }

  destroy() {
    if (!this.#element) { return; }

    document.removeEventListener('pointerover', this.#elementPointerOverHandler);

    document.removeEventListener('pointerout', this.#elementPointerOutHandler);

    this.remove();
  }

  #createElement() {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');

    this.#element = tooltip;
  }

  #addPointerOverHandler() {
    this.#elementPointerOverHandler = (event) => {
      if (event.target.dataset.tooltip != undefined) {
        this.render(event.target.dataset.tooltip);
      }
    };

    document.addEventListener('pointerover', this.#elementPointerOverHandler);
  }

  #addPointerOutHandler() {
    this.#elementPointerOutHandler = (event) => {
      if (event.target.dataset.tooltip != undefined) {
        this.remove();
      }
    };

    document.addEventListener('pointerout', this.#elementPointerOutHandler);
  }
}

export default Tooltip;
