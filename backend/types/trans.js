export const transtypeDefs = `#graphql
  type Transaction {
    _id: ID!
    userId: String!
    description: String!
    paymentType: String!
    category: String!
    amount: Float!
    location: String!
    date: String!
  }

  type Query {
    getTransactions: [Transaction]
    getTransactionById(id: ID!): Transaction
  }

  input TransactionInput {
    userId: String!
    description: String!
    paymentType: String!
    category: String!
    amount: Float!
    location: String!
    date: String!
  }

  type Mutation {
    addTransaction(input: TransactionInput!): Transaction
    updateTransaction(id: ID!, input: TransactionInput!): Transaction
    deleteTransaction(id: ID!): Transaction
  }
`;

module.exports = typeDefs;
