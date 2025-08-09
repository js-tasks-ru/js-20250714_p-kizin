import ColumnChartBuilder from "../../04-oop-basic-intro-to-dom/1-column-chart/ColumnChartBuilder.js";
import ColumnChartDataV2 from "./ColumnChartDataV2.js";
import ColumnChartLoader from "./ColumnChartLoader.js";

export default class ColumnChartV2 extends ColumnChartDataV2 {
  #element;
  get element() { return this.#element; }

  #subElements;
  get subElements() { return this.#subElements; }

  constructor(data) {
    super(data);

    this.#element = ColumnChartBuilder.build(this);

    this.#subElements = {
      container: this.#element.children[1],
      header: this.#element.children[1].children[0],
      body: this.#element.children[1].children[1],
    };

    (async () => await this.update(this.range.from, this.range.to))();
  }

  async update(from, to) {
    this.#element.classList.add('column-chart_loading');

    const data = await ColumnChartLoader.loadData(this.url, from, to);

    this.#element.classList.remove('column-chart_loading');

    super.update(data);

    this.#subElements.header.textContent = this.formatHeading(this.value);
    this.#subElements.body.innerHTML = '';
    this.#subElements.body.append(...ColumnChartBuilder.buildValues(this));

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
  