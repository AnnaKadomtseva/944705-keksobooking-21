'use strict';

(function () {
  const Url = {
    LOAD: 'https://21.javascript.pages.academy/keksobooking/data',
    UPLOAD: 'https://21.javascript.pages.academy/keksobooking'
  };
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;

  const createXhr = function (method, url, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = TIMEOUT_IN_MS;
    xhr.open(method, url);
    return xhr;
  };

  const upload = function (data, onSuccess, onError) {
    createXhr('POST', Url.UPLOAD, onSuccess, onError).send(data);
  };

  const load = function (onSuccess, onError) {
    createXhr('GET', Url.LOAD, onSuccess, onError).send();
  };

  window.backend = {
    upload: upload,
    load: load
  };
})();
