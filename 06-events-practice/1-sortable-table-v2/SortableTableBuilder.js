export default class SortableTableBuilder {
  static createElement(data) {
    const table = document.createElement('div');
    table.classList.add('sortable-table');

    const header = document.createElement('div');
    header.classList.add('sortable-table__header');
    header.classList.add('sortable-table__row');
    header.setAttribute('data-element', 'header');
    header.innerHTML = SortableTableBuilder.createHeaderTemplate(data);

    table.appendChild(header);

    const body = document.createElement('div');
    body.classList.add('sortable-table__body');
    body.setAttribute('data-element', 'body');
    body.innerHTML = SortableTableBuilder.createBodyTemplate(data);

    table.appendChild(body);

    return table;
  }

  static createHeaderTemplate(data) {
    const headerTemplate = data.headerConfig
        .map(({id, title, sortable, order}) => `
          <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" ${order && `data-order="${order}"`}">
            <span>${title}</span>
              ${order && `
                <span data-element="arrow" class="sortable-table__sort-arrow">
                  <span class="sort-arrow"></span>
                </span>
              `}
          </div>
        `);
      
    return headerTemplate;
  }

  static createBodyTemplate(data) {
    const bodyTemplate = data.data
        .map(({id, ...rest}) => `
          <a href="/products" class="sortable-table__row">
            ${Object.values(rest).map(val => `
              <div class="sortable-table__cell">${val}</div>
            `)}
          </a>
        `);

    return bodyTemplate;
  }
}
