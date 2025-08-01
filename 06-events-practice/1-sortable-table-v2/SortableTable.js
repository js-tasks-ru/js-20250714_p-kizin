import SortableTableBuilder from "./SortableTableBuilder";
import SortableTableData from "./SortableTableData";

export default class SortableTable extends SortableTableData {
  #element;
  get element() { return this.#element; }

  #subElements;
  get subElements() { return this.#subElements; }

  #elementPointerDownHandler;

  constructor(headerConfig, { data, sorted }) {
    super(headerConfig, data);

    this.#element = SortableTableBuilder.createElement(this);

    this.#addPointerDownHandler();

    this.#subElements = {
      header: this.#element.children[0],
      body: this.#element.children[1],
    };

    if (sorted) {
      const { id: columnId, order } = sorted;
      this.#sort(columnId, order); 
    }
  }

  remove() {
    super.remove();
  }

  destroy() {
    this.#element.removeEventListener('pointerdown', this.#elementPointerDownHandler);

    this.#element.remove();

    this.remove();
  }

  #addPointerDownHandler() {
    const clickHeader = (columnId, order) => this.#clickHeader(columnId, order);

    this.#elementPointerDownHandler = function (event) {
      if (!event.target.classList.contains('sortable-table__cell')) { return; }
      
      const { id: columnId, order } = event.target.dataset;

      clickHeader(columnId, order);
    };

    this.#element.addEventListener('pointerdown', this.#elementPointerDownHandler);
  }

  #sort(columnId, order) {
    const sortable = super.isColumnSortable(columnId);
    if (!sortable) { return; }

    super.sort(columnId, order);

    const header = this.#element.querySelector(`.sortable-table__header`);
    header.innerHTML = '';
    header.innerHTML = SortableTableBuilder.createHeaderTemplate(this);

    const body = this.#element.querySelector(`.sortable-table__body`);
    body.innerHTML = '';
    body.innerHTML = SortableTableBuilder.createBodyTemplate(this);
  }

  #clickHeader(columnId, order) {
    this.#sort(columnId, order === 'desc' ? 'asc' : 'desc');
  }
}

