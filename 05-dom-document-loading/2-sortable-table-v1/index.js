export default class SortableTable {
  #headerConfig = [];
  get headerConfig() { return this.#headerConfig; }

  #data = [];
  get data() { return this.#data; }

  #element = null;
  get element() { return this.#element; }

  #subElements = {};
  get subElements() { return this.#subElements; }

  constructor(headerConfig = [], data = []) {
    this.#headerConfig = headerConfig;
    this.#data = data;

    this.#element = this.#build();
  }

  sort(columnId, order) {
    let column = this.#element.querySelector(`.sortable-table__cell[data-id=${columnId}]`);
    column.setAttribute('data-order', order);

    const { sortType } = this.#headerConfig.find(({id}) => id === columnId);

    let sortFuntion;
    const coeff = order === 'asc' ? 1 : -1;
    if (sortType === 'string') {
      sortFuntion = (a, b) => coeff * a[columnId].localeCompare(b[columnId], ['ru', 'en'], { caseFirst: 'upper' });
    }
    else if (sortType === 'number') {
      sortFuntion = (a, b) => coeff * (a[columnId] - b[columnId]);
    }
    else if (sortType === 'date') {
      sortFuntion = (a, b) => coeff * (a[columnId] < b[columnId] ? 1 : -1);
    }

    if (sortFuntion) {
      this.#data.sort(sortFuntion);
    }

    let body = this.#element.querySelector(`.sortable-table__body`);
    body.innerHTML = '';
    body.innerHTML = this.#buildBodyContent();
  }

  destroy() {
    this.#element = null;
  }

  #build() {
    let table = document.createElement('div');
    table.classList.add('sortable-table');

    let header = document.createElement('div');
    header.classList.add('sortable-table__header');
    header.classList.add('sortable-table__row');
    header.setAttribute('data-element', 'header');
    header.innerHTML = this.#buildHeaderContent();

    table.appendChild(header);

    this.#subElements.header = header;

    let body = document.createElement('div');
    body.classList.add('sortable-table__body');
    body.setAttribute('data-element', 'body');
    body.innerHTML = this.#buildBodyContent();

    table.appendChild(body);

    this.#subElements.body = body;

    return table;
  }

  #buildHeaderContent() {
    const headerContent = this.#headerConfig
      .map(({id, title, sortable, order}) => `
        <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" ${order && `data-order="${order}"`}>
          <span>${title}</span>
            ${sortable && `
              <span data-element="arrow" class="sortable-table__sort-arrow">
                <span class="sort-arrow"></span>
              </span>
            `}
        </div>
      `);
    
    return headerContent;
  }

  #buildBodyContent() {
    const bodyContent = this.#data
      .map(({id, ...rest}) => `
        <a href="/products" class="sortable-table__row">
          ${Object.values(rest).map(val => `
            <div class="sortable-table__cell">${val}</div>
          `)}
        </a>
      `);

    return bodyContent;
  }
}

