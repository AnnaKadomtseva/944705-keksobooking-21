'use strict';

(function () {
  const TitleLength = {
    MIN: 30,
    MAX: 100
  };

  const numberOfGuests = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  const BuildingMinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };

  const form = document.querySelector('.ad-form');
  const formElements = form.querySelectorAll('fieldset, select');
  const address = form.querySelector('#address');
  const title = document.querySelector('#title');
  const guestsNumber = document.querySelector('#capacity');
  const roomsNumber = document.querySelector('#room_number');
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

  let setAddress = function (x, y) {
    address.value = x + ', ' + y;
  };

  title.addEventListener('input', function () {
    const valueLength = title.value.length;
    if (valueLength < TitleLength.MIN) {
      title.setCustomValidity('Ещё ' + (TitleLength.MIN - valueLength) + ' симв.');
    } else if (valueLength > TitleLength.MAX) {
      title.setCustomValidity('Удалите лишние ' + (valueLength - TitleLength.MAX) + ' симв.');
    } else {
      title.setCustomValidity('');
    }

    title.reportValidity();
  });

  title.addEventListener('invalid', function () {
    if (title.validity.tooShort) {
      title.setCustomValidity('Заголовок должен состоять минимум из 30 символов');
    } else if (title.validity.tooLong) {
      title.setCustomValidity('Заголовок не должен превышать 100 симолов');
    } else if (title.validity.valueMissing) {
      title.setCustomValidity('Обязательное поле');
    } else {
      title.setCustomValidity('');
    }
  });

  const validateRooms = function () {
    const roomValue = roomsNumber.value;
    capacityOptions.forEach(function (option) {
      option.selected = numberOfGuests[roomValue][0] === option.value;
      let isShow = !(numberOfGuests[roomValue].indexOf(option.value) >= 0);
      option.disabled = isShow;
      option.hidden = isShow;
    });
  };

  validateRooms();

  roomsNumber.addEventListener('change', function () {
    validateRooms();
  });

  form.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(form), function () {
      setDisableState();
    });
    evt.preventDefault();
  });

  const onTypeInputChange = function (evt) {
    const minPrice = BuildingMinPrice[evt.target.value.toUpperCase()];
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

  window.form = {
    formElement: form,
    activateForm: activateForm,
    setDisableState: setDisableState,
    setAddress: setAddress
  };
})();
