const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  pswd: { type: String, required: true }, // Ensure consistent naming
  student: { type: Boolean, required: true }, // Assuming it's a boolean
  age: { type: Number, required: true }, // Assuming it's a number
  resetPasswordToken: { type: String, default: null }, // Token for password reset
  resetPasswordExpires: { type: Date, default: null }, // Expiration for the reset token
});

// Use existing model if it exists, otherwise create a new one
module.exports = mongoose.models.User || mongoose.model("User", userSchema);
