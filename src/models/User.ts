import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  roles?: string[];
  address?: string;
  currentLocation?: string;
  paymentMethod?: { [key: string]: string }[];
}

const UserSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: { type: [String], default: ['requester'] },
  address: { type: String },
  currentLocation: { type: String },
  paymentMethod: { type: [Schema.Types.Mixed] },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
