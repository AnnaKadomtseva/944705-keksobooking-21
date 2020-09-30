'use strict';

const AUTHOR_AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
const OFFER_TITLES = ['Бунгало', 'Бунгало2', 'Квартира', 'Квартира2', 'Дом', 'Дом2', 'Дворец', 'Дворец'];
const OFFER_ADRESS = ['600, 350', '660, 450', '730, 250', '560, 380', '840, 400', '710, 190', '550, 360', '420, 540'];
const OFFER_PRICES_MIN = 0;
const OFFER_PRICES_MAX = 10000;
const OFFER_TYPES = ['palace', 'flat', 'house', 'bungalow'];
const OFFER_ROOMS_MIN = 1;
const OFFER_ROOMS_MAX = 4;
const OFFER_GUESTS_MIN = 1;
const OFFER_GUESTS_MAX = 4;
const OFFER_CHECKING = ['12:00', '13:00', '14:00'];
const OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const OFFER_DESCRIPTION = ['Отличное бунгало', 'Бунгало на любителя', 'Уютная квартира', 'Квартира на все времена', 'Дворец класса люкс', 'Дворец миллиардера'];
const OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const LOCATION_X_MIN = 0;
const LOCATION_X_MAX = 1000;
const LOCATION_Y_MIN = 130;
const LOCATION_Y_MAX = 630;
const AD_COUNT = 8;
const GAP_X = 10;
const GAP_Y = 15;

const getRandomItemFromArray = function (array) {
  const randomNumber = Math.floor(Math.random() * array.length);
  const randomElement = array[randomNumber];
  return randomElement;
};

const getRandomIntInclusive = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const makeObject = function () {
  const advert = {
    author: {
      avatar: getRandomItemFromArray(AUTHOR_AVATARS)
    },
    offer: {
      title: getRandomItemFromArray(OFFER_TITLES),
      address: getRandomItemFromArray(OFFER_ADRESS),
      price: getRandomIntInclusive(OFFER_PRICES_MIN, OFFER_PRICES_MAX),
      type: getRandomItemFromArray(OFFER_TYPES),
      rooms: getRandomIntInclusive(OFFER_ROOMS_MIN, OFFER_ROOMS_MAX),
      guests: getRandomIntInclusive(OFFER_GUESTS_MIN, OFFER_GUESTS_MAX),
      checkin: getRandomItemFromArray(OFFER_CHECKING),
      checkout: getRandomItemFromArray(OFFER_CHECKOUT),
      features: getRandomItemFromArray(OFFER_FEATURES),
      description: getRandomItemFromArray(OFFER_DESCRIPTION),
      photos: getRandomItemFromArray(OFFER_PHOTOS)
    },
    location: {
      x: getRandomIntInclusive(LOCATION_X_MIN, LOCATION_X_MAX),
      y: getRandomIntInclusive(LOCATION_Y_MIN, LOCATION_Y_MAX)
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
const mapPin = pin.content.querySelector('map__pin');
const mapPins = map.querySelector('.map__pins');

const makeElement = function (advert) {
  const pinElement = mapPin.cloneNode(true);
  pinElement.querySelector('.map__pin--main').style = `left: ${advert.location.x + GAP_X}px; top: ${advert.location.y + GAP_Y}px;`;
  const mapPinImg = pinElement.querySelector('.map__pin--main img');
  mapPinImg.src = advert.author.avatar;
  mapPinImg.alt = advert.offer.title;
  return pinElement;
};

const renderPins = function (pins) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < pins.length; i++) {
    const resultPinElement = makeElement(pin[i]);
    fragment.appendChild(resultPinElement);
  }
  return fragment;
};

const pins = generateArray(AD_COUNT);
mapPins.append(renderPins(pins));
