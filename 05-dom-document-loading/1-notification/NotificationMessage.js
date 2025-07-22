import NotificationMessageBuilder from "./NotificationMessageBuilder";
import NotificationMessageData from "./NotificationMessageData";

export default class NotificationMessage extends NotificationMessageData {
  #element;
  get element() { return this.#element; }

  #timeoutId;
  get timeoutId() { return this.#timeoutId; }

  constructor(message, options) {
    super(message, options);
    this.show();
  }

  show(target) {
    this.#element = NotificationMessageBuilder.build(this);

    if (target) {
      target.appendChild(this.#element);
    }
    this.#timeoutId = setTimeout(() => this.remove(), this.duration);
  }

  remove() {
    clearTimeout(this.#timeoutId);
    this.#timeoutId = undefined;
    this.#element.remove();
  }

  destroy() {
    this.remove();
  }
}
