// communication/controllers/twilioController.js
const twilio = require('twilio')
// const otpCodes = {} // Store OTP codes in memory (use a database in production)
const { createOTP,verifyOTP, deleteOTP } = require('../models/otpModel');

// Access environment variables
const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER

// Initialize Twilio client
const client = twilio(twilioAccountSid, twilioAuthToken)

// Function to send OTP via SMS
exports.sendOTPToPhone = async (req, res) => {
  try {
    const { phone } = req.body;

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log('Generated OTP:', otp);

 // Create a new OTP record in the database
 const otpId = await createOTP(phone, otp);
 console.log('OTP ID:', otpId);

    // Send OTP via SMS using Twilio
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: twilioPhoneNumber,
      to: phone,
    });

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

// Function to verify and delete OTP for a user
exports.verifyAndDeleteOTP = async (req, res) => {
  try {
    const { phone, otp } = req.body;
    console.log('Request body:', req.body);

    // Verify OTP code
    console.log('Phone:', phone);
    console.log('OTP Code:', otp);
    const isOTPValid = await verifyOTP(req.body);
    if (!isOTPValid) {
      return res.status(400).json({ error: 'Invalid OTP code' });
    }

    // Delay before deleting the OTP (e.g., 5 seconds)
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Delete the OTP record from the database
    const isOTPDeleted = await deleteOTP(phone, otp);

    if (!isOTPDeleted) {
      return res.status(500).json({ error: 'Failed to delete OTP' });
    }

    res.status(200).json({ message: 'OTP verified and deleted successfully' });
  } catch (err) {
    console.error('Error verifying and deleting OTP:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};