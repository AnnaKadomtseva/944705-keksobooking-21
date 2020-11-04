'use strict';

(function () {
  const MAIN_PIN_HEIGHT = 65;
  const ARROW_HEIGHT = 22;

  const PinSizes = {
    PIN_SIZE_WIDTH_ARROW: MAIN_PIN_HEIGHT + ARROW_HEIGHT,
    WIDTH: 65
  };

  const DefaultMainPin = {
    X: 600,
    Y: 375
  };

  const IntervalCoordinates = {
    X_MIN: 0,
    X_MAX: 1200,
    Y_MIN: 130,
    Y_MAX: 630
  };

  let offers = [];

  const mapPinMain = document.querySelector('.map__pin--main');
  const address = document.querySelector('#address');

  const setAddress = function (x, y) {
    address.value = x + ', ' + y;
  };

  const errorHandler = function (errorMessage) {
    const error = document.createElement('div');
    error.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: orange;';
    error.style.position = 'absolute';
    error.style.left = 0;
    error.style.right = 0;
    error.style.fontSize = '35px';

    error.textContent = errorMessage;
    document.main.insertAdjacentElement('afterbegin', error);
  };

  const setDefaultCoordinates = function (isActivePage) {
    const deactivatedX = DefaultMainPin.X + Math.floor(PinSizes.WIDTH / 2);
    const deactivatedY = DefaultMainPin.Y + Math.floor(MAIN_PIN_HEIGHT / 2);
    const activatedY = DefaultMainPin.Y + PinSizes.PIN_SIZE_WIDTH_ARROW;

    if (isActivePage) {
      setAddress(deactivatedX, activatedY);
    } else {
      setAddress(deactivatedX, deactivatedY);
    }
  };

  setDefaultCoordinates();

  const setActualCoordinates = function () {
    const changedX = parseInt(mapPinMain.style.left, 10) + Math.floor(PinSizes.WIDTH / 2);
    const changedY = parseInt(mapPinMain.style.top, 10) + PinSizes.PIN_SIZE_WIDTH_ARROW;

    setAddress(changedX, changedY);
  };

  const successHandler = function (data) {
    data.forEach(function (item) {
      if (item.offer) {
        offers.push(item);
      }
    });

    window.pin.render(offers.slice(0, window.filter.PINS_MAX));
  };

  const activateFields = function () {
    window.card.mapElement.classList.remove('map--faded');
    window.backend.load(successHandler, errorHandler);
    window.form.activate();
    setDefaultCoordinates(true);
  };

  const onMainPinMouseDown = function (evt) {
    evt.preventDefault();
    window.utils.pressMouseButton(evt, activateFields);

    let startCoords = {
      x: evt.clientX - mapPinMain.getBoundingClientRect().left,
      y: evt.clientY - mapPinMain.getBoundingClientRect().top
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      let shift = {
        x: moveEvt.clientX - startCoords.x - window.card.mapElement.getBoundingClientRect().left,
        y: moveEvt.clientY - startCoords.y - window.card.mapElement.getBoundingClientRect().top
      };

      if (shift.y < IntervalCoordinates.Y_MIN - PinSizes.PIN_SIZE_WIDTH_ARROW) {
        shift.y = IntervalCoordinates.Y_MIN - PinSizes.PIN_SIZE_WIDTH_ARROW;
      } else if (shift.y > IntervalCoordinates.Y_MAX - PinSizes.PIN_SIZE_WIDTH_ARROW) {
        shift.y = IntervalCoordinates.Y_MAX - PinSizes.PIN_SIZE_WIDTH_ARROW;
      }

      if (shift.x < IntervalCoordinates.X_MIN + Math.floor(PinSizes.WIDTH / 2)) {
        shift.x = IntervalCoordinates.X_MIN - Math.floor(PinSizes.WIDTH / 2);
      } else if (shift.x > IntervalCoordinates.X_MAX - Math.floor(PinSizes.WIDTH / 2)) {
        shift.x = IntervalCoordinates.X_MAX - Math.floor(PinSizes.WIDTH / 2);
      }

      mapPinMain.style.left = shift.x + 'px';
      mapPinMain.style.top = shift.y + 'px';

      setActualCoordinates();
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const onMainPinEnterPress = function (evt) {
    window.utils.pressEnter(evt, activateFields);
  };

  mapPinMain.addEventListener('mousedown', onMainPinMouseDown);
  mapPinMain.addEventListener('keydown', onMainPinEnterPress);

  const getPinPrimaryPosition = function () {
    setDefaultCoordinates();
    mapPinMain.style.left = DefaultMainPin.X + 'px';
    mapPinMain.style.top = DefaultMainPin.Y + 'px';
  };

  window.map = {
    offers: function () {
      return offers;
    },
    getPosition: getPinPrimaryPosition
  };
})();
