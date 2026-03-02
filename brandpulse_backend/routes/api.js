const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const AuthController = require('../controllers/authenticationController')
router.get('/test', mainController.mainController);

//Authentication and Signup
router.post('/authUser', AuthController.authUser);
router.post('/signup', AuthController.signup);

module.exports = router;