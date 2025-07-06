var cpyer11 = function () {
  function join(array, separator = ",") {
    var result = ""
    for (var i = 0; i < array.length - 1; i++) {
      result = result + array[i] + separator
    }
    result = result + array[array.length - 1]
    return result
  }


  function parseJSON(string) {
    var i = 0;
    return parseType();

    function parseType() {
      if (string[i] == '{') {
        return parseObject();
      } else if (string[i] == '[') {
        return parseArray();
      } else if ((string[i] >= 0 && string[i] <= 9) || string[i] == '.' || string[i] == '-') {
        return parseNumber();
      } else if (string[i] == '"') {
        return parseString();
      } else if (string[i] == 't') {
        if (string.slice(i, i + 4) === 'true') {
          i += 4;
          return true;
        } else {
          i += 4;
          throw SyntaxError('error');
        }
      } else if (string[i] == 'f') {
        if (string.slice(i, i + 5) === 'false') {
          i += 5;
          return false;
        } else {
          throw SyntaxError('error');
        }
      } else {
        i += 4
        return null;
      }
    }

    function parseObject() {
      let obj = {};
      let key = null;
      let value = null;
      i++;
      if (string[i] == "}") {
        i++;
        return obj;
      }
      while (i < string.length) {
        if (string[i] == "}") {
          i++;
          break;
        } else if (string[i] == ",") {
          i++;
        } else if (string[i] == '"') {
          key = parseString();
          if (string[i] == ":") {
            i++;
            value = parseType()
          } else {
            throw new SyntaxError("error")
          }
          obj[key] = value;
        } else {
          throw new SyntaxError("error")
        }

      }

      return obj;
    }

    function parseArray() {
      i++;
      let result = []
      if (string[i] == "]") {
        i++;
        return result;
      }
      let value = null;

      while (i < string.length) {
        if (string[i] == ',') {
          i++;
        } else if (string[i] == ']') {
          i++;
          break;
        } else {
          value = parseType();
          result.push(value);
        }

      }
      return result;
    }

    function parseNumber() {
      let result = '';
      while ((string[i] >= 0 && string[i] <= 9) || string[i] == '.' || string[i] == '-') {
        result += string[i++];
      }
      return parseFloat(result);
    }

    function parseString() {
      i++
      let start = i;
      while (string[i] != '"') {
        i++;
      }
      return string.slice(start, i++);

    }

  }

  function isFalsey(val) {
    if (Number.isNaN(val) || val === false || val === null || val === undefined || val === 0 || val === "") {
      return true;
    }
    return false;
  }

  function compact(array) {
    let result = [];
    for (var item of array) {
      if (!isFalsey(item)) {
        result.push(item);
      }
    }
    return result;
  }


  function fill(array, str, start = 0, end = array.length) {
    if (start < 0) {
      if (array.length + start < 0) start = 0;
      else start = array.length + start;
    }
    if (end < 0) end = array.length + end;
    end = end > array.length ? array.length : end;
    for (var i = start; i < end; i++) {
      array[i] = str;
    }
    return array;
  }

  function chunk(array, n = 1) {
    let result = [];
    let temp = [];
    if (array.length == 0 || n <= 0) return result;
    for (var i = 0; i < array.length; i++) {
      temp.push(array[i]);
      if (temp.length === n) {
        result.push(temp);
        temp = [];
      }
    }
    if (temp.length > 0) {
      result.push(temp);
    }
    return result
  }

  function drop(array, n = 1) {
    let result = [];
    let dropNum = 0;
    if (n <= 0) return array;
    for (let i = 0; i < array.length; i++) {
      if (dropNum < n) {
        dropNum++;
        continue;
      }
      result.push(array[i]);
    }
    return result;
  }

  function deepEqual(obj1, obj2) {
    if (obj1 === obj2) return true;

    if (obj1 == null || obj2 == null) return false;

    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {//两个值都不是对象类型且相等时,return true
      return obj1 === obj2
    };

    if (Array.isArray(obj1) && Array.isArray(obj2)) {
      if (obj1.length !== obj2.length) return false;

      for (let i = 0; i < obj1.length; i++) {
        if (!deepEqual(obj1[i], obj2[i])) return false;
      }
      return true;
    }

    // 一个是数组一个不是
    if (Array.isArray(obj1) || Array.isArray(obj2)) return false;

    const keys1 = keys(obj1);
    const keys2 = keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1) {
      if (!keys2.includes(key)) return false;
      if (!deepEqual(keys1[key], keys2[key])) return false;
    }

    return true;
  }

  function findIndex(array, func, fromIndex = 0) {
    if (typeof func === 'function') {
      for (let i = fromIndex; i < array.length; i++) {
        if (func(array[i]))
          return i;
      }
    } else if (Array.isArray(func)) {
      const [key, value] = func;
      for (let i = fromIndex; i < array.length; i++) {
        let match = true;
        if (deepEqual(array[i][key], value))
          return i;
      }
    } else if (typeof func === 'string') {
      for (let i = fromIndex; i < array.length; i++) {
        if (array[i][func]) {
          return i;
        }
      }
    } else if (typeof func === 'object') {
      for (let i = fromIndex; i < array.length; i++) {
        let match = true;
        for (let key in func) {
          if (!deepEqual(array[i][key], func[key]))
            match = false;
          break;
        }
        if (match) {
          return i;
        }
      }
    }
    return -1;
  }

  function findLastIndex(array, func, fromIndex = array.length - 1) {
    if (typeof func === 'function') {
      for (let i = fromIndex; i >= 0; i--) {
        if (func(array[i]))
          return i;
      }
    } else if (Array.isArray(func)) {
      const [key, value] = func;
      for (let i = fromIndex; i >= 0; i--) {
        if (deepEqual(array[i][key], value))
          return i;
      }
    } else if (typeof func === 'string') {
      for (let i = fromIndex; i >= 0; i--) {
        if (array[i][func]) {
          return i;
        }
      }
    } else if (typeof func === 'object') {
      for (let i = fromIndex; i >= 0; i--) {
        let match = true;
        for (let key in func) {
          if (!deepEqual(array[i][key], func[key]))
            match = false;
          break;
        }
        if (match) {
          return i;
        }
      }
    }
    return -1;
  }

  function flatten(array) {
    let result = [];
    for (var i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        result.push(...array[i]);
      } else {
        result.push(array[i])
      }

    }
    return result;
  }

  function flattenDeep(array, result = []) {

    for (var i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        flattenDeep(array[i], result);
      } else {
        result.push(array[i])
      }
    }
    return result;
  }

  function flattenDepth(array, Depth = 1, currentDepth = 0, result = []) {

    for (var i = 0; i < array.length; i++) {
      if (Array.isArray(array[i])) {
        if (currentDepth < Depth) {
          flattenDepth(array[i], Depth, ++currentDepth, result);
        } else {
          result.push(array[i]);
        }
      } else {
        result.push(array[i])
      }
    }
    return result;
  }

  function fromPairs(pairs) {
    let obj = {};
    for (var i = 0; i < pairs.length; i++) {
      obj[pairs[i][0]] = pairs[i][1];
    }
    return obj;
  }

  function toPairs(object) {
    let result = [];

    if (object instanceof Map) {
      for (var [key, value] of object) {
        result.push([key, value]);
      };
    } else {
      for (var [key, value] of Object.entries(object)) {
        result.push([key, value]);
      };
    }
    return result;
  }

  function get(object, path, defaultValue) {
    if (!object) return defaultValue;
    var result = object;
    if (Array.isArray(path)) {
      if (path.length === 0) return defaultValue;
      for (var i = 0; i < path.length; i++) {
        if (!result[path[i]]) return defaultValue;
        result = result[path[i]];
      }
    } else if (typeof path === 'string') {
      //String analyse
      let key = '';
      for (var i = 0; i < path.length; i++) {
        if (path[i] === '.' || path[i] === ']' || path[i] === '[') {
          if (key === '') continue;
          if (!result[key]) return defaultValue;
          result = result[key];
          key = '';
          continue;
        }
        key += path[i]
      }
      result = result[key] ? result[key] : (result[key] === false ? result[key] : defaultValue);

    }
    return result;
  }

  function head(array) {
    return array[0];
  }

  function indexOf(array, target, fromIndex = 0) {
    if (array.length === 0) return -1;
    if (fromIndex < 0) fromIndex = Math.max(array.length + fromIndex, 0);
    if (typeof target === 'string') {
      let mainLen = array.length;
      let subLen = target.length;
      if (subLen > mainLen) return -1
      for (var i = fromIndex; i <= mainLen - subLen; i++) {
        let match = true;
        for (var j = 0; j < subLen; j++) {
          if (target[j] !== array[i + j]) {
            match = false;
            break;
          }
        }
        if (match) return i;
      }
    } else {
      for (var i = fromIndex; i < array.length; i++) {
        if (array[i] === target) return i;
      }
    }
    return -1;
  }



  function lastIndexOf(array, value, fromIndex = array.length - 1) {
    if (array.length === 0) return -1;
    if (fromIndex > array.length - 1) fromIndex = array.length - 1;
    for (var i = fromIndex; i >= 0; i--) {
      if (array[i] === value) return i;
    }
    return -1;
  }

  function initial(array) {
    let result = [];
    for (var i = 0; i < array.length - 1; i++) {
      result[i] = array[i];
    }
    return result;
  }

  function last(array) {
    return array[array.length - 1];
  }

  function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;

  }

  function pull(array, ...args) {
    let writeIdx = 0;
    for (var i = 0; i < array.length; i++) {
      if (!args.includes(array[i])) {
        array[writeIdx] = array[i];
        writeIdx++;
      }
    };
    array.length = writeIdx;
    return array;
  }

  function reverse(array) {
    let i = 0, j = array.length - 1;
    while (i < j) {
      swap(array, i++, j--);
    }
    return array;
  }

  function forEach(collection, iterator = identity) {

    if (isObject(collection)) {
      let keySet = keys(collection);
      for (let index = 0; index < keySet.length; index++) {
        if (iterator(collection[keySet[index]], keySet[index], collection) === false) {
          return collection;
        }
      }
    } else {
      for (let index = 0; index < collection.length; index++) {
        if (iterator(collection[index], index, collection) === false) {
          return collection;// stop iterating return collection
        }
      }
    }
    return collection;
  }


  function patternIdentification(predicate = identity) {
    if (typeof predicate === 'function') {
      return function (...item) {
        return predicate(...item);
      }
    } else if (typeof predicate === 'string' || typeof predicate === 'number') {
      return function (obj) {
        return get(obj, predicate.toString());
      }
    } else if (Object.prototype.toString.call(predicate) === '[object Array]') {
      const [key, value] = predicate;
      return function (arr) {
        return deepEqual(arr[key], value);
      }
    } else if (Object.prototype.toString.call(predicate) === '[object Object]') {
      return function (obj) {
        return partialMatch(obj, predicate);

      };
    } else {
      return function (val) {
        return val;
      };
    }
  }



  function some(collection, predicate = identity) {
    let func = patternIdentification(predicate);
    let allFlase = false;//suppose all is false 
    forEach(collection, item => {
      if (func(item) === true) {
        allFlase = true;
        return false;
      }
    });
    return allFlase;
  }

  function every(collection, predicate = identity) {
    let allTrue = true;//默认全为true
    let func = patternIdentification(predicate);
    if (typeof predicate === 'function') {
      forEach(collection, item => {
        if (predicate(item) === false) {
          allTrue = false;
          return false;
        }
      });
    } else if (Object.prototype.toString.call(predicate) === '[object Object]') {
      forEach(collection, item => {
        if (deepEqual(item, predicate) === false) {
          allTrue = false;
          return false;
        }
      });
    } else if (Object.prototype.toString.call(predicate) === '[object Array]') {
      const [key, value] = predicate;
      forEach(collection, item => {
        if (deepEqual(item[key], value) === false) {
          allTrue = false;
          return false;
        }
      });
    } else if (typeof predicate === 'string') {
      forEach(collection, item => {
        if (func(item) === false) {
          allTrue = false;
          return false;
        }
      });
    }


    return allTrue
  }

  function analysePath(path) {
    let keyArrary = [];
    if (typeof path === 'string') {
      let key = '';
      for (var i = 0; i < path.length; i++) {
        if (path[i] === '.' || path[i] === ']' || path[i] === '[') {
          if (key === '') continue;
          keyArrary.push(key);
          key = '';
          continue;
        }
        key += path[i];
      }
      if (key !== '') keyArrary.push(key);
      return keyArrary;
    } else if (Object.prototype.toString.call(path) === '[object Array]') {
      return [...path];
    } else if (typeof path === 'number') {
      return path.toString();
    }
    throw new TypeError('input must be a String, Array or Number');
  }


  function has(object, path) {
    if (isSet(object)) return object.has(path);
    let keys = analysePath(path);
    for (var i = 0; i < keys.length - 1; i++) {
      object = object[keys[i]];
    }
    return Object.prototype.hasOwnProperty.call(object, keys[i])
  }

  function check(description, actual, expected) {
    if (actual === expected) {
      console.log(`PASS: ${description}`);
    } else {
      console.error(`FAIL: ${description} - Expected: ${expected}, Actual: ${actual}`);
    }
  }

  function countBy(collection, iteratee = identity) {

    let func = patternIdentification(iteratee);
    let obj = {};
    forEach(collection, item => {
      let key = func(item);
      obj[key] = (obj[key] || 0) + 1;
    });
    return obj;
  }

  function groupBy(collection, iteratee = identity) {
    let func = patternIdentification(iteratee);
    let obj = {};
    forEach(collection, item => {
      let key = func(item);
      key = typeof key === 'number' ? key.toString() : key;
      if (!has(obj, key)) {
        obj[key] = [];
      }
      obj[key].push(item);

    });
    return obj;
  }

  function keyBy(collection, iteratee = identity) {
    let func = patternIdentification(iteratee);
    let obj = {};
    forEach(collection, item => {
      let key = func(item);
      if (!has(obj, key)) {//prevent from searching in protoType
        obj[key] = item;
      } else {
        obj[key] = item;
      }
    });
    return obj;
  }

  function map(collection, iteratee = identity) {
    let result = [];

    let func = patternIdentification(iteratee);
    forEach(collection, (item, i, collection) => {
      result.push(func(item, i, collection));
    });
    return result;
  }


  function partialMatch(obj, src) {
    let keySet = keys(src);
    for (let key of keySet) {
      if (has(obj, key)) {
        if (isObject(obj[key])) {
          return partialMatch(obj[key], scr[key]);
        } else {
          if (obj[key] !== src[key]) return false;
        }
      } else {
        return false;
      }
    }
    return true;
  }

  function filter(collection, iteratee = identity) {
    let result = [];
    let func = patternIdentification(iteratee);
    forEach(collection, item => {
      if (func(item))
        result.push(item);
    });
    return result;
  }

  function getFirstPropertyValue(obj) {
    if (Object.prototype.toString.call(obj) === '[object Object]') {
      if (obj == null) return null;
      const entries = Object.entries(obj);
      return entries[0][1];
    }
    throw new TypeError("Unexpected Type");

  }

  function isObject(collection) {
    return Object.prototype.toString.call(collection) === '[object Object]';
  }

  function isSet(collection) {
    return Object.prototype.toString.call(collection) === '[object Set]';
  }

  function isMap(collection) {
    return Object.prototype.toString.call(collection) === '[object Map]';
  }

  function isRegExp(collection) {
    return Object.prototype.toString.call(collection) === '[object RegExp]';
  }

  function reduce(collection, func, initialValue) {
    let start = 0
    if (initialValue == undefined) {
      if (isObject(collection)) {
        initialValue = {};
      } else {
        initialValue = collection[0];
        start = 1;
      }
    }

    if (isObject(collection)) {
      let keySet = keys(collection);
      for (let key of keySet) {
        initialValue = func(initialValue, collection[key], key);
      }
    } else {
      for (let i = start; i < collection.length; i++) {
        initialValue = func(initialValue, collection[i]);
      }
    }
    return initialValue;
  }

  function keys(obj) {
    let result = [];
    if (Array.isArray(obj) || typeof obj === 'string') {
      for (var i = 0; i < obj.length; i++) {
        result.push(i.toString());
      }
    } else {
      result = Object.keys(obj);
    }
    return result;
  }

  function reduceRight(collection, iterator, initialValue) {
    if (initialValue == undefined) {
      if (isObject(collection)) {
        initialValue = {};
      } else {
        initialValue = [];
      }
    }
    if (isObject(collection)) {
      let keySet = keys(collection);
      for (let index = keySet.length - 1; index >= 0; index--) {
        let initialValue = iterator(initialValue, collection[keySet[index]], keySet[index]);
        if (!has(collection, keySet[index])) {
          initialValue[keySet[index]] = initialValue;
        }
        if (initialValue === false) {
          break;
        }
      }
    } else {

      for (let index = collection.length - 1; index >= 0; index--) {
        initialValue = iterator(initialValue, collection[index], index);
        if (initialValue === false) {
          break;
        }
      }

    }

    return initialValue;
  }

  function size(collection) {
    let size = 0;
    if (typeof collection == 'string' || Array.isArray(collection)) {
      size = collection.length;
    } else if (isObject(collection)) {
      let keySet = keys(collection);
      for (let key of keySet) {
        size++;
      }
    } else if (isMap || isSet) {
      size = collection.size;
    }
    return size;
  }

  function splice(arr, start = 0, end = arr.length) {
    let result;
    if (typeof arr === 'string') {
      result = '';
      for (var i = start; i < end; i++) {
        result += arr[i];
      }
    } else {
      result = [];
      for (var i = start; i < end; i++) {
        result.push(arr[i]);
      }

    }
    return result;
  }

  function mergeSort(arr, func) {
    if (arr.length < 2) return arr;

    const mid = arr.length >> 1;
    let left = splice(arr, 0, mid);
    let right = splice(arr, mid);

    mergeSort(left, func);
    mergeSort(right, func);

    var i = 0, j = 0, k = 0;
    while (i < left.length && j < right.length) {
      if (func(left[i]) <= func(right[j])) {
        arr[k++] = left[i++];
      } else {
        arr[k++] = right[j++];
      }
    }

    while (i < left.length) {
      arr[k++] = left[i++]
    }
    while (j < right.length) {
      arr[k++] = right[j++]
    }

    return arr;
  }


  function sortBy(collection, iteratees = identity) {
    forEach(iteratees, (demand) => {
      const func = patternIdentification(demand);
      mergeSort(collection, func);
    })
    return collection;
  }

  function sample(array) {
    return array[Math.random() * (array.length) | 0];
  }

  function isUndefined(exp) {
    return exp === undefined;
  }

  function isNull(exp) {
    return exp === null;
  }


  function isNil(exp) {
    return isNull(exp) || isUndefined(exp);
  }

  function max(array) {
    if (array.length === 0 || isFalsey(array)) {
      return undefined;
    }
    return Math.max(...array);
  }

  function min(array) {
    if (array.length === 0 || isFalsey(array)) {
      return undefined;
    }
    return Math.min(...array);
  }

  function maxBy(array, iteratee = identity) {
    let func = patternIdentification(iteratee);
    let result = [];
    let Max = -Infinity;
    forEach(array, (item) => {
      let temp = func(item);
      if (max([temp, Max]) !== Max) {
        result = item;
        Max = temp;
      }
    })
    return result;
  }

  function minBy(array, iteratee = identity) {
    let func = patternIdentification(iteratee);
    let result = [];
    let Min = Infinity;
    forEach(array, (item) => {
      let temp = func(item);
      if (min([temp, Min]) !== Min) {
        result = item;
        Min = temp;
      }
    })
    return result;

  }


  function split(str, separator, limit) {
    if (separator === undefined || separator === null) {
      return [str];
    }
    if (limit === 0) return [];

    let result = [];
    let currentIdx = 0;
    let foundIdx;

    if (separator === "") {
      for (var char of str) {
        if (result.length >= limit) break;
        result.push(char);
      }
      return result;
    }
    while (currentIdx <= str.length) {
      foundIdx = indexOf(str, separator, currentIdx);
      if (foundIdx == -1) break;

      result.push(splice(str, currentIdx, foundIdx))

      currentIdx = foundIdx + separator.length;
      if (result.length >= limit) {
        break;
      }
    }
    if (limit === undefined || (limit !== undefined && result.length < limit))
      result.push(splice(str, currentIdx));
    return result;
  }

  function round(number, precision = 0) {
    let count = precision < 0 ? -precision : precision;
    let base = 1;
    while (count > 0) {
      base *= 10;
      count--
    }

    if (precision >= 0) {
      number *= base;
      number += 0.5;
      number = number | 0;
      number /= base;

    } else {
      number /= base;
      number += 0.5;
      number = number | 0;
      number *= base;
    }
    return number;
  }

  function sumBy(array, iteratee = identity) {
    let func = patternIdentification(iteratee);
    let arr = map(array, (item) => func(item));
    return reduce(arr, (a, b) => a + b);
  }

  function flagMap(collection, iteratee = identity) {
    let result = [];
    forEach(collection, (item) => {
      let temp = iteratee(item);
      result.push(temp);
    })
    return flatten(result);
  }

  function flatMapDepth(collection, iteratee = identity, Depth) {
    let result = [];
    forEach(collection, (item) => {
      let temp = iteratee(item);
      result.push(flattenDepth(temp, Depth));
    })
    return result;
  }

  function mapKeys(object, iteratee = identity) {
    let func = patternIdentification(iteratee);
    let result = {};
    forEach(object, (item, key) => {
      let newkey = func(item, key);
      if (!has(result, newkey)) {
        result[newkey] = item;
      }
    });
    return result;
  }

  function mapValues(object, iteratee = identity) {
    let func = patternIdentification(iteratee);
    let result = {};
    forEach(object, (item, key) => {
      let value = func(item, key);
      if (!has(result, key)) {
        result[key] = value;
      } else {
        result[key] = value;
      }
    });
    return result;
  }

  function abs(x) {
    return x = x < 0 ? -x : x;
  }

  function range(start = 0, end, step = 1) {
    let result = [];
    if (end === undefined && start === 0) return result;
    else if (end === undefined && start !== undefined) {
      end = start;
      start = 0;
    }
    let sum = start;
    if (end < 0 && step > 0) step = -step;
    while (abs(sum) < abs(end)) {
      if (end < 0 && sum !== 0) {
        result.push(-(abs(sum)));
      } else {
        result.push(sum);
      }
      sum += step;
      if (result.length === abs(end) - abs(start)) break;
    }
    return result;
  }



  function stringifyJSON(value) {
    if (typeof value === 'boolean') {
      return '' + value;
    } else if (isFalsey(value)) {
      return 'null';
    } else if (Array.isArray(value)) {
      let result = '[';
      for (var item of value)
        result += stringifyJSON(item) + ',';
      result = splice(result, 0, result.length - 1);
      result += ']';
      return result;
    } else if (isObject(value)) {
      let result = '{';
      let keySet = keys(value);
      for (let key of keySet) {
        result += '"' + key + '":' + stringifyJSON(value[key]) + ',';
      }
      result = splice(result, 0, result.length - 1);
      result += '}';
      return result
    } else if (typeof value === 'number') {
      return '' + value;
    } else if (typeof value === 'string') {
      return '"' + value + '"';
    } else if (typeof value === 'function') {
      return 'null';
    }
  }

  function concat(array, ...args) {
    if (args.length === 0) return array;
    let result = array;
    for (var i = 0; i < args.length; i++) {
      if (Array.isArray(args[i])) {
        for (var j = 0; j < args[i].length; j++) {
          result.push(args[i][j]);
        }
      } else
        result.push(args[i]);
    }
    return result;
  }

  function isEqual(value, other) {
    return deepEqual(value, other);
  }


  function repeat(string = '', n = 1) {
    if (typeof string !== 'string') {
      throw new TypeError("expected Type: String");
    }
    let result = ''
    if (n === 0) return result;
    for (var i = 0; i < n; i++) {
      result += string;
    }
    return result;
  }

  function padEnd(string = '', length = 0, chars = ' ') {
    let stringLen = string.length;
    let result = string;
    while (result.length < length) {
      for (var i = 0; i < chars.length; i++) {
        result = result + chars[i];
        if (result.length === length) return result;
      }
    }
    return result;
  }

  function padStart(string = '', length = 0, chars = ' ') {
    let stringLen = string.length;
    let result = string;
    while (result.length < length) {
      for (var i = 0; i < chars.length; i++) {
        result = chars[i] + result;
        if (result.length === length) return result;
      }
    }
    return result;

  }

  function pad(string = '', length = 0, chars = ' ') {
    let stringLen = string.length;
    let rightSide = true;
    let result = string;
    while (result.length < length) {
      if (rightSide) {
        for (var i = 0; i < chars.length; i++) {
          result = result + chars[i];
          if (result.length === length) return result;
        }
        rightSide = false;
      } else {
        for (var i = chars.length - 1; i >= 0; i--) {
          result = chars[i] + result;
          if (result.length === length) return result;
        }
        rightSide = true;
      }
    }
    return result;
  }

  function values(collection) {
    let result = [];
    if (isObject(collection)) {
      let keySet = keys(collection);
      for (let key of keySet) {
        if (has(collection, key))
          result.push(collection[key]);
      }
    } else {
      for (var val of collection) {
        result.push(val);
      }
    }
    return result;
  }

  //[0,1]
  function randomInclusive() {
    const precision = 1000000000;
    const random = Math.random() * (precision + 1) | 0;
    return random / precision;
  }

  function random(lower = 0, upper = 1, floating) {
    if (upper === true) {
      floating = true;
      upper = 1;
    } else if (!Number.isInteger(lower) || !Number.isInteger(upper)) {
      floating = true;
    }
    let num = randomInclusive() * (upper - lower) + lower;
    if (floating) return num;
    return num | 0;
  }

  function ceil(number, precision = 0) {
    let count = precision > 0 ? precision : -precision;
    let base = 1;
    while (count > 0) {
      base *= 10;
      count--;
    }

    if (precision > 0) {
      number = number * base;
      number = number + 1;
      number = number | 0;
      number /= base;

    } else if (precision < 0) {
      number /= base;
      number = number + 1;
      number = number | 0;
      number *= base;
    } else {
      if (number === (number | 0)) return number + 1;
      else return number + 1 | 0;
    }
    return number;
  }

  function floor(number, precision = 0) {
    let count = precision > 0 ? precision : -precision;
    let base = 1;
    while (count > 0) {
      base *= 10;
      count--;
    }

    if (precision > 0) {
      number = number * base;
      number = number | 0;
      number /= base;
    } else if (precision < 0) {
      number /= base;
      number = number | 0;
      number *= base;
    } else {
      number = number | 0;
    }
    return number;
  }

  function stringToRegExp(string) {
    if (string.length < 2 || string[0] !== '/') {
      console.error('must be RegExp');
      return;
    }
    let lastIndexOfSlash = lastIndexOf(string, '/');
    let pattern = splice(string, 1, lastIndexOfSlash);
    let flags = splice(string, lastIndexOfSlash + 1);
    return new RegExp(pattern, flags);
  }

  function regexToStringLiteral(regex) {
    if (!regex instanceof RegExp) {
      throw new Error("Input must be a RegExp object.");
    }

    return regex.toString();
  }

  function cloneDeep(object) {
    if (object instanceof RegExp) {
      return stringToRegExp(regexToStringLiteral(object));
    }
    return parseJSON(stringifyJSON(object));
  }

  function isSameValue(element, val) {
    return element === val || (Number.isNaN(element) && Number.isNaN(val));
  }

  function includes(collection, value, fromIndex = 0) {
    if (typeof collection === 'string') {
      for (let i = 0; i < collection.length; i++) {
        var match = true;
        for (let j = 0; j < value.length; j++) {
          if (collection[i + j] !== value[j]) {
            match = false;
            break;
          }
        }
        if (match) return match;
      }
      return match;
    } else if (collection instanceof Array) {
      let startIndex = fromIndex < 0 ? Math.max(fromIndex + collection.length, 0) : Math.floor(Number(fromIndex)) || 0;
      for (let i = startIndex; i < collection.length; i++) {
        if (collection[i] === value) {
          return true;
        }
      }
      return false;
    } else if (isObject(collection)) {
      let valueSet = values(collection);
      for (let element of valueSet) {
        if (isSameValue(element, value)) {
          return true
        }
      }
      return false;
    }

  }

  function trim(string = '', chars = ' ') {
    if (typeof chars !== 'string') chars = ' ';
    if (string === '') return string;
    let result = string;
    let i = 0, j = string.length - 1;
    while (i < j) {
      if (includes(chars, string[i])) i++;
      if (includes(chars, string[j])) j--;
      if (!includes(chars, string[i]) && !includes(chars, string[j])) break;
    }
    result = splice(string, i, j + 1);
    return result;
  }

  function trimStart(string = '', chars = ' ') {
    if (typeof chars !== 'string') chars = ' ';
    if (string === '') return string;
    let result = string;
    let i = 0;
    while (i < string.length) {
      if (includes(chars, string[i])) i++;
      if (!includes(chars, string[i])) break;
    }
    result = splice(string, i);
    return result;
  }

  function trimEnd(string = '', chars = ' ') {
    if (typeof chars !== 'string') chars = ' ';
    if (string === '') return string;
    let result = string;
    let i = string.length - 1;
    while (i < string.length) {
      if (includes(chars, string[i])) i--;
      if (!includes(chars, string[i])) break;
    }
    result = splice(string, 0, i + 1);
    return result;
  }

  function assign(object, ...srcobjs) {

    forEach(srcobjs, srcobj => {
      let keySet = keys(srcobj);
      reduce(keySet, (newObj, key) => {
        if (!has(newObj, key)) newObj[key] = srcobj[key];
        else newObj[key] = srcobj[key];
        return newObj;
      }, object)
    })
    return object;
  }

  function merge(object, ...srcobjs) {

    forEach(srcobjs, srcobj => {
      if (Array.isArray(srcobj) && Array.isArray(object)) {
        for (let i = 0; i < srcobj.length; i++) {
          let exeistVal = srcobj[i];
          if (exeistVal) {
            if (isObject(object[i]) && isObject(srcobj[i])
              || Array.isArray(srcobj[i]) && Array.isArray(object[i]))
              merge(object[i], srcobj[i]);
            else if (typeof object[i] !== typeof srcobj[i] && srcobj[i] !== undefined) {
              object[i] = srcobj[i];
            }
          }
          else if (!exeistVal) newObj[i] = srcobj[i];
        }
      } else {
        let keySet = keys(srcobj);
        reduce(keySet, (newObj, key) => {
          let exeist = has(newObj, key);
          if (exeist) {
            if (isObject(newObj[key]) && isObject(srcobj[key])
              || Array.isArray(srcobj[key]) && Array.isArray(newObj[key]))
              merge(newObj[key], srcobj[key]);
            else if (typeof newObj[key] !== typeof srcobj[key] && srcobj[key] !== undefined) {
              newObj[key] = srcobj[key]
            }
          }
          else if (!exeist) newObj[key] = srcobj[key];
          return newObj;
        }, object)
      }
    })
    return object;
  }

  function tail(array) {
    if (array.length === 0) return undefined;
    let result = [];
    if (array instanceof Array) {
      for (var i = 1; i < array.length; i++) {
        result.push(array[i]);
      }
    }
    return result;
  }

  function union(...arrays) {
    let result = arrays[0];
    reduce(arrays, (result, array) => {
      for (let val of array) {
        if (indexOf(result, val) === -1) {
          result.push(val);
        }
      }
      return result;
    }, result);
    return result;
  }

  function uniq(array) {
    let result = new Set();
    for (let val of array) {
      result.add(val);
    }
    return Array.from(result);
  }

  function zip(...arrs) {
    let result = [], temp = [];
    for (var i = 0; i < arrs[0].length; i++) {
      for (var j = 0; j < arrs.length; j++) {
        temp.push(arrs[j][i]);
      }
      result.push(temp);
      temp = [];
    }
    return result;
  }

  function unzip(arrs) {
    let result = [], temp = [];
    for (var i = 0; i < arrs[0].length; i++) {
      for (var j = 0; j < arrs.length; j++) {
        temp.push(arrs[j][i]);
      }
      result.push(temp);
      temp = [];
    }
    return result;
  }

  function difference(src, ...others) {
    let setA = new Set(src);
    let setB = new Set(flatten(others));
    return Array.from(setA.difference(setB));
  }

  function differenceBy(srcs, ...args) {
    let iteratee = Array.isArray(args[args.length - 1]) ? null : args.pop();
    let func = patternIdentification(iteratee);
    let setB = new Set(map(flatten(args), item => func(item)));
    let result = [];
    for (const element of srcs) {
      let transformElement = func(element);
      if (!has(setB, transformElement)) {
        result.push(element)
      }
    }
    return result;
  }

  function differenceWith(srcs, other, iteratee = identity) {
    let func = patternIdentification(iteratee);
    let result = [];
    forEach(srcs, (term) => {
      let matchOne = false;
      forEach(other, (item) => {
        if (func(term, item)) {
          matchOne = true;
          return false;
        }
      })
      if (!matchOne) result.push(term);
    })
    return result;
  }



  return {
    join: join,
    parseJSON: parseJSON,
    compact: compact,
    fill: fill,
    chunk: chunk,
    drop: drop,
    flatten: flatten,
    flattenDeep: flattenDeep,
    flattenDepth: flattenDepth,
    get: get,
    fromPairs: fromPairs,
    toPairs: toPairs,
    indexOf: indexOf,
    lastIndexOf: lastIndexOf,
    pull: pull,
    last: last,
    every: every,
    some: some,
    forEach: forEach,
    has: has,
    countBy: countBy,
    groupBy: groupBy,
    keyBy: keyBy,
    map: map,
    filter: filter,
    reduce: reduce,
    keys: keys,
    reduceRight: reduceRight,
    sortBy: sortBy,
    sample: sample,
    isUndefined: isUndefined,
    splice: splice,
    isNull: isNull,
    isNil: isNil,
    max: max,
    min: min,
    maxBy: maxBy,
    minBy: minBy,
    round: round,
    sumBy: sumBy,
    flagMap: flagMap,
    flatMapDepth: flatMapDepth,
    split: split,
    mapKeys: mapKeys,
    mapValues: mapValues,
    range: range,
    stringifyJSON: stringifyJSON,
    concat: concat,
    isEqual: isEqual,
    repeat: repeat,
    padStart: padStart,
    padEnd: padEnd,
    pad: pad,
    values: values,
    random: random,
    ceil: ceil,
    floor: floor,
    regexToStringLiteral: regexToStringLiteral,
    stringToRegExp: stringToRegExp,
    cloneDeep: cloneDeep,
    trim: trim,
    trimStart: trimStart,
    trimEnd: trimEnd,
    assign: assign,
    tail: tail,
    uniq: uniq,
    merge: merge,
    union: union,
    initial: initial,
    zip: zip,
    unzip: unzip,
    includes: includes,
    difference: difference,
    differenceBy: differenceBy,
    differenceWith: differenceWith,
  }
}()




export { cpyer11 as _ }

