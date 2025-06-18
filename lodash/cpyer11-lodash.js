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
    if (isNaN(val) || val === false || val === null || val === undefined || val === 0 || val === "") {
      return true;
    }
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

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (let key in keys1) {
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

  function indexOf(array, value, fromIndex = 0) {
    if (array.length === 0) return -1;
    if (fromIndex < 0) fromIndex = Math.max(array.length + fromIndex, 0);
    for (var i = fromIndex; i < array.length; i++) {
      if (array[i] === value) return i;
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

    if (Object.prototype.toString.call(collection) == '[object Object]') {
      for (var key in collection) {
        if (iterator(collection[key], key) === false) {
          return collection;
        }
      }
    } else {
      for (var index = 0; index < collection.length; index++) {
        if (iterator(collection[index], index) === false) {
          return collection;// stop iterating return collection
        }
      }
    }
    return collection;
  }


  function patternIdentification(predicate = identity) {
    if (typeof predicate === 'function') {
      return function (item) {
        return predicate(item);
      }
    } else if (typeof predicate === 'string' || typeof predicate === 'number') {
      return function (object) {
        return get(object, predicate.toString());
      }
    } else if (Object.prototype.toString.call(predicate) === '[object Array]') {
      const [key, value] = predicate;
      return function (arr1) {
        return deepEqual(arr1[key], value);
      }
    } else if (Object.prototype.toString.call(predicate) === '[object Object]') {
      return function (obj1) {
        return deepEqual(obj1, predicate);
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
    }

    throw new TypeError('input must be a string or Array');
  }


  function has(object, path) {
    let keyArrary = analysePath(path);
    for (var key in object) {
      if (key === keyArrary[0]) {
        if (typeof object[key] === 'function') return false;
        if (Object.prototype.toString.call(object[key]) !== null && keyArrary.length > 1) {
          if (has(object[key], keyArrary.slice(1)) === false) return false;// return to last level
          else return true;
        } else {
          return true
        }

      }
    }
    return false;
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
      if (!has(obj, key)) {
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
    forEach(collection, item => {
      result.push(func(item));
    });
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
  }
}()

export { cpyer11 }

