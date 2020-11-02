'use strict';

(function () {
  const resetButton = document.querySelector('.ad-form__reset');
  const errorPopup = document.querySelector('#error').content.querySelector('.error');
  const successPopup = document.querySelector('#success').content.querySelector('.success');
  const main = document.querySelector('main');

  const closeError = function () {
    const error = document.querySelector('.error');
    error.remove();
    document.removeEventListener('keydown', onErrorEscPress);
  };

  const onErrorClick = function () {
    closeError();
  };

  const onErrorEscPress = function (evt) {
    window.utils.pressEsc(evt, closeError);
  };

  const onError = function () {
    main.insertAdjacentElement('afterbegin', errorPopup);
    const closeButtonError = document.querySelector('.error__button');
    closeButtonError.addEventListener('click', onErrorClick);
    errorPopup.addEventListener('click', onErrorClick);
    document.addEventListener('keydown', onErrorEscPress);
  };

  const closeSuccess = function () {
    const success = document.querySelector('.success');
    success.remove();
    document.removeEventListener('keydown', onSuccessEscPress);
  };

  const onSuccessClick = function () {
    closeSuccess();
  };

  const onSuccessEscPress = function (evt) {
    window.utils.pressEsc(evt, closeSuccess);
  };

  const onSuccess = function () {
    main.insertAdjacentElement('afterbegin', successPopup);
    successPopup.addEventListener('click', onSuccessClick);
    document.addEventListener('keydown', onSuccessEscPress);
  };

  const deactivatePage = function () {
    window.card.mapElement.classList.add('map--faded');
    window.form.deactivate();
    window.pin.remove();
    window.card.remove();
    window.map.getPosition();
    window.image.remove();
  };

  const onResetButtonClick = function (evt) {
    evt.preventDefault();
    deactivatePage();
  };

  resetButton.addEventListener('click', onResetButtonClick);

  const onFormSuccessSubmit = function () {
    onSuccess();
    deactivatePage();
  };

  window.form.formElement.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(window.form.formElement), onFormSuccessSubmit, onError);
    evt.preventDefault();
  });
})();
