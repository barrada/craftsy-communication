// communication/routes/communicationRoutes.js
const express = require('express');
const { sendOTPToPhone, verifyAndDeleteOTP, deleteOTPForPhone } = require('../controllers/twilioController');

const router = express.Router();

router.post('/otp/sms/send', sendOTPToPhone);
router.post('/otp/sms/verify', verifyAndDeleteOTP);
router.delete('/otp/sms/delete', deleteOTPForPhone);

// test


// exports
module.exports = router;