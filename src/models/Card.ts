import mongoose from "mongoose";

const cardSchema = new mongoose.Schema(
  {
    bank: String,
    name: String,
    annualFee: Number,
    rewards: [
      {
        category: String,
        pointsPerDollar: Number,
        centsPerDollar: Number,
      },
    ],
    perks: String,
    link: String,
    imageLink: String
  },
  { collection: "cards" }
);

export default cardSchema;
