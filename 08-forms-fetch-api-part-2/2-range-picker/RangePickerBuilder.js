import { MONTH_NAME } from "./constant.js";

export default class RangePickerBuilder {
  static createTemplate(data) {
    const template = `
      <div class="rangepicker__input" data-element="input">
        ${RangePickerBuilder.createInputTemplate(data)}
      </div>
      <div class="rangepicker__selector" data-element="selector"></div>
    `;

    return template;
  }

  static createInputTemplate({ from = new Date(), to = new Date()} = {}) {
    const fromDate = String(from.getDate()).padStart(2, '0');
    const fromMonth = String(from.getMonth() + 1).padStart(2, '0');
    const fromYear = from.getFullYear();

    const toDate = String(to.getDate()).padStart(2, '0');
    const toMonth = String(to.getMonth() + 1).padStart(2, '0');
    const toYear = to.getFullYear();

    const inputTemplate = `
      <span data-element="from">${fromDate}.${fromMonth}.${fromYear}</span> -
      <span data-element="to">${toDate}.${toMonth}.${toYear}</span>
    `;

    return inputTemplate;
  }

  static createSelectorTemplate(data) {
    let fromDate = new Date(data.from);
    fromDate.setMonth(data.month);
    fromDate.setFullYear(data.year);

    let toDate = new Date(data.from);
    toDate.setMonth(data.month + 1);
    toDate.setFullYear(data.month + 1 < 12 ? data.year : data.year + 1);

    const selectorTemplate = `
      <div class="rangepicker__selector-arrow"></div>
      <div class="rangepicker__selector-control-left"></div>
      <div class="rangepicker__selector-control-right"></div>
      ${RangePickerBuilder.#createCalendarTemplate(data, fromDate)}
      ${RangePickerBuilder.#createCalendarTemplate(data, toDate)}
    `;

    return selectorTemplate;
  }

  static #createCalendarTemplate({ from = new Date(), to = new Date() } = {}, date = new Date()) {
    let calendarTemplate = `
      <div class="rangepicker__calendar">
        <div class="rangepicker__month-indicator">
          <time datetime="November">${MONTH_NAME[date.getMonth()]}</time>
        </div>
        <div class="rangepicker__day-of-week">
          <div>Пн</div>
          <div>Вт</div>
          <div>Ср</div>
          <div>Чт</div>
          <div>Пт</div>
          <div>Сб</div>
          <div>Вс</div>
        </div>
        <div class="rangepicker__date-grid">
    `;

    while (date.getDate() > 1) { date.setDate(date.getDate() - 1); }

    let idx = 0;
    const month = date.getMonth();
    while (date.getMonth() === month) {
      const buttonTemplate = `\
        <button type="button" class="rangepicker__cell \
          ${date.getDate() === from.getDate() 
            && date.getMonth() === from.getMonth() 
            && date.getFullYear() === from.getFullYear() ? 'rangepicker__selected-from' : ''} \
          ${date > from && date < to ? 'rangepicker__selected-between' : ''} \
          ${date.getDate() === to.getDate() 
            && date.getMonth() === to.getMonth() 
            && date.getFullYear() === to.getFullYear() ? 'rangepicker__selected-to' : ''}" data-value="${date.toISOString()}" \
          ${idx === 0 ? `style="--start-from: ${date.getDay()}"` : ''}>${date.getDate()}</button>`;

      calendarTemplate += buttonTemplate;

      date.setDate(date.getDate() + 1);
      idx++;
    }

    calendarTemplate += '</div></div>';

    return calendarTemplate;
  }
}
