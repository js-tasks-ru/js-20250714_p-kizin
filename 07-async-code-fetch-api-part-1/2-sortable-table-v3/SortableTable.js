import { ROW_PER_PAGE } from "./constant.js";
import SortableTableBuilder from "./SortableTableBuilder.js";
import SortableTableData from "./SortableTableData.js";
import SortableTableLoader from "./SortableTableLoader.js";

export default class SortableTable extends SortableTableData {
  #element;
  get element() { return this.#element; }

  #subElements;
  get subElements() { return this.#subElements; }

  #elementPointerDownHandler;

  #elementScrollDownHandler;

  constructor(headerConfig, { url, isSortLocally, sorted }) {
    super(headerConfig, [], url, isSortLocally, sorted);

    this.#element = SortableTableBuilder.createElement(this);

    this.#subElements = {
      header: this.#element.children[0],
      body: this.#element.children[1],
    };

    this.#addPointerDownHandler();

    this.#addScrollDownHandler();

    (async () => await this.render())();
  }

  async render() {
    const { id: columnId, order } = this.sorted;

    this.#createTemplate(true);

    const data = await SortableTableLoader.loadData(
      this.url,
      new Date(),
      new Date(),
      this.isSortLocally ? undefined : columnId,
      this.isSortLocally ? undefined : order,
      0,
      ROW_PER_PAGE
    );

    super.update(data);

    if (this.sorted && this.isSortLocally) {
      this.sortOnClient(columnId, order); 
    }

    this.#createTemplate();
  }

  sortOnClient(columnId, order) {
    const sortable = super.isColumnSortable(columnId);
    if (!sortable) { return; }

    super.sort(columnId, order);
  }

  async sortOnServer(columnId, order) {
    const data = await SortableTableLoader.loadData(
      this.url,
      new Date(),
      new Date(),
      columnId,
      order,
      0,
      ROW_PER_PAGE
    );

    super.update(data);

    super.updateSortColumn(columnId, order);
  }

  remove() {
    super.remove();
  }

  destroy() {
    this.#element.removeEventListener('pointerdown', this.#elementPointerDownHandler);

    this.#element.removeEventListener('scroll', this.#elementScrollDownHandler);

    this.#element.remove();

    this.remove();
  }

  #addPointerDownHandler() {
    this.#elementPointerDownHandler = async (event) => {
      if (!event.target.classList.contains('sortable-table__cell')) { return; }
      
      const { id: columnId, order } = event.target.dataset;

      await this.#clickHeader(columnId, order);
    };

    this.#element.addEventListener('pointerdown', this.#elementPointerDownHandler);
  }

  #addScrollDownHandler() {
    this.#elementScrollDownHandler = async (event) => {
      if (Math.abs(event.target.scrollingElement.scrollHeight - event.target.scrollingElement.scrollTop - event.target.scrollingElement.clientHeight) <= 3.0) {

        console.log(event.target.scrollingElement.scrollHeight, event.target.scrollingElement.scrollTop, event.target.scrollingElement.clientHeight);

        const { id: columnId, order } = this.sorted;

        const data = await SortableTableLoader.loadData(
          this.url,
          new Date(),
          new Date(),
          this.isSortLocally ? undefined : columnId,
          this.isSortLocally ? undefined : order,
          this.data.length,
          this.data.length + ROW_PER_PAGE
        );
    
        if (data.length) {
          super.update([...this.data, ...data]);

          this.#appendTemplate(this.data.slice(-data.length));
        }
      }
    };

    document.addEventListener('scroll', this.#elementScrollDownHandler);
  }

  async #clickHeader(columnId, order) {
    const newOrder = order === 'desc' ? 'asc' : 'desc';

    if (this.isSortLocally) {
      this.sortOnClient(columnId, newOrder);
    } else {
      this.#createTemplate(true);

      await this.sortOnServer(columnId, newOrder);
    }

    this.#createTemplate();
  }

  #createTemplate(loading = false) {
    const { header } = this.#subElements;
    header.innerHTML = '';
    header.innerHTML = SortableTableBuilder.createHeaderTemplate(this);

    let bodyTemplate;
    if (loading) {
      bodyTemplate = SortableTableBuilder.createLoadingTemplate();
    } else if (this.data.length) {
      bodyTemplate = SortableTableBuilder.createBodyTemplate(this);
    } else {
      bodyTemplate = SortableTableBuilder.createEmptyPlaceholderTemplate();
    }

    const { body } = this.#subElements;
    body.innerHTML = '';
    body.innerHTML = bodyTemplate;
  }

  #appendTemplate(data) {
    const { body } = this.#subElements;
    body.innerHTML = body.innerHTML + SortableTableBuilder.createBodyTemplate({ data });
  }
}
