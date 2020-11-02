'use strict';

(function () {
  const ERROR_BORDER = '3px solid red';

  const TitleLength = {
    MIN: 30,
    MAX: 100
  };

  const PriceLength = {
    MIN: 0,
    MAX: 1000000
  };

  const NumberOfGuests = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  const BuildingMinPrices = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  const form = document.querySelector('.ad-form');
  const formElements = form.querySelectorAll('fieldset, select');
  const title = form.querySelector('#title');
  const guestsNumber = form.querySelector('#capacity');
  const roomsNumber = form.querySelector('#room_number');
  const capacityOptions = guestsNumber.querySelectorAll('option');
  const timein = form.querySelector('#timein');
  const timeout = form.querySelector('#timeout');
  const type = form.querySelector('#type');
  const price = form.querySelector('#price');

  const setDisableState = function () {
    formElements.forEach(function (item) {
      item.disabled = !item.disabled;
    });
  };

  setDisableState();

  form.addEventListener('invalid', function (evt) {
    evt.target.style.outline = ERROR_BORDER;
  }, true);

  title.addEventListener('input', function () {
    const valueLength = title.value.length;
    if (valueLength < TitleLength.MIN) {
      title.setCustomValidity('Ещё ' + (TitleLength.MIN - valueLength) + ' симв.');
      title.style.outline = ERROR_BORDER;
    } else if (valueLength > TitleLength.MAX) {
      title.setCustomValidity('Удалите лишние ' + (valueLength - TitleLength.MAX) + ' симв.');
      title.style.outline = ERROR_BORDER;
    } else {
      title.setCustomValidity('');
      title.style.outline = '';
    }

    title.reportValidity();
  });

  title.addEventListener('invalid', function () {
    if (title.validity.tooShort) {
      title.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
    } else if (title.validity.tooLong) {
      title.setCustomValidity('Заголовок не должен превышать 100 символов');
    } else if (title.validity.valueMissing) {
      title.setCustomValidity('Обязательное поле');
    } else {
      title.setCustomValidity('');
    }
  });

  price.addEventListener('input', function () {
    const valueLength = price.value.length;
    if (valueLength < PriceLength.MIN) {
      price.setCustomValidity('Цена для данного типа жилья не может быть менее ' + price.min + ' p.');
      price.style.outline = ERROR_BORDER;
    } else if (valueLength > PriceLength.MAX) {
      price.setCustomValidity('Цена не может быть более 1000000 р.');
      price.style.outline = ERROR_BORDER;
    } else {
      price.setCustomValidity('');
      price.style.outline = '';
    }

    price.reportValidity();
  });

  const validateRooms = function () {
    const roomValue = roomsNumber.value;
    capacityOptions.forEach(function (option) {
      option.selected = NumberOfGuests[roomValue][0] === option.value;
      let isShow = !(NumberOfGuests[roomValue].indexOf(option.value) >= 0);
      option.disabled = isShow;
      option.hidden = isShow;
    });
  };

  validateRooms();

  roomsNumber.addEventListener('change', function () {
    validateRooms();
  });

  const onTypeInputChange = function (evt) {
    const minPrice = BuildingMinPrices[evt.target.value.toUpperCase()];
    price.min = minPrice;
    price.placeholder = minPrice;
  };

  type.addEventListener('change', onTypeInputChange);

  timein.addEventListener('change', function () {
    timeout.value = timein.value;
  });

  timeout.addEventListener('change', function () {
    timein.value = timeout.value;
  });

  const activateForm = function () {
    form.classList.remove('ad-form--disabled');
    setDisableState();
  };

  const deactivateForm = function () {
    setDisableState();
    form.classList.add('ad-form--disabled');
    form.reset();
  };

  window.form = {
    formElement: form,
    activate: activateForm,
    deactivate: deactivateForm,
    setDisableState: setDisableState
  };
})();
