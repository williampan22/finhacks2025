import mongoose, { Schema, Document } from 'mongoose';

interface IExchangeRate extends Document {
  baseCurrency: string;
  rates: { [key: string]: number };
  lastUpdated: Date;
}

const ExchangeRateSchema = new Schema<IExchangeRate>({
  baseCurrency: { type: String, required: true },
  rates: { type: Map, of: Number, required: true },
  lastUpdated: { type: Date, required: true },
});

export default mongoose.models.ExchangeRate || mongoose.model<IExchangeRate>('ExchangeRate', ExchangeRateSchema);
