/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export function trimSymbols(string, size) {
  if (string.length === 0 || size === 0) {return '';}
  if (string.length === 1 || size === undefined) {return string;}
  let res = [string[0]];
  let cnt = 0;
  for (let i = 1; i < string.length; i++) {
    if (string[i] === string[i - 1]) {
      cnt++;
      if (cnt < size) {
        res.push(string[i]);
      }
    } else {
      cnt = 0;
      res.push(string[i]);
    }
  }
  return res.join('');
}
