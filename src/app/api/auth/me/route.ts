import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { MongoClient, ObjectId } from "mongodb";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const MONGODB_URI = process.env.MONGODB_URI || "";
const client = new MongoClient(MONGODB_URI);

export async function GET(request: Request) {
  const token = request.headers.get("cookie")?.match(/token=([^;]*)/)?.[1];

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Decode the token to get user ID
    const decoded: any = jwt.verify(token, JWT_SECRET);

    // Connect to the database
    await client.connect();
    const db = client.db("test"); // Replace with your database name
    const usersCollection = db.collection("users");

    // Fetch the full user details using the ID from the token
    const user = await usersCollection.findOne({ _id: new ObjectId(decoded.id) });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Exclude sensitive fields like password
    delete user.password;

    return NextResponse.json({ user });
  } catch (error: any) {
    console.error("Error in /api/auth/me:", error.message);
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  } finally {
    await client.close();
  }
}