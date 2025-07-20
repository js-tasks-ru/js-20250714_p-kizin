export default class ColumnChartData {
  #data = [];
  get data() { return this.#data; }

  #label = '';
  get label() { return this.#label; }

  #value = 0;
  get value() { return this.#value; }

  #link = '';
  get link() { return this.#link; }

  #formatHeading = data => `${data}`;
  get formatHeading() { return this.#formatHeading; }

  #chartHeight = 50;
  get chartHeight() { return this.#chartHeight; }

  constructor({ data, label, value, link, formatHeading, chartHeight } = {}) {
    this.#data = data ?? this.#data;
    this.#label = label ?? this.#label;
    this.#value = value ?? this.#value;
    this.#link = link ?? this.#link;
    this.#formatHeading = formatHeading ?? this.#formatHeading;
    this.#chartHeight = chartHeight ?? this.#chartHeight;
  }

  update(data) {
    this.#data = data ?? this.#data;
  }
}
  