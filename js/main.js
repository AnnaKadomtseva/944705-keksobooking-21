'use strict';

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
const MapPin = {
  WIDTH: 50,
  HEIGHT: 70
};
const TitleLength = {
  MIN: 30,
  MAX: 100
};
const Keys = {
  ENTER: 'Enter',
  LEFT_MOUSE_BUTTON: 0
};
const MainPinSize = {
  WIDTH: 62,
  HEIGHT: 62,
  ARROW: 22
};
const numberOfGuests = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

const getRandomItemFromArray = function (array) {
  return array[getRandomIntInclusive(0, array.length - 1)];
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
      price: getRandomIntInclusive(Prices.MIN, Prices.MAX),
      type: getRandomItemFromArray(OFFER_TYPES),
      rooms: getRandomIntInclusive(Rooms.MIN, Rooms.MAX),
      guests: getRandomIntInclusive(Guests.MIN, Guests.MAX),
      checkin: getRandomItemFromArray(OFFER_CHECKING),
      checkout: getRandomItemFromArray(OFFER_CHECKOUT),
      features: shuffleArray(OFFER_FEATURES).slice(0, getRandomIntInclusive(OFFER_FEATURES.length)),
      description: getRandomItemFromArray(OFFER_DESCRIPTION),
      photos: getRandomItemFromArray(OFFER_PHOTOS)
    },
    location: {
      x: getRandomIntInclusive(LocationX.MIN, LocationX.MAX),
      y: getRandomIntInclusive(LocationY.MIN, LocationY.MAX)
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

const form = document.querySelector('.ad-form');
const formElements = form.querySelectorAll('fieldset, select');

const setDisableState = function () {
  formElements.forEach(function (item) {
    item.disabled = !item.disabled;
  });
};

setDisableState();

const mapPinMain = document.querySelector('.map__pin--main');
const address = form.querySelector('#address');

let mainPinLeft = getComputedStyle(mapPinMain).left;
let mainPinTop = getComputedStyle(mapPinMain).top;

let addressDefaultCoords = {
  left: parseInt(mainPinLeft, 10),
  top: parseInt(mainPinTop, 10),
  offsetY: parseInt((MainPinSize.HEIGHT / 2 + MainPinSize.ARROW), 10)
};

let setAddress = function (x, y) {
  address.value = x + ', ' + y;
};

setAddress(addressDefaultCoords.left, addressDefaultCoords.top);

const onMainPinActivate = function (evt) {
  if (evt.button === Keys.LEFT_MOUSE_BUTTON) {
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');

    setDisableState();
    setAddress(addressDefaultCoords.left, addressDefaultCoords.offsetY);

    mapPins.append(renderPins(pins));

    mapPinMain.removeEventListener('mousedown', onMainPinActivate);
  }
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
  if (evt.key === Keys.ENTER) {
    setDisableState();
  }
};

mapPinMain.addEventListener('keydown', onMainPinEnterPress);

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
