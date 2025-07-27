export default class DoubleSlider {
    #min;
    get min() { return this.#min; }

    #max
    get max() { return this.#max; }

    #formatValue
    get formatValue() { return this.#formatValue; }

    #selected
    get selected() { return this.#selected; }

    #pressed
    get pressed() { return this.#pressed; }

    #element
    get element() { return this.#element; }

    #elementPointerDownHandler

    #elementPointerMoveHandler

    #elementPointerUpHandler

    constructor({ min = 0, max = 100, formatValue = value => value, selected } = {}) {
      this.#min = min;
      this.#max = max;
      this.#formatValue = formatValue;
      this.#selected = selected ?? { from: this.#min, to: this.#max};

      this.build();
      this.render();
      this.addPointerDownHandler();
      this.addPointerMoveHandler();
    }

    build() {
      const rangeSlider = document.createElement('div');
      rangeSlider.classList.add('range-slider');

      rangeSlider.innerHTML = `
          <span data-element="from">$10</span>
            <div class="range-slider__inner">
              <span class="range-slider__progress" style="left: 0%; right: 0%"></span>
              <span class="range-slider__thumb-left" style="left: 0%"></span>
              <span class="range-slider__thumb-right" style="right: 0%"></span>
            </div>
          <span data-element="to">$100</span>
        `;

      this.#element = rangeSlider;
    }

    render() {
      const left = Math.floor((this.#selected.from - this.#min) * 100 / (this.#max - this.#min));
      const right = Math.floor((this.#max - this.#selected.to) * 100 / (this.#max - this.#min));
  
      let element = this.#element.querySelector('span[data-element="from"]');
      element.textContent = this.#formatValue(this.#selected.from);

      element = this.#element.querySelector('.range-slider__progress');
      element.style.left = `${left}%`;
      element.style.right = `${right}%`;

      element = this.#element.querySelector('.range-slider__thumb-left');
      element.style.left = `${left}%`;

      element = this.#element.querySelector('.range-slider__thumb-right');
      element.style.right = `${right}%`;

      element = this.#element.querySelector('span[data-element="to"]');
      element.textContent = this.#formatValue(this.#selected.to);
    }

    addPointerDownHandler() {
      const press = () => {
        this.#pressed = true;
      };

      const unpress = () => {
        this.#pressed = false;
        this.#element.dispatchEvent(new CustomEvent('range-select', { detail: this.#selected }));
      };

      this.#elementPointerDownHandler = function (event) {
        if (!event.target.classList.contains('range-slider__thumb-left')
              && !event.target.classList.contains('range-slider__thumb-right')) { return; }
  
        press();
      };
  
      this.#elementPointerUpHandler = function (event) {
        if (!event.target.classList.contains('range-slider__thumb-left')
              && !event.target.classList.contains('range-slider__thumb-right')) { return; }
  
        unpress();
      };

      this.#element.addEventListener('pointerdown', this.#elementPointerDownHandler);

      this.#element.addEventListener('pointerup', this.#elementPointerUpHandler);
    }

    addPointerMoveHandler() {
      const isPressed = () => this.#pressed;
  
      const moveThumbLeft = (event) => {
        const moveToLeft = event.clientX / 1000 < this.#selected.from / this.#min;
        this.#selected.from = moveToLeft
          ? Math.floor((1000 - event.clientX) / 1000 * this.#min + event.clientX / 1000 * this.#max)
          : Math.min(this.#selected.to, Math.floor((1000 - event.clientX) / 1000 * this.#min + event.clientX / 1000 * this.#max));
      };

      const moveThumbRight = (event) => {
        const moveToLeft = event.clientX / 1000 < this.#selected.from / this.#min;
        this.#selected.to = moveToLeft
          ? Math.max(this.#selected.from, Math.floor((1000 - event.clientX) / 1000 * this.#min + event.clientX / 1000 * this.#max))
          : Math.floor((1000 - event.clientX) / 1000 * this.#min + event.clientX / 1000 * this.#max);
      };

      const render = () => this.render();

      this.#elementPointerMoveHandler = function (event) {
        if (!event.target.classList.contains('range-slider__thumb-left')
              && !event.target.classList.contains('range-slider__thumb-right')) { return; }
  
        if (!isPressed()) { return; }
  
        if (event.target.classList.contains('range-slider__thumb-left')) {
          moveThumbLeft(event);
        } else {
          moveThumbRight(event);
        }

        render();
      };
  
      this.#element.addEventListener('pointermove', this.#elementPointerMoveHandler);
    }

    remove() {
      this.#element.removeEventListener('pointerdown', this.#elementPointerDownHandler);

      this.#element.removeEventListener('pointerup', this.#elementPointerUpHandler);

      this.#element.removeEventListener('pointermove', this.#elementPointerMoveHandler);
    
      this.#element.remove();
    }

    destroy() {
      this.remove();
    }
}
