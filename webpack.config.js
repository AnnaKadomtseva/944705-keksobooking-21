const path = require("path");

module.exports = {
  entry: [
    "./js/utils.js",
    "./js/backend.js",
    "./js/image.js",
    "./js/form.js",
    "./js/debounce.js",
    "./js/filter.js",
    "./js/pin.js",
    "./js/card.js",
    "./js/map.js",
    "./js/data.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
