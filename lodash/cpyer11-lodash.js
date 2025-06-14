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

  return {
    join: join,
    parseJSON: parseJSON,
    compact: compact,
    fill: fill,
    chunk: chunk,
    drop: drop,
    flatten: flatten,
    flattenDeep: flattenDeep;
    flattenDepth: flattenDepth;
  }
}()