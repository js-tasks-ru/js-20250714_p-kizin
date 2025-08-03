import fetchJson from './utils/fetch-json.js';

import { BACKEND_URL } from './constant.js';

export default class ColumnChartLoader {
  static async loadData(from, to) {
    return await fetchJson(BACKEND_URL, { from: from.toISOString(), to: to.toISOString() });
  }
}
