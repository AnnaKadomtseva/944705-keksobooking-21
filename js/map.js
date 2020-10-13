'use strict';

(function () {
  const AUTHOR_AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
  const OFFER_TITLES = ['Бунгало', 'Бунгало2', 'Квартира', 'Квартира2', 'Дом', 'Дом2', 'Дворец', 'Дворец'];
  const OFFER_ADRESS = ['600, 350', '660, 450', '730, 250', '560, 380', '840, 400', '710, 190', '550, 360', '420, 540'];
  const OFFER_CHECKING = ['12:00', '13:00', '14:00'];
  const OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
  const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  const OFFER_DESCRIPTION = ['Отличное бунгало', 'Бунгало на любителя', 'Уютная квартира', 'Квартира на все времена', 'Дворец класса люкс', 'Дворец миллиардера'];
  const OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  const OFFER_TYPES = ['palace', 'flat', 'house', 'bungalow'];
  const Prices = {
    MIN: 0,
    MAX: 10000
  };
  const Rooms = {
    MIN: 1,
    MAX: 4
  };
  const Guests = {
    MIN: 1,
    MAX: 4
  };
  const LocationX = {
    MIN: 0,
    MAX: 1200
  };
  const LocationY = {
    MIN: 130,
    MAX: 630
  };
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

  const makeObject = function () {
    const advert = {
      author: {
        avatar: window.main.getRandomItemFromArray(AUTHOR_AVATARS)
      },
      offer: {
        title: window.main.getRandomItemFromArray(OFFER_TITLES),
        address: window.main.getRandomItemFromArray(OFFER_ADRESS),
        price: window.main.getRandomIntInclusive(Prices.MIN, Prices.MAX),
        type: window.main.getRandomItemFromArray(OFFER_TYPES),
        rooms: window.main.getRandomIntInclusive(Rooms.MIN, Rooms.MAX),
        guests: window.main.getRandomIntInclusive(Guests.MIN, Guests.MAX),
        checkin: window.main.getRandomItemFromArray(OFFER_CHECKING),
        checkout: window.main.getRandomItemFromArray(OFFER_CHECKOUT),
        features: window.main.shuffleArray(OFFER_FEATURES).slice(0, window.main.getRandomIntInclusive(OFFER_FEATURES.length)),
        description: window.main.getRandomItemFromArray(OFFER_DESCRIPTION),
        photos: window.main.getRandomItemFromArray(OFFER_PHOTOS)
      },
      location: {
        x: window.main.getRandomIntInclusive(LocationX.MIN, LocationX.MAX),
        y: window.main.getRandomIntInclusive(LocationY.MIN, LocationY.MAX)
      }
    };
    return advert;
  };

  const generateArray = function (adCount) {
    const adverts = [];
    for (let i = 0; i < adCount; i++) {
      adverts.push(makeObject());
    }
    return adverts;
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
    for (let i = 0; i < adverts.length; i++) {
      const resultPinElement = makeElement(adverts[i]);
      fragment.appendChild(resultPinElement);
    }
    return fragment;
  };

  const pins = generateArray(AD_COUNT);

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
    mapPins.append(renderPins(pins));
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
    window.utils.isEnterEvent(evt, window.form.setDisableState);
  };

  mapPinMain.addEventListener('keydown', onMainPinEnterPress);
})();
