const User = require("../models/user.model");
const Otp = require("../models/otp.model");


// create OTP
async function createOTP(req, res) {
  try {
    const { emailOrPhone } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    console.log(otp);
    
    await Otp.create({ emailOrPhone, otp, expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 min 
    });
    
    res.status(201).json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// verify and login otp
async function verifyOTPAndLogin(req, res) {
  try {
    const { emailOrPhone, otp } = req.body;
    
    const otpRecord = await Otp.findOne({ emailOrPhone, otp });
    if (!otpRecord || otpRecord.expiresAt < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    
    const user = await User.create({ emailOrPhone });
    await Otp.deleteOne({ _id: otpRecord._id }); // deleting created otp
    
    res.status(201).json({ message: "User Logged In", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { createOTP, verifyOTPAndLogin };