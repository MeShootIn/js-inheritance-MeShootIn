/**
 * Напишите функцию promiseRace(promises), поведение
 * которой аналогично поведению Promise.race(promises).
 *
 * @param {Iterable.<*>} promises итерируемый объект с исходными промисами
 * @return {Promise}
 */
export const promiseRace = promises => new Promise((resolve, reject) => {
  promises.forEach(promise => {
    if (promise instanceof Promise) {
      promise.then(resolve, reject);
    } else {
      resolve(promise);
    }
  });
});
