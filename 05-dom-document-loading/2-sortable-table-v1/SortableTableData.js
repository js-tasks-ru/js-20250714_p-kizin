export default class SortableTableData {
  #headerConfig;
  get headerConfig() { return this.#headerConfig; }

  #data;
  get data() { return this.#data; }
  set data(data) { this.#data = data;}

  constructor(headerConfig = [], data = []) {
    this.#headerConfig = headerConfig;
    this.#data = data;
  }

  sort(columnId, order) {
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
  }

  remove() {}
}
