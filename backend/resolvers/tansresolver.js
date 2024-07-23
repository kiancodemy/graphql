import { Transaction } from "../models/transaction.js";
export const transresolvers = {
  Query: {
    getTransactions: async () => {
      try {
        return await Transaction.find();
      } catch (error) {
        throw new Error("Error fetching transactions");
      }
    },
    show: () => {
      return "kian";
    },
    getTransactionById: async (_, { id }) => {
      try {
        return await Transaction.findById(id);
      } catch (error) {
        throw new Error("Error fetching transaction");
      }
    },
  },
  Mutation: {
    addTransaction: async (_, { input }) => {
      try {
        const create = await Transaction.create(input);
        return create;
      } catch (error) {
        throw new Error("Error adding transaction");
      }
    },
    updateTransaction: async (_, { id, input }) => {
      try {
        return await Transaction.findByIdAndUpdate(id, input, { new: true });
      } catch (error) {
        throw new Error("Error updating transaction");
      }
    },
    deleteTransaction: async (_, { id }) => {
      try {
        return await Transaction.findByIdAndDelete(id);
      } catch (error) {
        throw new Error("Error deleting transaction");
      }
    },
  },
};
