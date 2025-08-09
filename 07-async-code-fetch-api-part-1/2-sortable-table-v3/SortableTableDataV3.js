import SortableTableDataV2 from "../../06-events-practice/1-sortable-table-v2/SortableTableDataV2.js";

export default class SortableTableDataV3 extends SortableTableDataV2 {
  #url;
  get url() { return this.#url; }

  #isSortLocally;
  get isSortLocally() { return this.#isSortLocally; }

  #sorted;
  get sorted() { return this.#sorted; }

  constructor(headerConfig = [], data = [], url = '', isSortLocally = false, sorted = {}) {
    super(headerConfig, []);
    
    this.#url = url;
    this.#isSortLocally = isSortLocally;
    this.#sorted = sorted;

    this.update(data);
  }

  update(data) {
    this.data = data.map(dat => Object.fromEntries(Object.entries(dat)
      .filter(([key, _]) => this.headerConfig.map(({ id }) => id).includes(key))
      .sort(([key1, _], [key2, __]) => 
        this.headerConfig.findIndex(({ id }) => id === key1) 
        - this.headerConfig.findIndex(({ id }) => id === key2))));
  }

  sort(columnId, order) {
    const sortable = this.isColumnSortable(columnId);
    if (!sortable) { return; }

    this.updateSortColumn(columnId, order);
    
    super.sort(columnId, order);
  }

  updateSortColumn(columnId, order) {
    const sortable = this.isColumnSortable(columnId);
    if (!sortable) { return; }
    
    this.#sorted = { id: columnId, order };

    this.headerConfig
      .filter(({ sortable }) => sortable)
      .forEach(column => {
        column.order = undefined;
      });
    
    const sortColumn = this.headerConfig.find(({id}) => id === columnId) ?? {};
    sortColumn.order = order;
  }
}
