import jwt from "jsonwebtoken";

export async function GET(req) {
  const token = req.headers.get("authorization");

  if (!token) {
    return new Response(JSON.stringify({ message: "No token provided" }), {
      status: 403,
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return new Response(
      JSON.stringify({ message: `Welcome ${decoded.email} to the dashboard!` }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Failed to authenticate token" }),
      {
        status: 403,
      }
    );
  }
}
