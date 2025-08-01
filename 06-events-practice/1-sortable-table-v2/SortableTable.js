import SortableTableBuilder from "./SortableTableBuilder";
import SortableTableData from "./SortableTableData";

export default class SortableTable extends SortableTableData {
  #element;
  get element() { return this.#element; }

  #subElements;
  get subElements() { return this.#subElements; }

  #elementEventListener;

  constructor(headerConfig, { data, sorted }) {
    super(headerConfig, data);

    this.#element = SortableTableBuilder.build(this);

    const clickHeader = (columnId, order) => this.clickHeader(columnId, order);

    this.#elementEventListener = function (event) {
      if (!event.target.classList.contains('sortable-table__cell')) { return; }
      
      const { id: columnId, order } = event.target.dataset;

      clickHeader(columnId, order);
    };

    this.#element.addEventListener('pointerdown', this.#elementEventListener);

    this.#subElements = {
      header: this.#element.children[0],
      body: this.#element.children[1],
    };

    if (sorted) {
      const { id: columnId, order } = sorted;
      this.sort(columnId, order); 
    }
  }

  sort(columnId, order) {
    const sortable = super.isColumnSortable(columnId);
    if (!sortable) { return; }

    super.sort(columnId, order);

    const header = this.#element.querySelector(`.sortable-table__header`);
    header.innerHTML = '';
    header.innerHTML = SortableTableBuilder.buildHeaderContent(this);

    const body = this.#element.querySelector(`.sortable-table__body`);
    body.innerHTML = '';
    body.innerHTML = SortableTableBuilder.buildBodyContent(this);
  }

  clickHeader(columnId, order) {
    this.sort(columnId, order === 'desc' ? 'asc' : 'desc');
  }

  remove() {
    super.remove();
  }

  destroy() {
    this.#element.removeEventListener('pointerdown', this.#elementEventListener);

    this.#element.remove();

    this.remove();
  }
}

