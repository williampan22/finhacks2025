import mongoose, { Schema, Document } from 'mongoose';

interface IRequest extends Document {
  requester: mongoose.Types.ObjectId;
  fulfiller?: mongoose.Types.ObjectId | null;
  country: string;
  storeName: string;
  items: {
    itemName: string;
    quantity: number;
    price: number;
    link?: string;
  }[];
  completed: 'In progress' | 'Not fulfilled' | 'Fulfilled';
}

const RequestSchema = new Schema<IRequest>({
  requester: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  fulfiller: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  country: { type: String, required: true },
  storeName: { type: String, required: true },
  items: [
    {
      itemName: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      link: { type: String },
    },
  ],
  completed: { type: String, enum: ['In progress', 'Not fulfilled', 'Fulfilled'], default: 'In progress' },
});

export default mongoose.models.Request || mongoose.model<IRequest>('Request', RequestSchema);
