'use strict';

const AUTHOR_AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
const OFFER_TITLES = ['Бунгало', 'Бунгало2', 'Квартира', 'Квартира2', 'Дом', 'Дом2', 'Дворец', 'Дворец'];
const OFFER_ADRESS = ['600, 350', '660, 450', '730, 250', '560, 380', '840, 400', '710, 190', '550, 360', '420, 540'];
const OFFER_PRICES = [10, 4000, 2500, 10000, 1999, 640, 2400, 5500];
const OFFER_TYPES = ['palace', 'flat', 'house', 'bungalow'];
const OFFER_ROOMS = [1, 2, 3, 4];
const OFFER_GUESTS = [1, 2, 3, 4];
const OFFER_CHECKING = ['12:00', '13:00', '14:00'];
const OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
const OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const OFFER_DESCRIPTION = ['Отличное бунгало', 'Бунгало на любителя', 'Уютная квартира', 'Квартира на все времена', 'Дворец класса люкс', 'Дворец миллиардера'];
const OFFER_PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
const LOCATION_X = [0, 1000];
const LOCATION_Y = [130, 630];
const AD_COUNT = 8;
const GAP_X = 10;
const GAP_Y = 15;

let getRandomItemFromArray = function (array) {
  let randomNumber = Math.floor(Math.random() * array.length);
  let randomElement = array[randomNumber];
  return randomElement;
};

let getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

let makeObject = function () {
  const advert = {
    author: {
      avatar: getRandomItemFromArray(AUTHOR_AVATARS)
    },
    offer: {
      title: getRandomItemFromArray(OFFER_TITLES),
      address: getRandomItemFromArray(OFFER_ADRESS),
      price: getRandomItemFromArray(OFFER_PRICES),
      type: getRandomItemFromArray(OFFER_TYPES),
      rooms: getRandomItemFromArray(OFFER_ROOMS),
      guests: getRandomItemFromArray(OFFER_GUESTS),
      checkin: getRandomItemFromArray(OFFER_CHECKING),
      checkout: getRandomItemFromArray(OFFER_CHECKOUT),
      features: getRandomItemFromArray(OFFER_FEATURES),
      description: getRandomItemFromArray(OFFER_DESCRIPTION),
      photos: getRandomItemFromArray(OFFER_PHOTOS)
    },
    location: {
      x: getRandomIntInclusive(LOCATION_X),
      y: getRandomIntInclusive(LOCATION_Y)
    }
  };
  return advert;
};

let generateArray = function (adCount) {
  let adverts = [];
  for (let i = 0; i < adCount.length; i++) {
    adverts[i] = makeObject();
  }
  return adverts;
};

let map = document.querySelector('.map');
map.classList.remove('map--faded');

let pin = document.querySelector('#pin');
let mapPin = pin.content.querySelector('map__pin');
let mapPins = map.querySelector('.map__pins');

let makeElement = function () {
  let pinElement = mapPin.cloneNode(true);
  pinElement.querySelector('.map__pin--main').style = `left: ${LOCATION_X + GAP_X}px; top: ${LOCATION_Y + GAP_Y}px;`;
  pinElement.querySelector('.map__pin--main img').src = AUTHOR_AVATARS;
  pinElement.querySelector('.map__pin--main img').alt = OFFER_TITLES;
  return pinElement;
};

let renderPins = function (pins) {
  var fragment = document.createDocumentFragment();
  for (let i = 0; i < pins.length; i++) {
    let resultPinElement = makeElement(pins[i]);
    fragment.appendChild(resultPinElement);
  }
  return fragment;
};

let pins = generateArray(AD_COUNT);
mapPins.append(renderPins(pins));
