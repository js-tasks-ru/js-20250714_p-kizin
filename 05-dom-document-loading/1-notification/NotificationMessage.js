import NotificationMessageBuilder from "./NotificationMessageBuilder";
import NotificationMessageData from "./NotificationMessageData";

export default class NotificationMessage extends NotificationMessageData {
  static #prevMessage;
  
  #element;
  get element() { return this.#element; }

  #timeoutId;
  get timeoutId() { return this.#timeoutId; }

  constructor(message, options) {
    super(message, options);
    this.show();
  }

  show(target) {
    if (NotificationMessage.#prevMessage) {
      NotificationMessage.#prevMessage.remove();
    }

    this.#element = NotificationMessageBuilder.build(this);

    if (target) {
      target.appendChild(this.#element);
    }

    this.#timeoutId = setTimeout(() => this.remove(), this.duration);

    NotificationMessage.#prevMessage = this;
  }

  remove() {
    clearTimeout(this.#timeoutId);

    this.#element.remove();
  }

  destroy() {
    if (NotificationMessage.#prevMessage) {
      NotificationMessage.#prevMessage.remove();
    }
    
    this.remove();
  }
}
