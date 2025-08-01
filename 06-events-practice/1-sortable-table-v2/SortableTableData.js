export default class SortableTableData {
  #headerConfig;
  get headerConfig() { return this.#headerConfig; }

  #data;
  get data() { return this.#data; }

  constructor(headerConfig = [], data = []) {
    this.#headerConfig = headerConfig;
    this.#data = data;
  }

  sort(columnId, order) {
    const sortable = this.isColumnSortable(columnId);
    if (!sortable) { return; }

    this.#headerConfig
      .filter(({ sortable }) => sortable)
      .forEach(column => {
        column.order = undefined;
      });
    
    const sortColumn = this.#headerConfig.find(({id}) => id === columnId);
    sortColumn.order = order;
    
    const { sortType } = sortColumn;

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
  }

  isColumnSortable(columnId) {
    const { sortable } = this.#headerConfig.find(({id}) => id === columnId);

    return sortable;
  }

  remove() {}
}
