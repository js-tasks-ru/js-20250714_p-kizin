class Tooltip {
  static #singleton;

  static #element;
  get element() { return Tooltip.#element; }

  constructor() {
    if (!Tooltip.#singleton) {
      Tooltip.#singleton = this;
    }

    return Tooltip.#singleton;
  }

  initialize () {
    if (Tooltip.#element) { return; }
    
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');

    Tooltip.#element = tooltip;

    const render = (message) => this.render(message);

    const remove = () => this.remove();

    document.addEventListener('pointerover', function (event) {
      if (event.target.dataset.tooltip != undefined) {
        render(event.target.dataset.tooltip);
      }
    });

    document.addEventListener('pointerout', function (event) {
      if (event.target.dataset.tooltip != undefined) {
        remove();
      }
    });
  }

  render(message = '') {
    if (!Tooltip.#element) { return; }

    Tooltip.#element.textContent = message;

    const container = document.getElementById('container');
    container.append(Tooltip.#element);
  }

  remove() {
    if (!Tooltip.#element) { return; }
    
    Tooltip.#element.remove();
  }

  destroy() {
    this.remove();
  }
}

export default Tooltip;
