import { MongoClient, ObjectId } from "mongodb";

// Replace with your MongoDB connection string
const uri = process.env.MONGODB_URI || '';
const client = new MongoClient(uri);

// Fetch all cards from the database
export async function fetchAllCards() {
  try {
    await client.connect();
    const database = client.db(process.env.MONGODB_DB); // Replace with your database name
    const collection = database.collection("cards"); // Replace with your collection name

    // Fetch all documents from the cards collection
    const cards = await collection.find({}).toArray();

    return cards; // Return the list of cards
  } catch (error) {
    console.error("Error fetching all cards:", error);
    throw new Error("Failed to fetch cards from database");
  } finally {
    await client.close();
  }
}

// Fetch cards associated with a specific user by email
export async function fetchUserCards(userEmail: any) {
  try {
    await client.connect();
    const database = client.db("your_database_name"); // Replace with your database name
    const usersCollection = database.collection("users"); // Replace with your users collection name
    const cardsCollection = database.collection("cards"); // Replace with your cards collection name

    // Find the user by email
    const user = await usersCollection.findOne({ email: userEmail });
    if (!user) {
      throw new Error("User not found");
    }

    // Fetch the user's cards using their card references
    const userCards = await cardsCollection
      .find({ _id: { $in: user.cards.map((cardId: any) => new ObjectId(cardId)) } })
      .toArray();

    return userCards; // Return the list of user's cards
  } catch (error) {
    console.error("Error fetching user cards:", error);
    throw new Error("Failed to fetch user cards from database");
  } finally {
    await client.close();
  }
}

