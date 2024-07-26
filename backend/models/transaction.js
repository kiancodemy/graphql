import mongoose from "mongoose";
const transactionSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  description: { type: String },
  paymentType: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  location: { type: String },
  date: { type: String, required: true },
});

// Define the transaction model
export const Transaction = mongoose.model("Transaction", transactionSchema);
