'use strict';

const main = document.querySelector(`main`);
const resetButton = document.querySelector(`.ad-form__reset`);
const errorPopup = document.querySelector(`#error`).content.querySelector(`.error`);
const successPopup = document.querySelector(`#success`).content.querySelector(`.success`);

const closeError = () => {
  const error = document.querySelector(`.error`);
  error.remove();
  document.removeEventListener(`keydown`, onErrorEscPress);
};

const onErrorClick = () => {
  closeError();
};

const onErrorEscPress = (evt) => {
  window.utils.pressEsc(evt, closeError);
};

const onError = () => {
  main.insertAdjacentElement(`afterbegin`, errorPopup);
  const closeButtonError = document.querySelector(`.error__button`);
  closeButtonError.addEventListener(`click`, onErrorClick);
  errorPopup.addEventListener(`click`, onErrorClick);
  document.addEventListener(`keydown`, onErrorEscPress);
};

const closeSuccess = () => {
  const success = document.querySelector(`.success`);
  success.remove();
  document.removeEventListener(`keydown`, onSuccessEscPress);
};

const onSuccessClick = () => {
  closeSuccess();
};

const onSuccessEscPress = (evt) => {
  window.utils.pressEsc(evt, closeSuccess);
};

const onSuccess = () => {
  main.insertAdjacentElement(`afterbegin`, successPopup);
  successPopup.addEventListener(`click`, onSuccessClick);
  document.addEventListener(`keydown`, onSuccessEscPress);
};

const deactivatePage = () => {
  window.card.mapElement.classList.add(`map--faded`);
  window.form.deactivate();
  window.pin.remove();
  window.card.remove();
  window.filter.deactivate();
  window.map.getPosition();
  window.image.remove();
};

const onResetButtonClick = (evt) => {
  evt.preventDefault();
  deactivatePage();
};

resetButton.addEventListener(`click`, onResetButtonClick);

const onFormSuccessSubmit = () => {
  onSuccess();
  deactivatePage();
};

window.form.formElement.addEventListener(`submit`, (evt) => {
  window.backend.upload(new FormData(window.form.formElement), onFormSuccessSubmit, onError);
  evt.preventDefault();
});
