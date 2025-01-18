import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  cards?: [];
}

const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cards: [{ type: Schema.ObjectId, ref: "CardModel" }],
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
