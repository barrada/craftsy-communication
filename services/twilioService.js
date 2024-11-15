const twilio = require('twilio');

// Replace with your Twilio Account SID and Auth Token
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

// Function to send an OTP code via SMS
async function sendOTP(phone, otp) {
  try {
    const message = await client.messages.create({
      body: `Your OTP code is: ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio phone number
      to: phone,
    });
    console.log(`OTP sent to ${phone}: ${message.sid}`);
  } catch (err) {
    console.error('Error sending OTP:', err);
  }
}

module.exports = { sendOTP };