import SortableTableBuilder from "./SortableTableBuilder";
import SortableTableData from "./SortableTableData";

export default class SortableTable extends SortableTableData {
  #element;
  get element() { return this.#element; }

  #subElements;
  get subElements() { return this.#subElements; }

  constructor(headerConfig, { data, sorted }) {
    super(headerConfig, data);

    this.#element = SortableTableBuilder.build(this);

    this.#setHeaderHandler();

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

    this.#setHeaderHandler();

    const body = this.#element.querySelector(`.sortable-table__body`);
    body.innerHTML = '';
    body.innerHTML = SortableTableBuilder.buildBodyContent(this);
  }

  clickHeader(columnId, order) {
    this.sort(columnId, order === 'desc' ? 'asc' : 'desc');
  }

  remove() {
    super.remove();

    this.#element.remove();
  }

  destroy() {
    this.remove();
  }

  #setHeaderHandler() {
    this.headerConfig
      .filter(({ sortable }) => sortable)
      .forEach(({ id: columnId, order }) => {
        const column = this.#element.querySelector(`.sortable-table__cell[data-id=${columnId}]`);
        column.addEventListener('pointerdown', () => {
          this.clickHeader(columnId, order);
        });
      });
  }
}

