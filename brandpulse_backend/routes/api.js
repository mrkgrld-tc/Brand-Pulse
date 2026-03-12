const express = require('express');
const router = express.Router();
const mainController = require('../controllers/mainController');
const userController = require('../controllers/userController');
const analyzeController = require('../controllers/analyzeController');
//Authentication and Signup
router.post('/authUser', userController.authUser);
router.post('/signup', userController.signup);
router.post('/updateProfile', userController.updateProfile);

//Analyze Feedback
router.post('/analyzeFeedback', analyzeController.analyzeFeedback);

//Get Industries
router.post('/getIndustries', userController.getIndustries);

//test
router.get('/testt', ()=>{
    console.log('cusessss testt');
})
module.exports = router;