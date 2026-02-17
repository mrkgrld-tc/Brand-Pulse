const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');

router.get('/test', mainController.mainController);

module.exports = router;