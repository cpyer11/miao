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
  [1, 2, 3].fill

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

  return {
    join: join,
    parseJSON: parseJSON,
    compact: compact,
    fill: fill,
  }
}()