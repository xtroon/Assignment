const express = require("express")
const { createOTP, verifyOTPAndLogin  } = require("../controllers/auth.controller")

const router = express.Router()

router.post("/create-otp", createOTP)
router.post("/verify-otp", verifyOTPAndLogin)

module.exports = router