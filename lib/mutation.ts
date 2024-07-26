import { gql } from "@apollo/client";
export const logins = gql`
  mutation log($info: loging!) {
    login(input: $info) {
      _id
      name
      email
    }
  }
`;
export const signer = gql`
  mutation Signup($info: signing!) {
    signup(input: $info) {
      _id
    }
  }
`;

export const logout = gql`
  mutation {
    logout
  }
`;

export const addTransactions = gql`
  mutation add($input: TransactionInput!) {
    addTransaction(input: $input) {
      _id
      userId

      paymentType
      category
      amount
      location
      date
    }
  }
`;
export const updateTransaction = gql`
  mutation update($id: ID!, $input: TransactionInput!) {
    updateTransaction(id: id, input: input) {
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
export const deleteTransaction = gql`
  mutation delete($id: ID!) {
    deleteTransaction(id: id) {
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
