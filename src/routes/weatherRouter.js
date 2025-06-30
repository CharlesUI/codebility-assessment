const express = require("express");

const router = express.Router();

const { getWeatherByCity, getWeatherByCoordinates } = require("../controllers/weatherController");

// USAGE OF PARAMS
router.route('/city/:cityName').get(getWeatherByCity);
// USAGE OF QUERY
router.route('/coordinates').get(getWeatherByCoordinates); // uses query params

module.exports = router