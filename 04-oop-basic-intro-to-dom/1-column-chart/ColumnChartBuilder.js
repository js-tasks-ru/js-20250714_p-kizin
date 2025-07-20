export default class ColumnChartBuilder {
  static build(data) {
    let chart = ColumnChartBuilder.#buildChart(data);

    let title = ColumnChartBuilder.#buildTitle(data);
    chart.appendChild(title);

    let container = ColumnChartBuilder.#buildContainer(data);
    chart.appendChild(container);
  
    return chart;
  }

  static buildValues(data) {
    const maxVal = Math.max(...data.data);

    let values = data.data.map(val => {
      let value = document.createElement('div');

      value.style.setProperty('--value', Math.floor(val * data.chartHeight / maxVal));
      value.setAttribute('data-tooltip', `${Math.round(100 * val / maxVal)}%`);

      return value;
    });

    return values;
  }

  static #buildChart(data) {
    let chart = document.createElement('div');
    chart.classList.add('column-chart');
    if (!data.data.length) {
      chart.classList.add('column-chart_loading');
    }
    chart.style.setProperty('--chart-height', data.chartHeight);

    return chart;
  }

  static #buildTitle(data) {
    let title = document.createElement('div');
    title.classList.add('column-chart__title');
    title.textContent = data.label;
  
    if (data.link) {
      let link = document.createElement('a');
      link.classList.add('column-chart__link');
      link.href = data.link;
      link.textContent = 'View all';

      title.appendChild(link);
    }

    return title;
  }

  static #buildContainer(data) {
    let container = document.createElement('div');
    container.classList.add('column-chart__container');

    let header = document.createElement('div');
    header.classList.add('column-chart__header');
    header.setAttribute('data-element', 'header');
    header.textContent = data.formatHeading(data.value);
    container.appendChild(header);

    let body = document.createElement('div');
    body.classList.add('column-chart__chart');
    body.setAttribute('data-element', 'body');

    let values = ColumnChartBuilder.buildValues(data);
    body.append(...values);

    container.appendChild(body);

    return container;
  }
}
