"use server"
// import { NextResponse } from 'next/server';
import { connectToDatabase } from "../../lib/mongodb";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../../models/Users";

export async function POST(req) {
  await connectToDatabase();
  const { email, pswd } = await req.json();

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        {
          status: 400,
        }
      );
    }

    const isMatch = await bcrypt.compare(pswd, user.pswd);
    if (!isMatch) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        {
          status: 400,
        }
      );
    }

    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    return new Response(
      JSON.stringify({ message: "Login successful", token }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Server error", details: error }),
      {
        status: 500,
      }
    );
  }
}
