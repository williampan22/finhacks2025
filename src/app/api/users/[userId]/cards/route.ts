// app/api/users/[userId]/cards/route.ts
import { NextRequest, NextResponse } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.MONGODB_URI || "";

// GET user's cards
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  let client;

  try {
    // Await the params
    const { userId } = await context.params;

    if (!userId) {
      return NextResponse.json(
        { error: "User ID must be provided" },
        { status: 400 }
      );
    }

    client = await MongoClient.connect(uri);
    const db = client.db("test");
    const usersCollection = db.collection("users");
    const cardsCollection = db.collection("cards");

    // Get user's card IDs
    const user = await usersCollection.findOne(
      { _id: new ObjectId(userId) },
      { projection: { cards: 1 } }
    );

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // If user has no cards, return empty array
    if (!user.cards || !Array.isArray(user.cards)) {
      return NextResponse.json([]);
    }

    // Convert string IDs to ObjectIds if necessary
    const cardIds = user.cards.map(id =>
      typeof id === 'string' ? new ObjectId(id) : id
    );

    // Fetch all cards that match the IDs
    const cards = await cardsCollection
      .find({ _id: { $in: cardIds } })
      .toArray();

    return NextResponse.json(cards);

  } catch (error: any) {
    console.error("Error fetching user cards:", error);
    return NextResponse.json(
      { error: "Failed to fetch user cards" },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
    }
  }
}

// DELETE a card from user's cards
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  let client;

  try {
    const { userId } = await context.params;
    const { cardId } = await request.json();

    if (!userId || !cardId) {
      return NextResponse.json(
        { error: "User ID and Card ID must be provided" },
        { status: 400 }
      );
    }

    client = await MongoClient.connect(uri);
    const db = client.db("test");
    const usersCollection = db.collection("users");

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $pull: {
          cards: new ObjectId(cardId)
        } as any
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Card removed successfully",
      updated: result.modifiedCount > 0
    });

  } catch (error: any) {
    console.error("Error removing card:", error);
    return NextResponse.json(
      { error: "Failed to remove card" },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
    }
  }
}

// POST to add a card
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ userId: string }> }
) {
  let client;

  try {
    const { userId } = await context.params;
    const { cardId } = await request.json();

    if (!userId || !cardId) {
      return NextResponse.json(
        { error: "User ID and Card ID must be provided" },
        { status: 400 }
      );
    }

    client = await MongoClient.connect(uri);
    const db = client.db("test");
    const usersCollection = db.collection("users");
    const cardsCollection = db.collection("cards");

    // Check if the card exists
    const cardExists = await cardsCollection.findOne({
      _id: new ObjectId(cardId)
    });

    if (!cardExists) {
      return NextResponse.json(
        { error: "Card not found" },
        { status: 404 }
      );
    }

    const result = await usersCollection.updateOne(
      { _id: new ObjectId(userId) },
      {
        $addToSet: {
          cards: new ObjectId(cardId)
        } as any
      }
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

  } catch (error: any) {
    console.error("Error adding card:", error);
    return NextResponse.json(
      { error: "Failed to add card" },
      { status: 500 }
    );
  } finally {
    if (client) {
      await client.close();
    }
  }
}
