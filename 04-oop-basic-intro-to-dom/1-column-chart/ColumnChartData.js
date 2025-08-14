export default class ColumnChartData {
  #data;
  get data() { return this.#data; }

  #label;
  get label() { return this.#label; }

  #value;
  get value() { return this.#value; }

  #link;
  get link() { return this.#link; }

  #formatHeading;
  get formatHeading() { return this.#formatHeading; }

  #chartHeight;
  get chartHeight() { return this.#chartHeight; }

  constructor({ data = {}, label = '', value = 0, link = '', formatHeading = data => `${data}`, chartHeight = 50 } = {}) {
    this.#data = data;
    this.#label = label;
    this.#value = value;
    this.#link = link;
    this.#formatHeading = formatHeading;
    this.#chartHeight = chartHeight;
  }

  update(data = {}) {
    this.#data = data;
    this.#value = Object.values(data).reduce((acc, item) => acc + item, 0);
  }

  remove() {}
}
  