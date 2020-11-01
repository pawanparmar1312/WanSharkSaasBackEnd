const express = require('express');
const razorpayController = require('../controllers/razorpayController');
const authController = require('../controllers/authController');

const router = express.Router();
router.post('/payment',authController.protect, razorpayController.checkoutSession);
 router.post('/payment-info',authController.protect, razorpayController.paymentInfo);
 router.get('/payment-details/:id',authController.protect, razorpayController.paymentDetails);
 router.get('/payment-details/:id/:planNo',authController.protect, razorpayController.paymentDetails1);
module.exports = router;