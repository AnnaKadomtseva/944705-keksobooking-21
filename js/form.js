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
  const form = document.querySelector('.ad-form');
  const formElements = form.querySelectorAll('fieldset, select');

  const setDisableState = function () {
    formElements.forEach(function (item) {
      item.disabled = !item.disabled;
    });
  };

  setDisableState();

  const address = form.querySelector('#address');

  let setAddress = function (x, y) {
    address.value = x + ', ' + y;
  };

  const title = document.querySelector('#title');

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

  const guestsNumber = document.querySelector('#capacity');
  const roomsNumber = document.querySelector('#room_number');
  const capacityOptions = guestsNumber.querySelectorAll('option');

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

  window.form = {
    form: form,
    setDisableState: setDisableState,
    setAddress: setAddress
  };
})();
