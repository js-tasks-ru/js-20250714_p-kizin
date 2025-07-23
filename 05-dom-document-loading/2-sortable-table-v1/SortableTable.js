import SortableTableBuilder from "./SortableTableBuilder";
import SortableTableData from "./SortableTableData";

export default class SortableTable extends SortableTableData {
  #element;
  get element() { return this.#element; }

  #subElements;
  get subElements() { return this.#subElements; }

  constructor(headerConfig, data) {
    super(headerConfig, data);

    this.#element = SortableTableBuilder.build(this);

    this.#subElements = {
      header: this.#element.children[0],
      body: this.#element.children[1],
    };
  }

  sort(columnId, order) {
    super.sort(columnId, order);

    let body = this.#element.querySelector(`.sortable-table__body`);
    body.innerHTML = '';
    body.innerHTML = SortableTableBuilder.buildBodyContent(this);

    let column = this.#element.querySelector(`.sortable-table__cell[data-id=${columnId}]`);
    column.setAttribute('data-order', order);
  }

  remove() {
    super.remove();

    this.#subElements = undefined;

    this.#element.remove();
  }

  destroy() {
    this.remove();
  }
}

