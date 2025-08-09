export default class ProductFormBuilder {
  static createFormTemplate(data, categories = []) {
    const formTemplate = `
      <form data-element="productForm" class="form-grid">
        ${ProductFormBuilder.#createTitleTemplate(data)}
        ${ProductFormBuilder.#createDescriptionTemplate(data)}
        ${ProductFormBuilder.#createImageListTemplate(data)}
        ${ProductFormBuilder.#createSubcategoryTemplate(data, categories)}
        ${ProductFormBuilder.#createPriceDiscountTemplate(data)}
        ${ProductFormBuilder.#createQuantityTemplate(data)}
        ${ProductFormBuilder.#createStatusTemplate(data)}
        ${ProductFormBuilder.#createButtonsTemplate(data)}
      </form>
    `;

    return formTemplate;
  }
  
  static #createTitleTemplate({ title = '' } = {}) {
    const titleTemplate = `
      <div class="form-group form-group__half_left">
        <fieldset>
          <label class="form-label">Название товара</label>
          <input required="" type="text" name="title" id="title" value="${title}" class="form-control" placeholder="Название товара">
        </fieldset>
      </div>
    `;

    return titleTemplate;
  }

  static #createDescriptionTemplate({ description = '' } = {}) {
    const descriptionTemplate = `
      <div class="form-group form-group__wide">
        <label class="form-label">Описание</label>
        <textarea required="" class="form-control" name="description" id="description" data-element="productDescription" placeholder="Описание товара">${description}</textarea>
      </div>
    `;

    return descriptionTemplate;
  }

  static #createImageListTemplate({ images = [] } = {}) {
    const imageListTemplate = `
      <div class="form-group form-group__wide" data-element="sortable-list-container">
        <label class="form-label">Фото</label>
        <div data-element="imageListContainer">
          <ul class="sortable-list">
            ${images.map(({ source, url }) => `   
              <li class="products-edit__imagelist-item sortable-list__item" style="">
                <input type="hidden" name="url" value="${url}">
                <input type="hidden" name="source" value="${source}">
                <span>
                  <img src="icon-grab.svg" data-grab-handle="" alt="grab">
                  <img class="sortable-table__cell-img" alt="Image" src="${url}">
                  <span>${source}</span>
                </span>
                <button type="button">
                  <img src="icon-trash.svg" data-delete-handle="" alt="delete">
                </button>
              </li>
            `).join('')}
          </ul>
        </div>
        <input type="file" id="uploadfile" style="display: none;" /> 
        <button type="button" name="uploadImage" class="button-primary-outline" onclick="document.getElementById('uploadfile').click()">  
          <span>Загрузить</span>
        </button>
      </div>
    `;

    return imageListTemplate;
  }

  static #createSubcategoryTemplate({ subcategory = '' } = {}, categories = []) {
    const subcategoryTemplate = `
      <div class="form-group form-group__half_left">
        <label class="form-label">Категория</label>
        <select class="form-control" name="subcategory" id="subcategory">
          ${categories
            .map(({ title: categoryTitle, subcategories }) => 
              subcategories
                .map(({ id, title: subcategoryTitle }) => `
                  <option value="${id}" ${id === subcategory ? 'selected' : ''}>${categoryTitle} &gt; ${subcategoryTitle}</option>
                `)
              .join(''))
            .join('')}
        </select>
      </div>
    `;

    return subcategoryTemplate;
  }

  static #createPriceDiscountTemplate({ price = 0, discount = 0 } = {}) {
    const priceDiscountTemplate = `
      <div class="form-group form-group__half_left form-group__two-col">
        <fieldset>
          <label class="form-label">Цена ($)</label>
          <input required="" type="number" name="price" id="price" value="${price}" class="form-control" placeholder="100">
        </fieldset>
        <fieldset>
          <label class="form-label">Скидка ($)</label>
          <input required="" type="number" name="discount" id="discount" value="${discount}" class="form-control" placeholder="0">
        </fieldset>
      </div>
    `;

    return priceDiscountTemplate;
  }

  static #createQuantityTemplate({ quantity = 0 } = {}) {
    const quantityTemplate = `
      <div class="form-group form-group__part-half">
        <label class="form-label">Количество</label>
        <input required="" type="number" class="form-control" name="quantity" id="quantity" value="${quantity}" placeholder="1">
      </div>
    `;

    return quantityTemplate;
  }

  static #createStatusTemplate({ status = 0 } = {}) {
    const statusTemplate = `
      <div class="form-group form-group__part-half">
        <label class="form-label">Статус</label>
        <select class="form-control" name="status" id="status">
          <option value="1" ${status ? 'selected' : ''}>Активен</option>
          <option value="0" ${!status ? 'selected' : ''}>Неактивен</option>
        </select>
      </div>
    `;

    return statusTemplate;
  }

  static #createButtonsTemplate() {
    const buttonsTemplate = `
      <div class="form-buttons">
        <button type="button" name="save" id="buttonsave" class="button-primary-outline">
          Сохранить товар
        </button>
      </div>
    `;

    return buttonsTemplate;
  }
}
