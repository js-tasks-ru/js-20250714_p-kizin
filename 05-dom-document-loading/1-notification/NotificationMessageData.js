export default class NotificationMessageData {
  #message;
  get message() { return this.#message; }

  #duration;
  get duration() { return this.#duration; }

  #type;
  get type() { return this.#type; }

  constructor(message = '', { duration = 1000, type = 'success' } = {}) {
    this.#message = message;
    this.#duration = duration;
    this.#type = type;
  }

  remove() {
    this.#message = undefined;
    this.#duration = undefined;
    this.#type = undefined;
  }
}
