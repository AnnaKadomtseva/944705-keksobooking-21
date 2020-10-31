'use strict';

(function () {
  const MainPinSize = {
    WIDTH: 65,
    HEIGHT: 65,
    ARROW: 22
  };

  const PIN_SIZE_WIDTH_ARROW = MainPinSize.HEIGHT + MainPinSize.ARROW;

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

  const mapPinMain = document.querySelector('.map__pin--main');
  const address = document.querySelector('#address');

  let setAddress = function (x, y) {
    address.value = x + ', ' + y;
  };

  const errorHandler = function (errorMessage) {
    const error = document.querySelector('#error');
    error.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: orange;';
    error.style.position = 'absolute';
    error.style.left = 0;
    error.style.right = 0;
    error.style.fontSize = '35px';

    error.textContent = errorMessage;
    document.main.insertAdjacentElement('afterbegin', error);
  };

  const setDefaultCoordinates = function (isActivePage) {
    const deactivatedX = DefaultMainPin.X + Math.floor(MainPinSize.WIDTH / 2);
    const deactivatedY = DefaultMainPin.Y + Math.floor(MainPinSize.HEIGHT / 2);
    const activatedY = DefaultMainPin.Y + PIN_SIZE_WIDTH_ARROW;

    if (isActivePage) {
      setAddress(deactivatedX, activatedY);
    } else {
      setAddress(deactivatedX, deactivatedY);
    }
  };

  setDefaultCoordinates();

  const setActualCoordinates = function () {
    const changedX = parseInt(mapPinMain.style.left, 10) + Math.floor(MainPinSize.WIDTH / 2);
    const changedY = parseInt(mapPinMain.style.top, 10) + PIN_SIZE_WIDTH_ARROW;

    setAddress(changedX, changedY);
  };

  const activateFields = function () {
    window.card.mapElement.classList.remove('map--faded');
    window.backend.load(window.pin.render, errorHandler);
    window.form.activateForm();
    setDefaultCoordinates(true);
  };

  const onMainPinMouseDown = function (evt) {
    evt.preventDefault();
    window.utils.isMouseButtonEvent(evt, activateFields);

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

      if (shift.y < IntervalCoordinates.Y_MIN - PIN_SIZE_WIDTH_ARROW) {
        shift.y = IntervalCoordinates.Y_MIN - PIN_SIZE_WIDTH_ARROW;
      } else if (shift.y > IntervalCoordinates.Y_MAX - PIN_SIZE_WIDTH_ARROW) {
        shift.y = IntervalCoordinates.Y_MAX - PIN_SIZE_WIDTH_ARROW;
      }

      if (shift.x < IntervalCoordinates.X_MIN + Math.floor(MainPinSize.WIDTH / 2)) {
        shift.x = IntervalCoordinates.X_MIN - Math.floor(MainPinSize.WIDTH / 2);
      } else if (shift.x > IntervalCoordinates.X_MAX - Math.floor(MainPinSize.WIDTH / 2)) {
        shift.x = IntervalCoordinates.X_MAX - Math.floor(MainPinSize.WIDTH / 2);
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
    window.utils.isEnterEvent(evt, activateFields);
  };

  mapPinMain.addEventListener('mousedown', onMainPinMouseDown);
  mapPinMain.addEventListener('keydown', onMainPinEnterPress);

  const getPinPrimaryPosition = function () {
    setDefaultCoordinates();
    mapPinMain.style.left = DefaultMainPin.X + 'px';
    mapPinMain.style.top = DefaultMainPin.Y + 'px';
  };

  window.map = {
    getPinPrimaryPosition: getPinPrimaryPosition
  };
})();
