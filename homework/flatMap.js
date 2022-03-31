function flatMap(callback, thisArg) {
  return (
    () => this
      .map(callback, thisArg)
      .reduce((acc, val) => acc.concat(val), [])
  )();
}

/**
 * Напишите функцию, добавляющую полифил метода flatMap
 * к прототипу Array. Полифил должен полностью реализовывать
 * метод (обратите внимание на передачу контекста, индексы и так далее).
 *
 * Описание метода:
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap
 *
 * @param  {*} ArrayConstructor конструктор Array
 * @return {Array} Тот же конструктор с добавленным методом flatMap
 */
export const flatMapPolyfill = (ArrayConstructor = Array) => Object.defineProperties(ArrayConstructor.prototype, {
  flatMap: {
    writable: true,
    enumerable: false,
    configurable: true,
    value: flatMap
  }
});
