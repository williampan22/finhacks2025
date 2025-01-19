import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI || "";

export async function POST(request: Request) {
  try {
    const { userId, cardId } = await request.json();

    if (!userId || !cardId) {
      return NextResponse.json(
        { error: "User ID and Card ID must be provided" },
        { status: 400 }
      );
    }

    const client = await MongoClient.connect(uri);
    const db = client.db("test"); // Replace with your database name
    const usersCollection = db.collection("users");

    // Remove the card from the user's cards array
    const result = await usersCollection.updateOne(
      { _id: userId },
      { $pull: { cards: cardId } } // `$pull` removes the specified cardId
    );

    await client.close();

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Credit card removed successfully" });
  } catch (error) {
    console.error("Error removing credit card:", error);
    return NextResponse.json(
      { error: "Failed to remove credit card from user" },
      { status: 500 }
    );
  }
}

