export default class NotificationMessageBuilder {
  static build(data) {
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.classList.add(`${data.type}`);
    notification.style.setProperty('--value', `${data.duration}ms`);

    const timer = document.createElement('div');
    timer.classList.add('timer');

    notification.appendChild(timer);

    const innerWrapper = document.createElement('div');
    innerWrapper.classList.add('inner-wrapper');

    const notificationHeader = document.createElement('div');
    notificationHeader.classList.add('notification-header');
    notificationHeader.textContent = data.type;

    innerWrapper.appendChild(notificationHeader);

    const notificationBody = document.createElement('div');
    notificationBody.classList.add('notification-body');
    notificationBody.textContent = data.message;

    innerWrapper.appendChild(notificationBody);

    notification.appendChild(innerWrapper);

    return notification;
  }
}
