import fetchJson from './utils/fetch-json.js';

import { BACKEND_URL } from './constant.js';

export default class ColumnChartLoader {
  static async loadData(url, from, to) {
    return await fetchJson(`${BACKEND_URL}${url}?from=${from.toISOString()}&to=${to.toISOString()}`);
  }
}
