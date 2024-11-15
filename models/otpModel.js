// models/otpModel.js
const connection = require('../config/db');

const createOTP = (phone, otp) => {
  const query = 'INSERT INTO otp_codes (phone, otp) VALUES (?, ?)';
  return new Promise((resolve, reject) => {
    connection.query(query, [phone, otp], (err, result) => {
      if (err) {
        console.error('Error creating OTP:', err);
        reject(err);
        return;
      }
      console.log('OTP created successfully:', result.insertId);
      resolve(result.insertId);
    });
  });
};
const verifyOTP = (data) => {
  const { phone, otp } = data;
  const query = 'SELECT * FROM otp_codes WHERE phone = ? AND otp = ?';
  return new Promise((resolve, reject) => {
    connection.query(query, [phone, otp], (err, results) => {
      if (err) {
        console.error('Error verifying OTP:', err);
        reject(err);
        return;
      }
      resolve(results.length > 0);
    });
  });
};

const deleteOTP = (phone, otp) => {
  const query = 'DELETE FROM otp_codes WHERE phone = ? AND otp = ?';
  return new Promise((resolve, reject) => {
    connection.query(query, [phone, otp], (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result.affectedRows > 0);
    });
  });
};

module.exports = { createOTP, verifyOTP, deleteOTP };