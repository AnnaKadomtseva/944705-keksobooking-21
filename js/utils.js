'use strict';

const Keys = {
  ENTER: `Enter`,
  ESC: `Escape`,
  LEFT_MOUSE_BUTTON: 0
};

const isEnterEvent = (evt, action) => {
  if (evt.key === Keys.ENTER) {
    action();
  }
};

const isMouseButtonEvent = (evt, action) => {
  if (evt.button === Keys.LEFT_MOUSE_BUTTON) {
    action();
  }
};

const isEscEvent = (evt, action) => {
  if (evt.key === Keys.ESC) {
    action();
  }
};

window.utils = {
  pressEnter: isEnterEvent,
  pressMouseButton: isMouseButtonEvent,
  pressEsc: isEscEvent
};
