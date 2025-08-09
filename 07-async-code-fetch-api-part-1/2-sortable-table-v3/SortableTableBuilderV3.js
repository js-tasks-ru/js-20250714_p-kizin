import SortableTableBuilder from "../../05-dom-document-loading/2-sortable-table-v1/SortableTableBuilder.js";

export default class SortableTableBuilderV3 extends SortableTableBuilder {
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
