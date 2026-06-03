const jwt = require("jsonwebtoken");

// In-memory OTP storage to avoid writing OTPs to MongoDB (completely stateless database-wise)
const otpStore = new Map();

// create OTP
async function createOTP(req, res) {
  try {
    const { emailOrPhone } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    console.log(`[LOGIN OTP for ${emailOrPhone}]: ${otp}`);
    
    // Save to local memory map (valid for 10 minutes)
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

// verify and login otp
async function verifyOTPAndLogin(req, res) {
  try {
    const { emailOrPhone, otp } = req.body;
    
    const record = otpStore.get(emailOrPhone);
    if (!record || record.otp !== otp || record.expiresAt < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }
    
    // Clear OTP after verify
    otpStore.delete(emailOrPhone);
    
    // Create a mock user object representing the user (without DB dependency)
    const user = { emailOrPhone };

    // Sign jwt token with emailOrPhone instead of database ObjectId
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