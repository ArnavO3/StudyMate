import { connectToDatabase } from "../../lib/mongodb";
import bcrypt from "bcryptjs";
import User from "../../models/Users";

export async function POST(req) {
  await connectToDatabase();
  const { username, email, pswd, student, age } = await req.json();

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "Email already exists" }), {
        status: 409,
      });
    }

    const hashedPassword = await bcrypt.hash(pswd, 10);
    const newUser = new User({
      username,
      email,
      pswd: hashedPassword,
      student,
      age,
    });
    console.log(newUser);

    const savedUser = await newUser.save();
    return new Response(
      JSON.stringify({ message: "Signup successful", user: savedUser }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Server error", details: error }),
      { status: 500 }
    );
  }
}
