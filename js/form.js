'use strict';

const WITH_BORDER = `3px solid red`;
const WITHOUT_BORDER = ``;

const TitleLength = {
  MIN: 30,
  MAX: 100
};

const PriceLength = {
  MIN: 0,
  MAX: 1000000
};

const NumberOfGuests = {
  1: [`1`],
  2: [`1`, `2`],
  3: [`1`, `2`, `3`],
  100: [`0`]
};

const BuildingMinPrices = {
  BUNGALO: 0,
  FLAT: 1000,
  HOUSE: 5000,
  PALACE: 10000
};

const form = document.querySelector(`.ad-form`);
const formElements = document.querySelectorAll(`fieldset, select`);
const title = form.querySelector(`#title`);
const guestsNumber = form.querySelector(`#capacity`);
const roomsNumber = form.querySelector(`#room_number`);
const capacityOptions = guestsNumber.querySelectorAll(`option`);
const timein = form.querySelector(`#timein`);
const timeout = form.querySelector(`#timeout`);
const type = form.querySelector(`#type`);
const price = form.querySelector(`#price`);

const changeBorderStyle = (element, border) => {
  element.style.border = border;
};

const onFormInvalid = (evt) => {
  changeBorderStyle(evt.target, WITH_BORDER);
};

form.addEventListener(`invalid`, onFormInvalid, true);

const removeBorder = (element) => {
  if (element.checkValidity()) {
    changeBorderStyle(element, WITHOUT_BORDER);
  }
};

const onTitleChange = () => {
  removeBorder(title);
};

title.addEventListener(`change`, onTitleChange);

const removeBorders = () => {
  changeBorderStyle(title, WITHOUT_BORDER);
  changeBorderStyle(price, WITHOUT_BORDER);
  changeBorderStyle(guestsNumber, WITHOUT_BORDER);
};

const setDisableState = () => {
  formElements.forEach((item) => {
    item.disabled = !item.disabled;
  });
};

setDisableState();

title.addEventListener(`input`, () => {
  const valueLength = title.value.length;
  if (valueLength < TitleLength.MIN) {
    title.setCustomValidity(`Ещё ${TitleLength.MIN - valueLength} симв.`);
  } else if (valueLength > TitleLength.MAX) {
    title.setCustomValidity(`Удалите лишние ${valueLength - TitleLength.MAX} симв.`);
  } else {
    title.setCustomValidity(``);
  }

  title.reportValidity();
});

title.addEventListener(`invalid`, () => {
  if (title.validity.tooShort) {
    title.setCustomValidity(`Заголовок должен состоять минимум из 30 символов`);
  } else if (title.validity.tooLong) {
    title.setCustomValidity(`Заголовок не должен превышать 100 символов`);
  } else if (title.validity.valueMissing) {
    title.setCustomValidity(`Обязательное поле`);
  } else {
    title.setCustomValidity(``);
  }
});

price.addEventListener(`input`, () => {
  const valueLength = price.value.length;
  if (valueLength < PriceLength.MIN) {
    price.setCustomValidity(`Цена для данного типа жилья не может быть менее ${price.min} p.`);
  } else if (valueLength > PriceLength.MAX) {
    price.setCustomValidity(`Цена не может быть более 1000000 р.`);
  } else {
    price.setCustomValidity(``);
  }

  price.reportValidity();
});

const onPriceChange = () => {
  removeBorder(price);
};

price.addEventListener(`change`, onPriceChange);

const validateRooms = () => {
  const roomValue = roomsNumber.value;
  capacityOptions.forEach((option) => {
    option.selected = NumberOfGuests[roomValue][0] === option.value;
    let isShow = !(NumberOfGuests[roomValue].indexOf(option.value) >= 0);
    option.disabled = isShow;
    option.hidden = isShow;
  });
};

validateRooms();

roomsNumber.addEventListener(`change`, () => {
  validateRooms();
});

const onCapacityChange = () => {
  removeBorder(guestsNumber);
};

guestsNumber.addEventListener(`change`, onCapacityChange);

const onTypeInputChange = (evt) => {
  const minPrice = BuildingMinPrices[evt.target.value.toUpperCase()];
  price.min = minPrice;
  price.placeholder = minPrice;
};

type.addEventListener(`change`, onTypeInputChange);

timein.addEventListener(`change`, () => {
  timeout.value = timein.value;
});

timeout.addEventListener(`change`, () => {
  timein.value = timeout.value;
});

const activateForm = () => {
  form.classList.remove(`ad-form--disabled`);
  setDisableState();
  window.filter.form.addEventListener(`change`, window.filter.onFilterChange);
};

const deactivateForm = () => {
  setDisableState();
  form.classList.add(`ad-form--disabled`);
  form.reset();
  window.filter.form.removeEventListener(`change`, window.filter.onFilterChange);
  removeBorders();
};

window.form = {
  formElement: form,
  activate: activateForm,
  deactivate: deactivateForm,
  setDisable: setDisableState
};
