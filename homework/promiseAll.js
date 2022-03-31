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

  const done = () => {
    count -= 1;

    if (count === 0) {
      resolve(results);
    }
  };

  promises.forEach((promise, i) => {
    Promise.resolve(promise)
      .then(result => { results[i] = result; }, reject)
      .then(done);
  });
});
