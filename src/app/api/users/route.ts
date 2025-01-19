import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI || "";

export async function POST(request: Request) {
  try {
    const { email, id } = await request.json();

    if (!email && !id) {
      return NextResponse.json(
        { error: "Email or ID must be provided" },
        { status: 400 }
      );
    }

    const client = await MongoClient.connect(uri);
    const coll = client.db("test").collection("users");

    // Build the query based on provided email or ID
    const query = email
      ? { email }
      : { _id: new ObjectId(id) }; // Use ObjectId for MongoDB `_id` field

    const user = await coll.findOne(query);
    await client.close();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user); // Return the user object as JSON
  } catch (error) {
    console.error("Error fetching user:", error);
    return NextResponse.json(
      { error: "Failed to fetch user from database" },
      { status: 500 }
    );
  }
}
