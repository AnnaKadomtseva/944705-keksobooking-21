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

  const upload = function (data, onSuccess) {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });
    xhr.open('POST', Url.UPLOAD);
    xhr.send(data);
  };

  const load = function (onSuccess, onError) {
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
    xhr.open('GET', Url.LOAD);
    xhr.send();
  };

  window.backend = {
    upload: upload,
    load: load
  };
})();
