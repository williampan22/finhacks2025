import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

const uri = process.env.MONGODB_URI || "";
const client = new MongoClient(uri);

export async function POST(request: Request) {
  try {
    const { userEmail } = await request.json();
    if (!userEmail) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await client.connect();
    const db = client.db(process.env.MONGODB_DB || "test"); // Replace with your database name
    const usersCollection = db.collection("users");
    const cardsCollection = db.collection("cards");

    const user = await usersCollection.findOne({ email: userEmail });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userCards = await cardsCollection
      .find({ _id: { $in: user.cards.map((id: string) => new ObjectId(id)) } })
      .toArray();

    return NextResponse.json(userCards); // Return the user's cards
  } catch (error) {
    console.error("Error fetching user cards:", error);
    return NextResponse.json(
      { error: "Failed to fetch user cards" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
