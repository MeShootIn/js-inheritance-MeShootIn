/**
 * Напишите функцию promiseAll(promises), поведение
 * которой аналогично поведению Promise.all(promises).
 *
 * @param  {Promise[]} promises массив с исходными промисами
 * @return {Promise}
 */
export const promiseAll = promises => new Promise((resolve, reject) => {
  let count = promises.length;

  const results = [];

  const done = (result, i) => {
    results[i] = result;
    count -= 1;

    if (count === 0) {
      resolve(results);
    }
  };

  promises.forEach((promise, i) => {
    if (promise instanceof Promise) {
      promise
        .then(result => { done(result, i); }, reject);
    } else {
      done(promise, i);
    }
  });
});
