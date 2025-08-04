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
          <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" ${order ? `data-order="${order}"` : ''}>
            <span>${title}</span>
              ${order ? `
                <span data-element="arrow" class="sortable-table__sort-arrow">
                  <span class="sort-arrow"></span>
                </span>
              ` : ''}
          </div>
        `)
        .reduce((acc, item) => acc + item, '');
      
    return headerTemplate;
  }

  static createBodyTemplate(data) {
    const bodyTemplate = data.data
        .map(({id, ...rest}) => `
          <a href="/products" class="sortable-table__row">
            ${Object.values(rest)
              .map((val, idx) => `
                <div class="sortable-table__cell">
                  ${idx === 0 ? `<img class="sortable-table-image" alt="Image" src="${val[0].url}" />` : val}
                </div>
              `)
              .reduce((acc, item) => acc + item, '')}
          </a>
        `)
        .reduce((acc, item) => acc + item, '');

    return bodyTemplate;
  }

  static createLoadingTemplate(data) {
    const loadingTemplate = `
      <div data-element="loading" class="loading-line sortable-table__loading-line">
      </div>
    `;

    return loadingTemplate;
  }

  static createEmptyPlaceholderTemplate() {
    const emptyPlaceholderTemplate = `
      <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
        <div>
          <p>No products satisfies your filter criteria</p>
          <button type="button" class="button-primary-outline">Reset all filters</button>
        </div>
      </div>
    `;

    return emptyPlaceholderTemplate;
  }
}
