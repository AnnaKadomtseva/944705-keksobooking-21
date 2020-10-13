'use strict';

(function () {
  window.main = {
    getRandomItemFromArray: function (array) {
      return array[window.main.getRandomIntInclusive(0, array.length - 1)];
    },
    getRandomIntInclusive: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    shuffleArray: function (a) {
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
    }
  };
})();
