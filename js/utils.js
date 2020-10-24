'use strict';

(function () {
  const Keys = {
    ENTER: 'Enter',
    ESC: 'Escape',
    LEFT_MOUSE_BUTTON: 0
  };

  const isEnterEvent = function (evt, action) {
    if (evt.key === Keys.ENTER) {
      action();
    }
  };

  const isMouseButtonEvent = function (evt, action) {
    if (evt.button === Keys.LEFT_MOUSE_BUTTON) {
      action();
    }
  };

  const isEscEvent = function (evt, action) {
    if (evt.key === Keys.ESC) {
      action();
    }
  };

  window.utils = {
    isEnterEvent: isEnterEvent,
    isMouseButtonEvent: isMouseButtonEvent,
    isEscEvent: isEscEvent
  };
})();
