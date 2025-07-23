export default class SortableTableBuilder {
  static build(data) {
    let table = document.createElement('div');
    table.classList.add('sortable-table');

    let header = document.createElement('div');
    header.classList.add('sortable-table__header');
    header.classList.add('sortable-table__row');
    header.setAttribute('data-element', 'header');
    header.innerHTML = SortableTableBuilder.#buildHeaderContent(data);

    table.appendChild(header);

    let body = document.createElement('div');
    body.classList.add('sortable-table__body');
    body.setAttribute('data-element', 'body');
    body.innerHTML = SortableTableBuilder.buildBodyContent(data);

    table.appendChild(body);

    return table;
  }

  static buildBodyContent(data) {
    const bodyContent = data.data
        .map(({id, ...rest}) => `
          <a href="/products" class="sortable-table__row">
            ${Object.values(rest).map(val => `
              <div class="sortable-table__cell">${val}</div>
            `)}
          </a>
        `);

    return bodyContent;
  }

  static #buildHeaderContent(data) {
    const headerContent = data.headerConfig
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
}
