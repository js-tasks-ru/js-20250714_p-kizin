import ColumnChartBuilder from "./ColumnChartBuilder";
import ColumnChartData from "./ColumnChartData";
import ColumnChartLoader from "./ColumnChartLoader";

export default class ColumnChart extends ColumnChartData {
  #element;
  get element() { return this.#element; }

  #subElements;
  get subElements() { return this.#subElements; }

  constructor(data) {
    super(data);

    this.#element = ColumnChartBuilder.build(this);

    this.#subElements = {
      body: this.#element.children[1].children[1],
    };
  }

  async update(from, to) {
    const data = await ColumnChartLoader.loadData(from, to);

    super.update(data);

    const container = this.#element.children[1];
    const body = container.children[1];
    body.innerHTML = '';

    body.append(...ColumnChartBuilder.buildValues(this));

    return data;
  }

  remove() {
    super.remove();
    
    this.#element.remove();
  }

  destroy() {
    this.remove();
  }
}
  