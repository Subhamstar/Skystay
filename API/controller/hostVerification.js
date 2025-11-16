const User = require("../models/user");
const jwt = require("jsonwebtoken");

const jwtSecret = "l209385023jksdbnfkq039oans8925oadkjnf2389";

// Send OTP for host verification
module.exports.sendVerificationOTP = async (req, res) => {
  const { mobileNumber, aadharNumber, userId, token } = req.body;

  try {
    // Verify token and get user
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Store mobile and aadhar details
    user.mobileNumber = mobileNumber;
    user.aadharNumber = aadharNumber;

    // Generate dummy OTP (always 1234 for testing)
    const otp = "1234";
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes validity

    user.verificationOTP = otp;
    user.otpExpiry = otpExpiry;

    await user.save();

    // In production, send OTP via SMS. For now, return success
    res.status(200).json({
      message: "OTP sent successfully",
      // For testing: return OTP
      otp: otp,
      mobileNumber: mobileNumber.slice(-4), // Last 4 digits for UI display
    });
  } catch (error) {
    console.log("Error in sendVerificationOTP:", error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// Verify OTP and complete host verification
module.exports.verifyOTP = async (req, res) => {
  const { userId, token, otp } = req.body;

  try {
    // Verify token
    const decoded = jwt.verify(token, jwtSecret);
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if OTP is valid
    if (user.verificationOTP !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check if OTP has expired
    if (new Date() > user.otpExpiry) {
      return res.status(400).json({ message: "OTP has expired" });
    }

    // Mark user as verified and set role to admin
    user.hostVerified = true;
    user.role = "admin";
    user.verificationOTP = null;
    user.otpExpiry = null;

    await user.save();

    res.status(200).json({
      message: "Host verification successful",
      hostVerified: true,
      role: user.role,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        mobileNumber: user.mobileNumber,
        aadharNumber: user.aadharNumber,
        hostVerified: user.hostVerified,
      },
    });
  } catch (error) {
    console.log("Error in verifyOTP:", error);
    res.status(500).json({ message: "Failed to verify OTP" });
  }
};
