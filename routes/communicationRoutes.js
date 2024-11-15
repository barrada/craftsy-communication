// communication/routes/communicationRoutes.js
const express = require('express');
const { sendOTPToPhone, verifyAndDeleteOTP } = require('../controllers/twilioController');

const router = express.Router();

router.post('/otp/sms/send', sendOTPToPhone);
router.post('/otp/sms/verify', verifyAndDeleteOTP);

module.exports = router;