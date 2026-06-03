import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createOtpApi, verifyOtpApi } from "../services/productApi";

//email , otp in one
const RightArea = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    setError("");
    try {
      const data = await createOtpApi(email);
      if (data && data.otp) {
        console.log("OTP for login:", data.otp);
      }
      setShowOtp(true);
    } catch (err) {
      setError(err.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    if (e) e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length < 6) {
      setOtpError("Please enter a 6-digit OTP");
      return;
    }
    setOtpError("");
    setLoading(true);
    try {
      const data = await verifyOtpApi(email, otpValue);
      // save token and user info
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/home");
    } catch (err) {
      setOtpError(err.message || "Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setLoading(true);
    setOtpError("");
    try {
      const data = await createOtpApi(email);
      if (data && data.otp) {
        console.log("Resent OTP:", data.otp);
      }
      alert("OTP resent successfully!");
    } catch (err) {
      setOtpError(err.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-1 flex-col justify-center items-center px-16 py-12 gap-50">
      <div className="w-full max-w-md">
        <h1 className="mb-12 text-center text-2xl font-bold text-gray-900">
          Login to your Productr Account
        </h1>

        {!showOtp ? (
          <>
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Email or Phone number
                </label>

                <input
                  type="text"
                  placeholder="Enter email or phone number"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3"
                  disabled={loading}
                />
                {error && (
                  <p className="mt-2 text-sm text-red-500">{error}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full cursor-pointer rounded-lg bg-blue-900 py-3 font-semibold text-white disabled:opacity-50"
              >
                {loading ? "Sending..." : "Login"}
              </button>
            </form>
          </>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div>
              <label className="mb-3 block text-sm text-gray-700">
                Enter OTP
              </label>

              <div className="flex gap-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target.value, index)}
                    className="h-12 w-12 rounded-md border text-center text-lg font-semibold outline-none"
                    disabled={loading}
                  />
                ))}
              </div>

              {otpError && (
                <p className="mt-2 text-sm text-red-500">{otpError}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full cursor-pointer rounded-lg bg-blue-900 py-3 font-semibold text-white hover:bg-blue-800 transition-colors disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Enter your OTP"}
            </button>

            <p className="mt-4 text-center text-sm text-gray-500">
              Didn't receive OTP?{" "}
              <span
                onClick={handleResend}
                className="cursor-pointer font-semibold text-blue-700 hover:underline"
              >
                Resend
              </span>
            </p>
          </form>
        )}
      </div>

      <div className="w-full max-w-md h-[110px]">
        {!showOtp && (
          <div className="border bg-white border-gray-300 rounded-lg p-6 text-center">
            <p className="text-gray-600 text-sm">
              Don't have a Productr Account
            </p>

            <a href="#" className="font-semibold text-blue-600 hover:text-blue-700">
              SignUp Here
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default RightArea;
