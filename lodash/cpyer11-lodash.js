var cpyer11 = function () {
  function join(array, separator = ",") {
    var result = ""
    for (var i = 0; i < array.length - 1; i++) {
      result = result + array[i] + separator
    }
    result = result + array[array.length - 1]
    return result
  }

  return {
    join: join,
  }
}()