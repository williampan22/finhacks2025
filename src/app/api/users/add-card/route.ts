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
    const cardsCollection = db.collection("cards");

    // Check if the credit card exists in the cards collection
    const cardExists = await cardsCollection.findOne({ _id: new ObjectId(cardId) });
    if (!cardExists) {
      await client.close();
      return NextResponse.json({ error: "Credit card not found" }, { status: 404 });
    }

    // Update the user's credit cards if the card is not already in the list
    const result = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      { $addToSet: { cards: new ObjectId(cardId) } } // `$addToSet` ensures no duplicates
    );

    await client.close();

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Credit card added successfully" });
  } catch (error) {
    console.error("Error adding credit card:", error);
    return NextResponse.json(
      { error: "Failed to add credit card to user" },
      { status: 500 }
    );
  }
}

