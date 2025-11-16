import React, { useContext, useState } from "react";
import userContext from "../../../Context/Usercontext";
import axios from "axios";

const OTPVerification = ({ mobileNumber, onVerified, onBack }) => {
  const { user, setUser, setHostVerified } = useContext(userContext);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setError("");

    if (!otp || otp.length !== 4) {
      setError("Please enter a valid 4-digit OTP");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/api/host/verify-otp", {
        userId: user._id,
        token: user.token,
        otp,
      });

      if (response.status === 200) {
        setSuccess(true);
        // Update user context with verified status
        localStorage.setItem("hostVerified", "true");
        setHostVerified(true);
        
        // Update user data with new role
        const updatedUser = {
          ...user,
          role: "admin",
          hostVerified: true,
        };
        localStorage.setItem("userInfo", JSON.stringify(updatedUser));
        setUser(updatedUser);

        // Wait a moment before calling onVerified
        setTimeout(() => {
          onVerified();
        }, 1500);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "OTP verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-50 via-white to-blue-50 px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-green-600 mb-2">Verified!</h1>
          <p className="text-gray-600 mb-6">Your host account has been verified successfully.</p>
          <p className="text-sm text-gray-500">Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-50 via-white to-blue-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-purple-200">
        <h1 className="text-3xl font-bold text-center mb-2 text-purple-600">
          Verify OTP
        </h1>
        <p className="text-center text-gray-600 mb-2">
          Enter the OTP sent to
        </p>
        <p className="text-center text-gray-800 font-semibold mb-6">
          {mobileNumber}
        </p>

        <form onSubmit={handleVerifyOTP} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Enter OTP (4 digits)
            </label>
            <input
              type="text"
              placeholder="0000"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 4))}
              maxLength="4"
              className="w-full px-4 py-3 text-center text-2xl border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-600 transition tracking-widest"
              required
              autoFocus
            />
            <p className="text-xs text-gray-500 mt-2 text-center">
              (For testing: use OTP <strong>1234</strong>)
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            type="button"
            onClick={onBack}
            className="w-full mt-4 text-purple-600 font-semibold py-2 rounded-lg border-2 border-purple-600 hover:bg-purple-50 transition"
          >
            Back
          </button>
        </form>

        <p className="text-center text-gray-600 text-xs mt-6">
          Didn't receive OTP? Check your phone or try again in a moment.
        </p>
      </div>
    </div>
  );
};

export default OTPVerification;
