import { gql } from "apollo-server-express";

export default gql`
  type Loan {
    id: ID!
    month: Int
    year: Int
    notes: String
    price: Float
    paid: Float
    worker: Worker
    workerId: ID
  }
  extend type Query {
    loans(offset: ID, search: String): [Loan!]!
  }
  extend type Mutation {
    addLoan(
      month: Int
      year: Int
      notes: String
      price: Float
      paid: Float
      workerId: ID!
    ): Loan
    updateLoan(
      id: ID!
      month: Int
      year: Int
      notes: String
      price: Float
      paid: Float
      workerId: ID!
    ): String
    deleteLoan(id: ID!): String
  }
`;
