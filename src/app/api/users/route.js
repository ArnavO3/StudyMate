import { connectToDatabase } from "../../lib/mongodb";
import User from "../../models/Users";

export async function GET(req) {
  
  try {
    let x =await connectToDatabase();
    console.log("x is ",x)
    const users = await User.find({});
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Error fetching users", details: error }),
      {
        status: 400,
      }
    );
  }
}
