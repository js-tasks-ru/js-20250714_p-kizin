import SortableTableData from "../../05-dom-document-loading/2-sortable-table-v1/SortableTableData.js";

export default class SortableTableDataV2 extends SortableTableData {
  constructor(headerConfig = [], data = []) {
    super(headerConfig, data);
  }

  sort(columnId, order) {
    const sortable = this.isColumnSortable(columnId);
    if (!sortable) { return; }

    this.headerConfig
      .filter(({ sortable }) => sortable)
      .forEach(column => {
        column.order = undefined;
      });
    
    const sortColumn = this.headerConfig.find(({id}) => id === columnId);
    sortColumn.order = order;
    
    super.sort(columnId, order);
  }

  isColumnSortable(columnId) {
    const { sortable } = this.headerConfig?.find(({id}) => id === columnId) ?? {};

    return sortable;
  }
}
