// apiRoutes.js
const express = require('express');
const recommendationController = require('../controllers/recommendationController');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/recommendations/:userId', recommendationController.getRecommendations);
router.get('/user/:userId', userController.getUserProfile);

module.exports = router;

