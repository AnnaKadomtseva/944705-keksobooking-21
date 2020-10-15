'use strict';

(function () {
  const AD_COUNT = 8;
  const MainPinSize = {
    WIDTH: 62,
    HEIGHT: 62,
    ARROW: 22
  };
  const MapPin = {
    WIDTH: 50,
    HEIGHT: 70
  };

  const map = document.querySelector('.map');
  map.classList.remove('map--faded');

  const pin = document.querySelector('#pin');
  const mapPin = pin.content.querySelector('.map__pin');
  const mapPins = map.querySelector('.map__pins');

  const makeElement = function (advert) {
    let pinElement = mapPin.cloneNode(true);
    pinElement.style.left = advert.location.x - MapPin.WIDTH / 2 + 'px';
    pinElement.style.top = advert.location.y - MapPin.HEIGHT + 'px';
    const mapPinImg = pinElement.querySelector('img');
    mapPinImg.src = advert.author.avatar;
    mapPinImg.alt = advert.offer.title;
    return pinElement;
  };

  const renderPins = function (adverts) {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < AD_COUNT; i++) {
      const resultPinElement = makeElement(adverts[i]);
      fragment.appendChild(resultPinElement);
    }
    mapPins.appendChild(fragment);
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

  map.classList.add('map--faded');
  const mapPinMain = document.querySelector('.map__pin--main');

  let mainPinLeft = getComputedStyle(mapPinMain).left;
  let mainPinTop = getComputedStyle(mapPinMain).top;

  let addressDefaultCoords = {
    left: parseInt(mainPinLeft, 10),
    top: parseInt(mainPinTop, 10),
    offsetY: parseInt((MainPinSize.HEIGHT / 2 + MainPinSize.ARROW), 10)
  };

  window.form.setAddress(addressDefaultCoords.left, addressDefaultCoords.top);

  const activateFields = function () {
    map.classList.remove('map--faded');
    window.form.form.classList.remove('ad-form--disabled');
    window.form.setDisableState();
    window.form.setAddress(addressDefaultCoords.left, addressDefaultCoords.offsetY);
    window.backend.load(renderPins, errorHandler);
    mapPinMain.removeEventListener('mousedown', onMainPinActivate);
  };

  const onMainPinActivate = function (evt) {
    window.utils.isMouseButtonEvent(evt, activateFields);
  };

  mapPinMain.addEventListener('mousedown', onMainPinActivate);

  const onMainPinMouseDown = function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
      mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  mapPinMain.addEventListener('mousedown', onMainPinMouseDown);

  const onMainPinEnterPress = function (evt) {
    window.utils.isEnterEvent(evt, activateFields);
  };

  mapPinMain.addEventListener('keydown', onMainPinEnterPress);
})();
