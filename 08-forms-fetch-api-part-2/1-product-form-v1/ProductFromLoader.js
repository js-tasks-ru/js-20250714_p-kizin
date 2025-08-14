import fetchJson from "./utils/fetch-json.js";

import {
  IMGUR_CLIENT_ID,
  BACKEND_URL,
  IMAGE_BACKEND_URL,
  PRODUCTS_URL,
  CATEGORIES_URL
} from "./constant.js";

export default class ProductFormLoader {
  static async loadProducts(productId) {
    return await fetchJson(`${BACKEND_URL}${PRODUCTS_URL}?id=${productId}`);
  }

  static async loadCategories() {
    return await fetchJson(`${BACKEND_URL}${CATEGORIES_URL}?_sort=weight&_refs=subcategory`);
  }

  static async uploadImage(file) {
    const formData = new FormData();
    formData.append('image', file);

    const response = fetchJson(IMAGE_BACKEND_URL, {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Client-ID ${IMGUR_CLIENT_ID}`,
      }
    });

    return response;
  }

  static async saveProduct(data) {
    await fetchJson(`${BACKEND_URL}${PRODUCTS_URL}`, {
      method: 'PATCH',
      body: data
    });
  }
}
