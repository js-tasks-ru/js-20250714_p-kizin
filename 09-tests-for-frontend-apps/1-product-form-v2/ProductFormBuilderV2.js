import ProductFormBuilder from "../../08-forms-fetch-api-part-2/1-product-form-v1/ProductFormBuilder.js";

export default class ProductFormBuilderV2 extends ProductFormBuilder {
  static createImageListTemplate() {
    const imageListTemplate = `
      <div class="form-group form-group__wide" data-element="sortable-list-container">
        <label class="form-label">Фото</label>
        <div data-element="imageListContainer">
          <ul class="sortable-list"></ul>
        </div>
        <input type="file" id="uploadfile" style="display: none;" /> 
        <button type="button" name="uploadImage" class="button-primary-outline" onclick="document.getElementById('uploadfile').click()">  
          <span>Загрузить</span>
        </button>
      </div>
    `;
    
    return imageListTemplate;
  }

  static createSortableListItemTemplate({ source = '', url = '' } = {}) {
    const sortableListItemTemplate = `
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
    `;

    return sortableListItemTemplate;
  }
}
