import ProductFormData from "../../08-forms-fetch-api-part-2/1-product-form-v1/ProductFormData.js";
import ProductFormLoader from "../../08-forms-fetch-api-part-2/1-product-form-v1/ProductFromLoader.js";
import SortableList from "../2-sortable-list/index.js";
import ProductFormBuilderV2 from "./ProductFormBuilderV2.js";

export default class ProductFormV2 extends ProductFormData {
  #element;
  get element() { return this.#element; }

  #subElements;
  get subElements() { return this.#subElements; }

  #categories;
  get categories() { return this.#categories; }

  #onImageUploaderClickHandler;

  #onButtonSaveClickHandler;

  constructor (productId) {
    super({ productId });
  }
  
  async render () {
    const categories = await ProductFormLoader.loadCategories();
    if (categories) {
      this.#categories = categories;
    }

    if (this.productId) {
      const [data] = await ProductFormLoader.loadProducts(this.productId);
      if (data) {
        this.update(data);
      }
    }

    this.#createElement();

    this.#addImageUploaderHandler();

    this.#addButtonSaveHandler();

    return this.#element;
  }

  async save () {
    this.#element.dispatchEvent(new CustomEvent('product-updated'));
  }

  remove () {
    this.#subElements.imageUploadInput.removeEventListener('change', this.#onImageUploaderClickHandler);

    this.#subElements.buttonSave.removeEventListener('click', this.#onButtonSaveClickHandler);

    this.#element.remove();
  }

  destroy () {
    this.remove();
  }

  
  #createElement() {
    this.#element = document.createElement('div');
    this.#element.classList.add('product-form');
    this.#element.innerHTML = ProductFormBuilderV2.createFormTemplate(this, this.#categories);

    this.#subElements = {
      productForm: this.#element.children[0],
      imageListContainer: this.#element.querySelector('div[data-element="imageListContainer"]'),
      imageUploadInput: this.#element.querySelector('input[type="file"]'),
      subcategory: this.#element.querySelector('#subcategory'),
      buttonSave: this.#element.querySelector('#buttonsave'),
    };

    const sortableList = new SortableList({
      items: this.images.map(({ source = '', url = '' }) => {
        const li = document.createElement('li');
        li.classList.add('products-edit__imagelist-item');
        li.innerHTML = ProductFormBuilderV2.createSortableListItemTemplate({ source, url });
  
        return li;
      }),
    });

    this.#subElements.imageListContainer.children[0].remove();
    this.#subElements.imageListContainer.append(sortableList.element);
  }

  #addImageUploaderHandler() {
    this.#onImageUploaderClickHandler = async (event) => {
      const result = await ProductFormLoader.uploadImage(event.target.files[0]);
      if (result) {
        const newImage = {
          url: result.data.link,
        };

        this.update({ images: [...this.images, newImage] });
      }
    };

    this.#subElements.imageUploadInput.addEventListener('change', this.#onImageUploaderClickHandler);
  }

  #addButtonSaveHandler() {
    this.#onButtonSaveClickHandler = async (event) => {
      await ProductFormLoader.saveProduct({ 
        id: this.productId,
        title: this.title,
        description: this.description,
        images: this.images,
        subcategory: this.subcategory,
        price: this.price,
        discount: this.discount,
        quantity: this.quantity,
        status: this.status
      });
    };

    this.#subElements.buttonSave.addEventListener('click', this.#onButtonSaveClickHandler);
  }
}
  