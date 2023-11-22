const express = require('express');
const RestaurantController = require('../controllers/restaurantController.js');
const router = express.Router();

router.get('/restaurants', RestaurantController.getAllRestaurants);
router.post('/searchRestaurants', RestaurantController.searchRestaurants);
module.exports = router;