import RangePickerBuilder from "./RangePickerBuilder.js";
import RangePickerData from "./RangePickerData.js";

export default class RangePicker extends RangePickerData {
  #element;
  get element() { return this.#element; }

  #subElements;
  get subElements() { return this.#subElements; }

  #onclickHandler;

  constructor(data) {
    super(data);

    this.#element = document.createElement('div');
    this.#element.classList.add('rangepicker');
    this.#element.innerHTML = RangePickerBuilder.createTemplate(this);

    this.#subElements = {
      input: this.#element.querySelector('.rangepicker__input'),
      selector: this.#element.querySelector('.rangepicker__selector'),
    };

    this.addOnclickHandler();
  }

  addOnclickHandler() {
    this.#onclickHandler = (event) => {
      if (event.target.classList.contains('rangepicker__input')) {
        if (this.#element.classList.contains('rangepicker_open')) {
          this.#element.classList.remove('rangepicker_open');
          this.#subElements.selector.innerHTML = '';
        }
        else {
          this.#element.classList.add('rangepicker_open');
          this.#subElements.selector.innerHTML = RangePickerBuilder.createSelectorTemplate(this);
        }
      }
      else if (event.target.classList.contains('rangepicker__cell')) {
        if (this.from < this.to || this.from > this.to) {
          this.from = new Date(event.target.dataset.value);
          this.to = new Date(event.target.dataset.value);
        }
        else {
          const newDate = new Date(event.target.dataset.value);
          if (this.from < newDate) {
            this.to = newDate;
          }
          else if (this.from > newDate) {
            this.to = this.from;
            this.from = newDate;
          }
        }

        this.#subElements.input.innerHTML = RangePickerBuilder.createInputTemplate(this);
        this.#subElements.selector.innerHTML = RangePickerBuilder.createSelectorTemplate(this);
      }
      else if (event.target.classList.contains('rangepicker__selector-control-left')) {
        this.month--;
        if (this.month < 0) { 
          this.month = 11; 
          this.year--;
        }

        this.#subElements.selector.innerHTML = RangePickerBuilder.createSelectorTemplate(this);
      }
      else if (event.target.classList.contains('rangepicker__selector-control-right')) {
        this.month++;
        if (this.month > 11) {
          this.month = 0;
          this.year++;
        }

        this.#subElements.selector.innerHTML = RangePickerBuilder.createSelectorTemplate(this);
      }
    };

    this.#element.addEventListener('click', this.#onclickHandler);
  }

  remove() {
    this.#element.removeEventListener('click', this.#onclickHandler);

    this.#element.remove();
  }

  destroy() {
    this.remove();
  }
}
