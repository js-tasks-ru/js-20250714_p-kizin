import RangePicker from './components/range-picker/src/index.js';
import SortableTable from './components/sortable-table/src/index.js';
import ColumnChart from './components/column-chart/src/index.js';
import header from './bestsellers-header.js';

export default class Page {
    #element;
    get element() { return this.#element; }

    #subElements;
    get subElements() { return this.#subElements; }

    #rangePicker;
    get rangePicker() { return this.#rangePicker; }

    #charts = [];
    get charts() { return this.#charts; }

    #dateSelectedHandler;

    constructor() {
      this.#element = document.createElement('section');
      this.#element.classList.add('dashboard');
      this.#element.innerHTML = this.#createTemplate();

      this.#subElements = {
        topPanel: this.#element.querySelector('.content__top-panel'),
        chartsRoot: this.#element.querySelector('div[data-element="chartsRoot"]'),
        sortableTable: this.#element.querySelector('div[data-element="sortableTable"]'),
      };

      this.#addDateSelectedListener();
    }

    async render() {
      await this.#renderRangePicker();

      this.#subElements.rangePicker = this.#subElements.topPanel.children[0];

      await this.#renderChart('api/dashboard/orders', 'orders', 'dashboard__chart_orders', '#');

      this.#subElements.ordersChart = this.#subElements.chartsRoot.lastChild;

      await this.#renderChart('api/dashboard/sales', 'sales', 'dashboard__chart_sales');

      this.#subElements.salesChart = this.#subElements.chartsRoot.lastChild;

      await this.#renderChart('api/dashboard/customers', 'customers', 'dashboard__chart_customers');

      this.#subElements.customersChart = this.#subElements.chartsRoot.lastChild;

      await this.#renderTable('api/rest/products');

      return this.#element;
    }

    remove() {
      this.#element.removeEventListener('date-select', this.#dateSelectedHandler);

      this.#element.remove();
    }

    destroy() {
      this.remove();
    }

    #addDateSelectedListener() {
      this.#dateSelectedHandler = async ({ detail: { from, to }}) => {
        this.#charts.forEach(async chart => await chart.update(from, to));
      };

      this.#element.addEventListener('date-select', this.#dateSelectedHandler);
    }

    #createTemplate() { 
      const template = `
        <div class="content__top-panel">
          <h2 class="page-title">Dashboard</h2>
        </div>
        <div data-element="chartsRoot" class="dashboard__charts"></div>
        <h3 class="block-title">Best sellers</h3>
        <div data-element="sortableTable"></div>
      `;

      return template;
    }

    async #renderRangePicker() {
      const from = new Date();
      from.setMonth(from.getMonth() - 1);
      
      const to = new Date();

      const rangePicker = new RangePicker({ from, to });

      this.#subElements.topPanel.append(rangePicker.element);

      this.#rangePicker = rangePicker;
    }

    async #renderChart(url, label, className, link) {
      const from = this.#rangePicker.selected.from;

      const to = this.#rangePicker.selected.to;

      const chart = new ColumnChart({ 
        url,
        range: { from, to },
        label,
        link,
      });

      chart.element.classList.add(className);

      this.#subElements.chartsRoot.append(chart.element);

      this.#charts.push(chart);
    }

    async #renderTable(url) {
      const table = new SortableTable(header, { url });

      this.#subElements.sortableTable.append(table.element);
    }
}
