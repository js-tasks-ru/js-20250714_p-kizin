export default class SortableList {
  #items;
  get items() { return this.#items; }

  #element;
  get element() { return this.#element; }

  #onPointerDownHandler;

  #onPointerUpHandler;

  #onPointerMoveHandler;

  constructor({ items }) {
    this.#items = items;

    this.#createElement();

    this.#addPointerDownHandler();

    this.#addPointerUpHandler();

    this.#addPointerMoveHandler();
  }

  remove() {
    document.removeEventListener('pointerdown', this.#onPointerDownHandler);

    document.removeEventListener('pointerup', this.#onPointerUpHandler);

    document.removeEventListener('pointermove', this.#onPointerMoveHandler);

    this.#element.remove();
  }

  destroy() { 
    this.remove();
  }

  #createElement() {
    this.#element = document.createElement('ul');
    this.#element.classList.add('sortable-list');

    this.#items
        .map(item => {
          const li = document.createElement('li');
          li.classList.add('sortable-list__item');
          li.append(item);

          return li;
        })
        .forEach(li => this.#element.append(li));
  }

  #addPointerDownHandler() {
    this.#onPointerDownHandler = (event) => {
      if (event.target.dataset.grabHandle !== undefined) {
        const item = event.target.closest('.sortable-list__item');
        if (item) {
          const placeholder = document.createElement('div');
          placeholder.classList.add('sortable-list__placeholder');

          item.after(placeholder);
            
          item.classList.add('sortable-list__item_dragging');

          item.style.left = `${event.x + 10}px`;
          item.style.top = `${event.y - item.clientHeight / 2}px`;
        }
      }
    
      if (event.target.dataset.deleteHandle !== undefined) {
        const item = event.target.closest('.sortable-list__item');
        if (item) {
          item.remove();
        }
      }
    };

    document.addEventListener('pointerdown', this.#onPointerDownHandler);
  }

  #addPointerUpHandler() {
    this.#onPointerUpHandler = (event) => {
      const item = document.querySelector('.sortable-list__item_dragging');

      const placeholder = document.querySelector('.sortable-list__placeholder');
      
      if (item && placeholder) {
        item.classList.remove('sortable-list__item_dragging');
        item.style.left = 0;
        item.style.top = 0;

        placeholder.after(item);
        placeholder.remove();
      }
    };
  
    document.addEventListener('pointerup', this.#onPointerUpHandler);
  }

  #addPointerMoveHandler() {
    this.#onPointerMoveHandler = (event) => {
      const item = document.querySelector('.sortable-list__item_dragging');
      if (item) {
        item.style.left = `${event.x + 10}px`;
        item.style.top = `${event.y - item.clientHeight / 2}px`;

        const closestItem = event.target.closest('.sortable-list__item');
        if (closestItem) {
          const placeholder = document.querySelector('.sortable-list__placeholder');
          if (placeholder) {
            placeholder.remove();

            const newPlaceholder = document.createElement('div');
            newPlaceholder.classList.add('sortable-list__placeholder');

            if (event.y < 30) {
              closestItem.before(newPlaceholder);
            }
            else {
              closestItem.after(newPlaceholder);
            }
          }
        }
      }
    };

    document.addEventListener('pointermove', this.#onPointerMoveHandler);
  }
}
