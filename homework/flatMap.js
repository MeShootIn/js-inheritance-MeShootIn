/**
 * Полифилл для `Array.prototype.flatMap`.
 * @param callbackfn Функция, которая принимает до трех аргументов. Метод map вызывает функцию callbackfn один раз для
 * каждого элемента массива.
 * @param thisArg Объект, на который может ссылаться ключевое слово this в функции callbackfn. Если thisArg опущен, в
 * качестве значения this используется undefined.
 * @return {Array} Новый массив, каждый элемент которого является результатом выполнения функции callbackfn и "поднят"
 * на 1 уровень.
 */
function flatMap(callbackfn, thisArg) {
  return [].concat.call([], ...this.map(callbackfn, thisArg));
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
