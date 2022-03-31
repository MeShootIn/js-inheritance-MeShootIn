/**
 * Напишите функцию promiseRace(promises), поведение
 * которой аналогично поведению Promise.race(promises).
 *
 * @param {Iterable.<*>}
 * @return {Promise}
 */
export const promiseRace = promises => new Promise((resolve, reject) => {
  promises.forEach(promise => {
    Promise.resolve(promise).then(resolve, reject);
  });
});
