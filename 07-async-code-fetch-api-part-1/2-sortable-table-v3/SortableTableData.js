export default class SortableTableData {
  #headerConfig;
  get headerConfig() { return this.#headerConfig; }

  #data;
  get data() { return this.#data; }

  #url;
  get url() { return this.#url; }

  #isSortLocally;
  get isSortLocally() { return this.#isSortLocally; }

  #sorted;
  get sorted() { return this.#sorted; }

  constructor(headerConfig = [], data = [], url = '', isSortLocally = false, sorted = {}) {
    this.#headerConfig = headerConfig;
    this.#url = url;
    this.#isSortLocally = isSortLocally;
    this.#sorted = sorted;

    this.update(data);
  }

  update(data) {
    this.#data = data.map(dat => Object.fromEntries(Object.entries(dat)
      .filter(([key, _]) => this.#headerConfig.map(({ id }) => id).includes(key))
      .sort(([key1, _], [key2, __]) => 
        this.#headerConfig.findIndex(({ id }) => id === key1) 
        - this.#headerConfig.findIndex(({ id }) => id === key2))));
  }

  sort(columnId, order) {
    const sortable = this.isColumnSortable(columnId);
    if (!sortable) { return; }

    this.updateSortColumn(columnId, order);
    
    const sortColumn = this.#headerConfig.find(({id}) => id === columnId) ?? {};
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

  updateSortColumn(columnId, order) {
    const sortable = this.isColumnSortable(columnId);
    if (!sortable) { return; }
    
    this.#sorted = { id: columnId, order };

    this.#headerConfig
      .filter(({ sortable }) => sortable)
      .forEach(column => {
        column.order = undefined;
      });
    
    const sortColumn = this.#headerConfig.find(({id}) => id === columnId) ?? {};
    sortColumn.order = order;
  }

  isColumnSortable(columnId) {
    const { sortable } = this.#headerConfig.find(({id}) => id === columnId) ?? {};

    return sortable;
  }

  remove() {}
}
