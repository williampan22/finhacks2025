// app/api/users/add-card/route.ts
import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI || "";

export async function POST(request: Request) {
  let client;

  try {
    const { userId, cardId } = await request.json();

    if (!userId || !cardId) {
      return NextResponse.json(
        { error: "User ID and Card ID must be provided" },
        { status: 400 }
      );
    }

    client = await MongoClient.connect(uri);
    const db = client.db("test");

    // Convert string IDs to ObjectId
    const userObjectId = new ObjectId(userId);
    const cardObjectId = new ObjectId(cardId);

    // Verify card exists
    const cardExists = await db.collection("cards").findOne({
      _id: cardObjectId
    });

    if (!cardExists) {
      return NextResponse.json(
        { error: "Card not found" },
        { status: 404 }
      );
    }

    // Add card to user's cards array
    const result = await db.collection("users").updateOne(
      { _id: userObjectId },
      { $addToSet: { cards: cardObjectId } }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Card added successfully",
      updated: result.modifiedCount > 0
    });

  } catch (error) {
    console.error("Error adding card:", error);
    return NextResponse.json(
      { error: "Failed to add card" },
      { status: 500 }
    );
  } finally {
    if (client) await client.close();
  }
}