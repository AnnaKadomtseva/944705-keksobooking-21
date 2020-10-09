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
const LOCATION_X_MAX = 1200;
const LOCATION_Y_MIN = 130;
const LOCATION_Y_MAX = 630;
const AD_COUNT = 8;
const MAP_PIN_WIDTH = 50;
const MAP_PIN_HEIGHT = 70;

const getRandomItemFromArray = function (array) {
  const randomNumber = Math.floor(Math.random() * array.length);
  const randomElement = array[randomNumber];
  return randomElement;
};

const getRandomIntInclusive = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffleArray = function (a) {
  let j;
  let x;
  let i;
  for (i = a.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
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
      features: shuffleArray(OFFER_FEATURES).slice(0, getRandomIntInclusive(OFFER_FEATURES.length)),
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
const mapPin = pin.content.querySelector('.map__pin');
const mapPins = map.querySelector('.map__pins');

const makeElement = function (advert) {
  let pinElement = mapPin.cloneNode(true);
  pinElement.style.left = advert.location.x - MAP_PIN_WIDTH / 2 + 'px';
  pinElement.style.top = advert.location.y - MAP_PIN_HEIGHT + 'px';
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
mapPins.append(renderPins(pins));

map.classList.add('map--faded');

const adFormField = document.querySelector('#avatar');
adFormField.setAttribute('disabled', 'disabled');

const adFormElement = document.querySelectorAll('.ad-form__element');
for (let i = 0; i < adFormElement.length; i++) {
  adFormElement[i].setAttribute('disabled', 'disabled');
}

const mapPinMain = document.querySelector('.map__pin--main');
const form = document.querySelector('.ad-form');
let address = form.querySelector('#address');

const cancelChangeElements = function () {
  map.classList.remove('map--faded');
  adFormField.removeAttribute('disabled');
  for (let i = 0; i < adFormElement.length; i++) {
    adFormElement[i].removeAttribute('disabled');
  }
};

const getCoords = function () {
  let box = mapPinMain.getBoundingClientRect();
  return {
    top: box.top + window.pageYOffset + box.height / 2,
    left: box.left + window.pageXOffset + box.width / 2
  };
};

let setCoords = function () {
  let coords = getCoords(mapPinMain);
  address.value = coords.left + ', ' + coords.top;
};

setCoords();

const onMainPinMouseDown = function (evt) {
  if (evt.button === 0) {
    evt.preventDefault();
    cancelChangeElements();
    setCoords();
  }
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
  if (evt.key === 'Enter') {
    cancelChangeElements();
  }
};

mapPinMain.addEventListener('keydown', onMainPinEnterPress);

const title = document.querySelector('#title');
const titleMinLength = 30;
const titleMaxLength = 100;

title.addEventListener('input', function () {
  const valueLength = title.value.length;
  if (valueLength < titleMinLength) {
    title.setCustomValidity('Ещё ' + (titleMinLength - valueLength) + ' симв.');
  } else if (valueLength > titleMaxLength) {
    title.setCustomValidity('Удалите лишние ' + (valueLength - titleMaxLength) + ' симв.');
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

const numberOfGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

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
