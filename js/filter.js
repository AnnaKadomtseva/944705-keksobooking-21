'use strict';

(function () {
  const PINS_MAX = 5;

  const filter = document.querySelector('.map__filters');
  const typeSelect = filter.querySelector('#housing-type');
  let filteredData = [];
  let data = [];

  const filterSelect = function (field, item, key) {
    return field.value === 'any' ? true : field.value === item[key].toString();
  };

  const filterByType = function (item) {
    return filterSelect(typeSelect, item.offer, 'type');
  };

  const onFilterChange = function () {
    filteredData = data.slice(0);
    filteredData = filteredData.filter(filterByType);
    window.map.renderPins(filteredData.slice(0, PINS_MAX));
  };

  onFilterChange();
})();
