const jwt = require("jsonwebtoken");

// local otp map
const otpStore = new Map();

// gen rate otp
async function createOTP(req, res) {
  try {
    const { emailOrPhone } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    console.log(`[LOGIN OTP for ${emailOrPhone}]: ${otp}`);
    
    // save localy temp
    otpStore.set(emailOrPhone, {
      otp,
      expiresAt: Date.now() + 10 * 60 * 1000
    });
    
    res.status(201).json({ message: "OTP sent successfully", otp });
  } catch (err) {
    console.error("Error in createOTP:", err);
    res.status(500).json({ message: err.message });
  }
}

// chck otp auth
async function verifyOTPAndLogin(req, res) {
  try {
    const { emailOrPhone, otp } = req.body;
    
    const record = otpStore.get(emailOrPhone);
    if (!record || record.otp !== otp || record.expiresAt < Date.now()) {
      return res.status(400).json({ message: "Please enter a valid OTP" });
    }
    
    // remove otp now
    otpStore.delete(emailOrPhone);
    
    // mock usr obj
    const user = { emailOrPhone };

    // sign token jwt
    const token = jwt.sign(
      { emailOrPhone: user.emailOrPhone }, 
      process.env.SECRET_KEY || "your-secret-key"
    );

    res.status(201).json({ message: "User Logged In", token, user });
  } catch (err) {
    console.error("Error in verifyOTPAndLogin:", err);
    res.status(500).json({ message: err.message });
  }
}

module.exports = { createOTP, verifyOTPAndLogin };