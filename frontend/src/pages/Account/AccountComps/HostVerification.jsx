import React, { useContext, useState } from "react";
import userContext from "../../../Context/Usercontext";
import axios from "axios";
import OTPVerification from "./OTPVerification";

const HostVerification = ({ onVerified }) => {
  const { user, setHostVerified } = useContext(userContext);
  const [mobileNumber, setMobileNumber] = useState("");
  const [aadharNumber, setAadharNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [maskedMobile, setMaskedMobile] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!mobileNumber || mobileNumber.length !== 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    if (!aadharNumber || aadharNumber.length !== 12) {
      setError("Please enter a valid 12-digit Aadhar number");
      return;
    }

    setLoading(true);
    try {
      // Send verification data to backend
      const response = await axios.post("/api/host/verify", {
        mobileNumber,
        aadharNumber,
        userId: user._id,
        token: user.token,
      });

      if (response.status === 200) {
        // Store details temporarily in localStorage
        localStorage.setItem(
          "hostDetails",
          JSON.stringify({ mobileNumber, aadharNumber })
        );
        
        // Mask mobile for display
        const masked = `****${mobileNumber.slice(-4)}`;
        setMaskedMobile(masked);
        
        // Show OTP verification screen
        setOtpSent(true);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOTPVerified = () => {
    onVerified();
  };

  const handleBackFromOTP = () => {
    setOtpSent(false);
    setMobileNumber("");
    setAadharNumber("");
  };

  // If OTP sent, show OTP verification screen
  if (otpSent) {
    return (
      <OTPVerification
        mobileNumber={maskedMobile}
        onVerified={handleOTPVerified}
        onBack={handleBackFromOTP}
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-50 via-white to-blue-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-purple-200">
        <h1 className="text-3xl font-bold text-center mb-2 text-purple-600">
          Host Verification
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Complete your verification to list rooms and start hosting
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              placeholder="10-digit mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
              maxLength="10"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 transition"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Enter 10-digit phone number</p>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Aadhar Number
            </label>
            <input
              type="text"
              placeholder="12-digit Aadhar number"
              value={aadharNumber}
              onChange={(e) => setAadharNumber(e.target.value.replace(/\D/g, "").slice(0, 12))}
              maxLength="12"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 transition"
              required
            />
            <p className="text-xs text-gray-500 mt-1">Enter 12-digit Aadhar number</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending OTP..." : "Send OTP & Continue"}
          </button>
        </form>

        <p className="text-center text-gray-600 text-xs mt-6">
          Your information is secure and will only be used for verification purposes.
        </p>
      </div>
    </div>
  );
};

export default HostVerification;
