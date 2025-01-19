// app/api/cards/route.ts
import { NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI || "";

// GET all cards
export async function GET() {
  let client;

  try {
    client = await MongoClient.connect(uri);
    const db = client.db("test");
    const cards = await db.collection("cards").find().toArray();

    return NextResponse.json(cards);
  } catch (error) {
    console.error("Error fetching cards:", error);
    return NextResponse.json(
      { error: "Failed to fetch cards" },
      { status: 500 }
    );
  } finally {
    if (client) await client.close();
  }
}

// POST to fetch specific cards by IDs
export async function POST(request: Request) {
  let client;

  try {
    const { cardIds } = await request.json();

    if (!cardIds || !Array.isArray(cardIds)) {
      return NextResponse.json(
        { error: "Card IDs array must be provided" },
        { status: 400 }
      );
    }

    client = await MongoClient.connect(uri);
    const db = client.db("test");

    const objectIds = cardIds.map(id => new ObjectId(id));
    const cards = await db.collection("cards")
      .find({ _id: { $in: objectIds } })
      .toArray();

    return NextResponse.json(cards);
  } catch (error) {
    console.error("Error fetching specific cards:", error);
    return NextResponse.json(
      { error: "Failed to fetch specific cards" },
      { status: 500 }
    );
  } finally {
    if (client) await client.close();
  }
}