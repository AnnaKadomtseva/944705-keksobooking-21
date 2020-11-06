'use strict';

const PINS_MAX = 5;
const priceMap = {
  'low': {
    start: 0,
    end: 10000
  },
  'middle': {
    start: 10000,
    end: 50000
  },
  'high': {
    start: 50000,
    end: Infinity
  }
};

const filterElements = Array.from(document.querySelector(`.map__filters`).children);
const filters = document.querySelector(`.map__filters`);

const filterRules = {
  'housing-type': (data, filter) => {
    return filter.value === data.offer.type;
  },
  'housing-price': (data, filter) => {
    return data.offer.price >= priceMap[filter.value].start && data.offer.price < priceMap[filter.value].end;
  },
  'housing-rooms': (data, filter) => {
    return filter.value === data.offer.rooms.toString();
  },
  'housing-guests': (data, filter) => {
    return filter.value === data.offer.guests.toString();
  },
  'housing-features': (data, filter) => {
    const checkListElements = Array.from(filter.querySelectorAll(`input[type=checkbox]:checked`));
    return checkListElements.every((item) => {
      return data.offer.features.some((feature) => {
        return feature === item.value;
      });
    });
  }
};

const filterData = (data) => {
  let adverts = [];
  let result;
  for (let i = 0; i < data.length; i++) {
    if (adverts.length === PINS_MAX) {
      break;
    }

    result = filterElements.every((filter) => {
      return (filter.value === `any`) ? true : filterRules[filter.id](data[i], filter);
    });
    if (result) {
      adverts.push(data[i]);
    }
  }
  return adverts;
};

const deactivateFilters = () => {
  filters.reset();
};

deactivateFilters();

const onFilterChange = window.debounce(() => {
  window.pin.remove();
  window.card.remove();
  window.pin.render(filterData(window.map.offers()));
});

window.filter = {
  PINS_MAX,
  form: filters,
  onFilterChange,
  deactivate: deactivateFilters
};
