export class Result {
  /**
   * Создаёт HTML-элемент div.result из шаблона #result-template.
   * @param {string} url ссылка для GET-запроса.
   * @returns {HTMLDivElement} HTML-элемент div.result.
   */
  static create(url) {
    const $resultTemplate = document.querySelector('#result-template');
    const $result = $resultTemplate.content.cloneNode(true);

    const $resultUrl = $result.querySelector('.result__url');

    $resultUrl.innerText = url;

    const $resultStatusCode = $result.querySelector('.result__status-code');

    $resultStatusCode.innerText = '❓';

    const $resultData = $result.querySelector('.result__data');

    $resultData.innerText = '❓';

    return $result;
  }

  /**
   * Обновляет статус у HTML-элемента summary.result__url.
   * @param {HTMLDivElement} $result HTML-элемент div.result.
   * @param {Status} status новый статус.
   */
  static setStatus($result, status) {
    const $resultUrl = $result.querySelector('.result__url');

    $resultUrl.className = `result__url result__url_${status}`;
  }
}
