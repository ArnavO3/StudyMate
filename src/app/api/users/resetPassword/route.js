import bcrypt from "bcryptjs";
import User from "../../../models/Users"; // Ensure this path is correct
import { connectToDatabase } from "../../../lib/mongodb"; // Connect to your database

export async function POST(req) {
  try {
    const { token, password } = await req.json(); // Parse the JSON request body
    console.log("password->" + password);

    // Connect to the database
    await connectToDatabase();

    // Find the user with the matching reset token
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }, // Ensure the token hasn't expired
    });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Invalid or expired token" }),
        { status: 400 }
      );
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("new pwd-->" + hashedPassword);
    

    // Update the user's password and clear the reset token and expiration
    user.pswd = hashedPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    return new Response(
      JSON.stringify({ success: true, message: "Password reset successful" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Server error:", error);
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      { status: 500 }
    );
  }
}
