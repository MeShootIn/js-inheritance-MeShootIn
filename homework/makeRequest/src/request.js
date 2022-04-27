import Result from './result.js';
import Status from './status.js';

export default class Request {
  #url;

  #results = [];

  /**
   * Конструктор класса {@link Request}.
   * @param {string} url ссылка для GET-запроса.
   */
  constructor(url) {
    this.#url = url;
  }

  /**
   * Пополняет массив с HTML-элементами div.result, соответствующими текущему url.
   * @param {Node} $results массив HTML-элементов div.result.
   * @returns {Request} текущий объект (this).
   */
  addResults(...$results) {
    this.#results = this.#results.concat(...$results);

    return this;
  }

  /**
   * Обновление статусов всех HTML-элементов div.result из массива.
   * @param {string} status новый статус.
   */
  #setStatus(status) {
    for (const $result of this.#results) {
      Result.setStatus($result, status);
    }
  }

  /**
   * Асинхронный GET-запрос на сервер через fetch с динамическим обновлением статусов.
   * @param {number} timeout таймаут в миллисекундах.
   * @returns {Promise<Response>} промис, резолвящийся в объект класса {@link Response}.
   */
  async make(timeout = 3000) {
    const abortController = new AbortController();

    setTimeout(() => { abortController.abort(); }, timeout);
    this.#setStatus(Status.IN_PROGRESS);

    return fetch(this.#url, {
      signal: abortController.signal
    })
      .then(response => {
        if (response.ok) {
          this.#setStatus(Status.RESOLVED);

          return response;
        }

        this.#setStatus(Status.REJECTED);

        throw response;
      })
      .catch(err => {
        this.#setStatus(Status.REJECTED);

        throw err;
      });
  }
}
