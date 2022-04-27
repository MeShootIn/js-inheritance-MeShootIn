import Request from './src/request.js';

/**
 * Задача повышенной сложности. На неё нет тестов, и ее выполнение
 * должно быть визуализировано.
 *
 * Напишите функцию makeRequests(urls, maxRequests), получающую
 * на вход массив ссылок urls и число maxRequests - максимальное
 * количество одновременных запросов. Условия:
 *
 * 1. Одновременно должно выполняться не более указанного
 *    числа запросов.
 * 2. Должен возвращаться promise, резолвящийся в массив результатов
 *    в той же последовательности, что и адреса запросов.
 * 3. Дублирующиеся урлы должны игнорироваться (при этом
 *    результат всё равно должен присутствовать в результате
 *    на нужной позиции).
 * 4. Массив результатов должен возвращаться вне зависимости
 *    от успешности выполнения запросов.
 * 5. В массиве результатов вместо "упавших" запросов должна быть строка "Error".
 *
 * Требования к визуализации:
 *
 * 1. Должен быть создан index.html.
 * 2. В интерфейсе должна быть возможность задать любое количество url.
 *    (Можно сделать это добавлением/удалением полей, перечислить через запятую в одном текстовом поле
 *    или любой другой вариант, на который хватит фантазии).
 * 3. В интерфейсе должна быть возможность задать число -- ограничение на количество запросов.
 * 4. В интерфейсе должна быть кнопка, по нажатию на которую должно начинаться выполнение запросов.
 * 5. После запуска должен отображаться список url.
 * 6. У каждого url должен отображаться актуальный статус
 *    (wait, in progress, resolved, rejected), доп информация (duplicate) и результат. Хорошо,
 *    если статус будет отображаться цветом.
 * 7. После выполнения всех запросов на страницу нужно вывести результат.
 *
 * @param  {string[]} urls      массив с адресами
 * @param  {number} maxRequests максимальное количество одновременных запросов
 * @return {Promise}
 */
export default async function makeRequests(urls, maxRequests) {
  const requestMap = new Map();
  const responses = [];
  const responseMap = new Map();
  const requestPromises = [];

  for (let i = 0; i < maxRequests; ++i) {
    requestPromises[i] = Promise.resolve();
  }

  const setRequest = i => {
    if (!requestMap.has(urls[i])) {
      requestMap.set(urls[i], new Request(urls[i]));
    }

    return requestMap.get(urls[i]);
  };

  const setResponse = i => {
    const getResponse = async() => {
      try {
        const response = await requestMap.get(urls[i]).make();
        const data = await response.text();

        return {
          statusCode: response.status,
          data
        };
      } catch (err) {
        return {
          statusCode: err.status,
          data: 'Error'
        };
      }
    };

    if (!responseMap.has(urls[i])) {
      const response = requestPromises[i % maxRequests]
        .then(() => getResponse());

      responseMap.set(urls[i], response);
      requestPromises[i % maxRequests] = response;
    }

    return responseMap.get(urls[i]);
  };

  for (let i = 0; i < urls.length; ++i) {
    const $result = document.querySelectorAll('#results .result')[i];

    setRequest(i).addResults($result);
  }

  for (let i = 0; i < urls.length; ++i) {
    responses[i] = setResponse(i);
  }

  return Promise.resolve(responses);
}
