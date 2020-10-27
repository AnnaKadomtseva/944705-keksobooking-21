// 'use strict';

// (function () {
//   const PINS_MAX = 5;
//   const priceMap = {
//     'low': {
//       start: 0,
//       end: 10000
//     },
//     'middle': {
//       start: 10000,
//       end: 50000
//     },
//     'high': {
//       start: 50000,
//       end: Infinity
//     }
//   };

//   const filterElements = Array.from(document.querySelector('.map__filters').children);

//   const filterRules = {
//     'housing-type': function (data, filter) {
//       return filter.value === data.offer.type;
//     },
//     'housing-price': function (data, filter) {
//       return data.offer.price >= priceMap[filter.value].start && data.offer.price < priceMap[filter.value].end;
//     },
//     'housing-rooms': function (data, filter) {
//       return filter.value === data.offer.rooms.toString();
//     },
//     'housing-guests': function (data, filter) {
//       return filter.value === data.offer.guests.toString();
//     },
//     'housing-features': function (data, filter) {
//       const checkListElements = Array.from(filter.querySelectorAll('input[type=checkbox]:checked'));
//       return checkListElements.every(function (item) {
//         return data.offer.features.some(function (feature) {
//           return feature === item.value;
//         });
//       });
//     }
//   };

//   const filterData = function (data) {
//     const adverts = [];
//     for (let i = 0; i < data.length; i++) {
//       if (adverts.length <= PINS_MAX) {
//         //
//         adverts.push(data[i]);
//       } else {
//         return adverts;
//       }
//     }
//   };

//   window.filter = {
//     filterData: filterData
//   };
// })();
