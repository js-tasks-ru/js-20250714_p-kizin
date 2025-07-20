export default class NotificationMessage {
    #message = '';
    get message() { return this.#message; }

    #duration = 1000;
    get duration() { return this.#duration; }

    #type = 'success';
    get type() { return this.#type; }

    #timeoutId;
    get timeoutId() { return this.#timeoutId; }

    #element = null;
    get element() { return this.#element; }

    constructor(message, { duration, type } = {}) {
      this.#message = message ?? this.#message;
      this.#duration = duration ?? this.#duration;
      this.#type = type ?? this.#type;

      this.show();
    }

    show(target) {
      this.#element = this.#build();
      if (target) {
        target.appendChild(this.#element);
      }
      this.#timeoutId = setTimeout(() => this.remove(), this.#duration);
    }

    remove() {
      clearTimeout(this.#timeoutId);
      this.#element = null;
    }

    destroy () {
      clearTimeout(this.#timeoutId);
      this.#element = null;
    }

    #build () {
      let notification = document.createElement('div');
      notification.classList.add('notification');
      notification.classList.add(`${this.#type}`);
      notification.style.setProperty('--value', `${this.#duration}ms`);

      let timer = document.createElement('div');
      timer.classList.add('timer');

      notification.appendChild(timer);

      let innerWrapper = document.createElement('div');
      innerWrapper.classList.add('inner-wrapper');

      let notificationHeader = document.createElement('div');
      notificationHeader.classList.add('notification-header');
      notificationHeader.textContent = this.#type;

      innerWrapper.appendChild(notificationHeader);

      let notificationBody = document.createElement('div');
      notificationBody.classList.add('notification-body');
      notificationBody.textContent = this.#message;

      innerWrapper.appendChild(notificationBody);

      notification.appendChild(innerWrapper);

      return notification;
    }
}
