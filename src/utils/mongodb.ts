import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

export async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB:', mongoose.connection.name);
  } else {
    console.log('Already connected to MongoDB:', mongoose.connection.name);
  }
  return { db: mongoose.connection.db, client: mongoose.connection.getClient() };
}
