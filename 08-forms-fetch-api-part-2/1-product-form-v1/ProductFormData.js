import escapeHtml from './utils/escape-html.js';

export default class ProductFormData {
  #productId;
  get productId() { return this.#productId; }

  #title;
  get title() { return this.#title; }

  #description;
  get description() { return this.#description; }

  #images;
  get images() { return this.#images; }

  #subcategory;
  get subcategory() { return this.#subcategory; }

  #price;
  get price() { return this.#price; }

  #discount;
  get discount() { return this.#discount; }

  #quantity;
  get quantity() { return this.#quantity; }

  #status;
  get status() { return this.#status; }

  constructor({ productId = '', ...rest }) {
    if (productId) {
      this.#productId = productId;
    }

    this.update(rest);
  }

  update({ title, description, images, subcategory, price, discount, quantity, status }) {
    if (title) {this.#title = escapeHtml(title);}
    if (description) {this.#description = escapeHtml(description);}
    if (images?.length) {this.#images = images;}
    if (subcategory) {this.#subcategory = subcategory;}
    if (price !== null && price !== undefined) {this.#price = price;}
    if (discount !== null && discount !== undefined) {this.#discount = discount;}
    if (quantity !== null && quantity !== undefined) {this.#quantity = quantity;}
    if (status !== null && status !== undefined) {this.#status = status;}
  }
}
