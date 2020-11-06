'use strict';

const AD_COUNT = 8;

const MapPin = {
  WIDTH: 50,
  HEIGHT: 70
};

const pin = document.querySelector(`#pin`);
const mapPin = pin.content.querySelector(`.map__pin`);
const mapPins = document.querySelector(`.map__pins`);

const makeElement = (advert) => {
  let pinElement = mapPin.cloneNode(true);
  pinElement.style.left = `${advert.location.x - MapPin.WIDTH / 2}px`;
  pinElement.style.top = `${advert.location.y - MapPin.HEIGHT}px`;
  const mapPinImg = pinElement.querySelector(`img`);
  mapPinImg.src = advert.author.avatar;
  mapPinImg.alt = advert.offer.title;

  const onPinItemClick = () => {
    deactivatePin();
    pinElement.classList.add(`map__pin--active`);
    window.card.remove();
    window.card.create(advert);
  };

  const onPinItemEnterPress = (evt) => {
    window.utils.pressEnter(evt, onPinItemClick);
  };

  pinElement.addEventListener(`click`, onPinItemClick);
  pinElement.addEventListener(`keydown`, onPinItemEnterPress);

  return pinElement;
};

const renderPins = (adverts) => {
  const fragment = document.createDocumentFragment();
  const advertsArray = adverts.slice(0, AD_COUNT);
  advertsArray.forEach((item) => {
    fragment.appendChild(makeElement(item));
  });

  mapPins.appendChild(fragment);
};

const removePin = () => {
  const mapPinItems = mapPins.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  mapPinItems.forEach((item) => {
    item.remove();
  });
};

const deactivatePin = () => {
  const mapActivePin = mapPins.querySelector(`.map__pin--active`);
  if (mapActivePin) {
    mapActivePin.classList.remove(`map__pin--active`);
  }
};

window.pin = {
  render: renderPins,
  remove: removePin,
  deactivate: deactivatePin
};
