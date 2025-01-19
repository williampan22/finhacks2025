import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "";

export async function GET() {
  try {
    const client = await MongoClient.connect(uri);
    const coll = client.db("test").collection("cards");
    const cursor = coll.find({});
    const result = await cursor.toArray();
    await client.close();

    return NextResponse.json(result); // Return all cards as JSON
  } catch (error) {
    console.error("Error fetching all cards:", error);
    return NextResponse.json(
      { error: "Failed to fetch cards from database" },
      { status: 500 }
    );
  }
}
