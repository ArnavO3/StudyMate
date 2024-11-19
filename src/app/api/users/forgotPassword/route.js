import crypto from "crypto";
import nodemailer from "nodemailer";
import User from "../../../models/Users"; // Ensure this path is correct
import { connectToDatabase } from "../../../lib/mongodb"; // Ensure this path is correct

export async function POST(req) {
  try {
    const { email } = await req.json(); // Parse the request body (async for streams)

    // Connect to the database
    await connectToDatabase();

    // Check if the email exists
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ message: "Email not found" }),
        { status: 404 }
      );
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Set the token and its expiration in the user's record
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
    await user.save();

    // Send the reset email
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL, // Your email address
        pass: process.env.EMAIL_PASSWORD, // Your email password
      },
    });

    const resetUrl = `${process.env.CLIENT_URL}/resetPassword/${resetToken}`;

    await transporter.sendMail({
      to: user.email,
      from: process.env.EMAIL,
      subject: "Password Reset Request",
      html: `
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link will expire in 1 hour.</p>
      `,
    });

    return new Response(
      JSON.stringify({ message: "Password reset email sent" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      { status: 500 }
    );
  }
}
