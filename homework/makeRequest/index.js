import makeRequests from './makeRequests.js';
import Result from './src/result.js';

document.addEventListener('DOMContentLoaded', () => {
  const $maxRequests = document.querySelector('#max-requests');

  $maxRequests.value = window.navigator.hardwareConcurrency;
});

window.makeRequests = () => {
  const $submitButton = document.querySelector('.submit-button');

  $submitButton.disabled = true;

  const $urls = document.querySelector('#urls');
  const urls = $urls.value
    .split(',')
    .map(url => url.trim());
  const $maxRequests = document.querySelector('#max-requests');
  const maxRequests = +$maxRequests.value;
  const $results = document.querySelector('#results');

  for (let i = 0; i < urls.length; ++i) {
    $results.appendChild(Result.create(urls[i]));
  }

  makeRequests(urls, maxRequests)
    .then(responses => {
      responses.forEach((response, i) => {
        response
          .then(({ statusCode, data }) => {
            const $result = document.querySelectorAll('#results .result')[i];
            const $statusCode = $result.querySelector('.result__status-code');

            $statusCode.innerText = `Код: ${statusCode}`;

            const $resultData = $result.querySelector('.result__data');

            if (200 <= statusCode && statusCode < 400) {
              $resultData.innerText = data;
            } else {
              $resultData.innerText = '¯\\_(ツ)_/¯';
            }
          });
      });
    });
};
