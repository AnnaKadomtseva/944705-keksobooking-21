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
  const mapFiltersContainer = document.querySelector('.map__filters-container');

  const renderAdFeatures = function (dataFeatures, featuresNode) {
    const currentFeatures = dataFeatures.offer.features;
    let featuresArray = [].slice.call(featuresNode.children);

    featuresArray.forEach(function (item, index) {
      if (index >= currentFeatures.length) {
        featuresNode.removeChild(item);
      }

      item.textContent = currentFeatures[index];
    });
  };

  const renderAdPhotos = function (dataPhoto, photosNode) {
    const currentPhotos = dataPhoto.offer.photos;
    const currentAdPhoto = photosNode.children[0];
    const photosFragment = document.createDocumentFragment();

    currentPhotos.forEach(function (item, index) {
      const tempAdPhoto = currentAdPhoto.cloneNode(true);

      tempAdPhoto.src = currentPhotos[index];
      photosFragment.appendChild(tempAdPhoto);
    });

    photosNode.appendChild(photosFragment);
    currentAdPhoto.remove();
  };

  const createCard = function (advert) {
    const renderedCard = mapCard.cloneNode(true);

    const cardAvatar = renderedCard.querySelector('.popup__avatar');
    if (advert.offer.avatar) {
      cardAvatar.src = advert.author.avatar;
    } else {
      cardAvatar.remove();
    }

    const cardTitle = renderedCard.querySelector('.popup__title');
    if (advert.offer.title) {
      cardTitle.textContent = advert.offer.title;
    } else {
      cardTitle.remove();
    }

    const cardAddress = renderedCard.querySelector('.popup__text--address');
    if (advert.offer.address) {
      cardAddress.textContent = advert.offer.address;
    } else {
      cardAddress.remove();
    }

    const cardPrice = renderedCard.querySelector('.popup__text--price');
    if (advert.offer.price) {
      cardPrice.textContent = advert.offer.price + '₽/ночь';
    } else {
      cardPrice.remove();
    }

    const cardType = renderedCard.querySelector('.popup__type');
    if (advert.offer.type) {
      cardType.textContent = TypesHousing[advert.offer.type];
    } else {
      cardType.remove();
    }

    const cardCapacity = renderedCard.querySelector('.popup__text--capacity');
    if (advert.offer.rooms && advert.offer.guests) {
      cardCapacity.textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
    } else {
      cardCapacity.remove();
    }

    const cardTime = renderedCard.querySelector('.popup__text--time');
    if (advert.offer.checkin && advert.offer.checkout) {
      cardTime.textContent = 'Заезд после ' + advert.offer.checkin + ', выезд до ' + advert.offer.checkout;
    } else {
      cardTime.remove();
    }

    const cardFeatures = renderedCard.querySelector('.popup__features');
    if (advert.offer.features.length) {
      renderAdFeatures(advert, cardFeatures);
    } else {
      cardFeatures.remove();
    }

    const cardDescription = renderedCard.querySelector('.popup__description');
    if (advert.offer.description) {
      cardDescription.textContent = advert.offer.description;
    } else {
      cardDescription.remove();
    }

    const cardPhotos = renderedCard.querySelector('.popup__photos');
    if (advert.offer.photos.length) {
      renderAdPhotos(advert, cardPhotos);
    } else {
      cardPhotos.remove();
    }

    mapFiltersContainer.insertAdjacentElement('beforebegin', renderedCard);
    return renderedCard;
  };

  const showCard = function (advert) {
    cardElement = createCard(advert);
    map.appendChild(cardElement);
  };

  window.card = {
    mapElement: map,
    show: showCard
  };
})();
