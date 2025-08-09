import ColumnChartData from "../../04-oop-basic-intro-to-dom/1-column-chart/ColumnChartData.js";

export default class ColumnChartDataV2 extends ColumnChartData {
  #url;
  get url() { return this.#url; }

  #range;
  get range() { return this.#range; }
  
  constructor({ url = '', range = {}, ...rest } = {}) {
    super(rest);

    this.#url = url;
    this.#range = range;
  }
}
  