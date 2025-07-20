import ColumnChartBuilder from "./ColumnChartBuilder";
import ColumnChartData from "./ColumnChartData";

export default class ColumnChart extends ColumnChartData {
  #element = null;
  get element() { return this.#element; }

  constructor(data) {
    super(data);

    this.#element = ColumnChartBuilder.build(this);
  }

  update(data) {
    super.update(data);

    let container = this.#element.children[1];
    let body = container.children[1];
    body.innerHTML = '';

    body.append(...ColumnChartBuilder.buildValues(this));
  }

  remove() {
    this.#element = null;
  }

  destroy() {
    this.remove();
  }
}
  