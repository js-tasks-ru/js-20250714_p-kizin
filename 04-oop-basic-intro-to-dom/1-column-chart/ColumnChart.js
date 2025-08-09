import ColumnChartBuilder from "./ColumnChartBuilder.js";
import ColumnChartData from "./ColumnChartData.js";

export default class ColumnChart extends ColumnChartData {
  #element;
  get element() { return this.#element; }

  constructor(data) {
    super(data);

    this.#element = ColumnChartBuilder.build(this);
  }

  update(data) {
    super.update(data);

    const container = this.#element.children[1];
    const body = container.children[1];
    body.innerHTML = '';

    body.append(...ColumnChartBuilder.buildValues(this));
  }

  remove() {
    super.remove();
    
    this.#element.remove();
  }

  destroy() {
    this.remove();
  }
}
  