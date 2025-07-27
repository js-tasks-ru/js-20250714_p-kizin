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
    
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');

    this.#element = tooltip;

    const render = (message) => this.render(message);

    const remove = () => this.remove();

    this.#elementPointerOverHandler = function (event) {
      if (event.target.dataset.tooltip != undefined) {
        render(event.target.dataset.tooltip);
      }
    };

    this.#elementPointerOutHandler = function (event) {
      if (event.target.dataset.tooltip != undefined) {
        remove();
      }
    };

    document.addEventListener('pointerover', this.#elementPointerOverHandler);

    document.addEventListener('pointerout', this.#elementPointerOutHandler);
  }

  render(message = '') {
    if (!this.#element) { return; }

    this.#element.textContent = message;

    const container = document.getElementById('container');
    container.append(this.#element);
  }

  remove() {
    if (!this.#element) { return; }

    this.#element.removeEventListener('pointerover', this.#elementPointerOverHandler);

    this.#element.removeEventListener('pointerout', this.#elementPointerOutHandler);
    
    this.#element.remove();
  }

  destroy() {
    this.remove();
  }
}

export default Tooltip;
