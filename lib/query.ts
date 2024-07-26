import { gql } from "@apollo/client";
export const getTransactonById = gql`
  query get($id: ID!) {
    getTransactionById(id: id) {
      _id
      userId
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;
export const getTransaction = gql`
  query {
    getTransactions {
      _id
      userId
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;
