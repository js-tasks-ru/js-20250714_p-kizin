export default class RangePickerData {
  #from;
  get from() { return this.#from; }
  set from(from) { this.#from = from; }

  #to;
  get to() { return this.#to; }
  set to(to) { this.#to = to; }

  #month;
  get month() { return this.#month; }
  set month(month) { this.#month = month; }

  #year;
  get year() { return this.#year; }
  set year(year) { this.#year = year; }

  constructor({ from = new Date(), to = new Date() } = {}) {
    this.#from = from;
    this.#to = to;
    this.#month = from.getMonth();
    this.#year = from.getFullYear();
  }
}
