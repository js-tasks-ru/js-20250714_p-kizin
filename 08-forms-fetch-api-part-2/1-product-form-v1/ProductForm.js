import ProductFormBuilder from "./ProductFormBuilder.js";
import ProductFormData from "./ProductFormData.js";
import ProductFormLoader from "./ProductFromLoader.js";

export default class ProductForm extends ProductFormData {
  #element;
  get element() { return this.#element; }

  #subElements;
  get subElements() { return this.#subElements; }

  #onImageUploaderClickHandler;

  #onButtonSaveClickHandler;

  constructor (productId) {
    super({ productId });
  }
  
  async render () {
    const categories = await ProductFormLoader.loadCategories();

    if (this.productId) {
      const [data] = await ProductFormLoader.loadProducts(this.productId);
      if (data) {
        this.update(data);
      }
    }

    this.#element = document.createElement('div');
    this.#element.classList.add('product-form');
    this.#element.innerHTML = ProductFormBuilder.createFormTemplate(this, categories);

    this.#subElements = {
      productForm: this.#element.children[0],
      imageListContainer: this.#element.querySelector('div[data-element="imageListContainer"]'),
      imageUploadInput: this.#element.querySelector('input[type="file"]'),
      subcategory: this.#element.querySelector('#subcategory'),
      buttonSave: this.#element.querySelector('#buttonsave'),
    };

    this.addImageUploaderHandler();

    this.addButtonSaveHandler();

    return this.#element;
  }

  addImageUploaderHandler() {
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

  addButtonSaveHandler() {
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

  async save () {
    this.#element.dispatchEvent(new CustomEvent('product-updated'));
  }

  remove () {
    this.#subElements.imageUploadInput.removeEventListener('onchange', this.#onImageUploaderClickHandler);

    this.#subElements.buttonSave.removeEventListener('click', this.#onButtonSaveClickHandler);

    this.#element.remove();
  }

  destroy () {
    this.remove();
  }
}
  