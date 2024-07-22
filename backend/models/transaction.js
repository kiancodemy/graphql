import mongoose from "mongoose";
const transactionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  description: { type: String, required: true },
  paymentType: { type: String, enum: ["CASH", "CARD"], required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
});

// Define the transaction model
export const Transaction = mongoose.model("Transaction", transactionSchema);
