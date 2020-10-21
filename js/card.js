'use strict';

(function () {
  const TypesHousing = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALOW: 'Бунгало'
  };

  let cardElement;
  const map = document.querySelector('.map');
  const card = document.querySelector('#card');
  const mapCard = card.content.querySelector('.map__card');
  const popupPhoto = card.content.querySelector('.popup__photo');
  const mapFiltersContainer = document.querySelector('.map__filters-container');

  const createFeatureFragment = function (ad) {
    const featureFragment = document.createDocumentFragment();
    ad.offer.features.forEach(function (it) {
      const featureItem = document.createElement('li');
      featureItem.className = 'popup__feature popup__feature--' + it;
      featureFragment.appendChild(featureItem);
    });
    return featureFragment;
  };

  const createPhotosFragment = function (ad) {
    const photosFragment = document.createDocumentFragment();
    ad.offer.photos.forEach(function (it) {
      const popupPhotoItem = popupPhoto.cloneNode(true);
      popupPhotoItem.src = it;
      photosFragment.appendChild(popupPhotoItem);
    });
    return photosFragment;
  };

  const createCard = function (ad) {
    const renderedCard = mapCard.cloneNode(true);
    renderedCard.querySelector('.popup__avatar').src = ad.author.avatar;
    renderedCard.querySelector('.popup__title').textContent = ad.offer.title;
    renderedCard.querySelector('.popup__text--address').textContent = ad.offer.address;
    renderedCard.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
    renderedCard.querySelector('.popup__type').textContent = TypesHousing[ad.offer.type];
    renderedCard.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
    renderedCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
    renderedCard.querySelector('.popup__features').innerHTML = '';
    renderedCard.querySelector('.popup__features').appendChild(createFeatureFragment(ad));
    renderedCard.querySelector('.popup__description').textContent = ad.offer.description;
    renderedCard.querySelector('.popup__photos').removeChild(renderedCard.querySelector('.popup__photo'));
    renderedCard.querySelector('.popup__photos').appendChild(createPhotosFragment(ad));
    mapFiltersContainer.insertAdjacentElement('beforebegin', renderedCard);
    return renderedCard;
  };

  const showCard = function (ad) {
    cardElement = createCard(ad);
    map.appendChild(cardElement);
  };

  window.card = {
    mapElement: map,
    show: showCard
  };
})();
