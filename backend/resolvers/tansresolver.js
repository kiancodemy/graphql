import { Transaction } from "../models/transaction.js";
export const transresolvers = {
  Query: {
    getTransactions: async (_, args, contextValue) => {
      try {
        return await Transaction.find({ userId: args.id });
      } catch (error) {
        throw new Error("Error fetching transactions");
      }
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
    addTransaction: async (_, { input }, contextValue) => {
      try {
        await contextValue.verfiy();

        const create = await Transaction.create(input);

        return create;
      } catch (err) {
        throw new Error(err.message);
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
