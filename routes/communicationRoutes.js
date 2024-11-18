// communication/routes/communicationRoutes.js
const express = require('express');
const { sendOTPToPhone, verifyAndDeleteOTP, deleteOTPForPhone } = require('../controllers/twilioController');

const router = express.Router();

router.post('/otp/sms/send', sendOTPToPhone);
router.post('/otp/sms/verify', verifyAndDeleteOTP);
router.delete('/otp/sms/delete', deleteOTPForPhone);

// test

router.delete('/otp/sms/delete', (req, res, next) => {
    console.log('Received DELETE request to /otp/sms/delete');
    next();
  }, deleteOTPForPhone);

// exports
module.exports = router;