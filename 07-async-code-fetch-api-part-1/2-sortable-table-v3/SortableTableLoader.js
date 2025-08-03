import fetchJson from './utils/fetch-json.js';

import { BACKEND_URL } from './constant.js';

export default class SortableTableLoader {
  static async loadData(url, from, to, sort, order, start, end) {
    return await fetchJson(`${BACKEND_URL}${url}?_sort=${sort}&_order=${order}&_start=${start}&_end=${end}`);
  }
}
