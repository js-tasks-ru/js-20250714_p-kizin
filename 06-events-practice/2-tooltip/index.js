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
    if (this.#element) { return; }
    
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

    this.#element.removeEventListener('pointerover', this.#elementPointerOverHandler);

    this.#element.removeEventListener('pointerout', this.#elementPointerOutHandler);
    
    this.remove();
  }

  #createElement() {
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');

    this.#element = tooltip;
  }

  #addPointerOverHandler() {
    const render = (message) => this.render(message);

    this.#elementPointerOverHandler = function (event) {
      if (event.target.dataset.tooltip != undefined) {
        render(event.target.dataset.tooltip);
      }
    };

    document.addEventListener('pointerover', this.#elementPointerOverHandler);
  }

  #addPointerOutHandler() {
    const remove = () => this.remove();

    this.#elementPointerOutHandler = function (event) {
      if (event.target.dataset.tooltip != undefined) {
        remove();
      }
    };

    document.addEventListener('pointerout', this.#elementPointerOutHandler);
  }
}

export default Tooltip;
