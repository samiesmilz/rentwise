// app/api/auth/[...nextauth]/route.js
import authOptions from "@/utils/authOptions";
import NextAuth from "next-auth/next";

const handler = NextAuth(authOptions);

export async function GET(req, res) {
  try {
    return await handler(req, res);
  } catch (error) {
    console.error("NextAuth GET error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function POST(req, res) {
  try {
    return await handler(req, res);
  } catch (error) {
    console.error("NextAuth POST error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
