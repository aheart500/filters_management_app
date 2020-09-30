import { gql } from "apollo-server-express";

export default gql`
  type Borrow {
    id: ID!
    month: Int
    year: Int
    notes: String
    price: Float
    worker: Worker
    workerId: ID
  }
  extend type Query {
    borrows(offset: ID, search: String): [Borrow!]!
  }
  extend type Mutation {
    addBorrow(
      month: Int
      year: Int
      notes: String
      price: Float
      workerId: ID!
    ): Borrow
    updateBorrow(
      id: ID!
      month: Int
      year: Int
      notes: String
      price: Float
      workerId: ID!
    ): String
    deleteBorrow(id: ID!): String
  }
`;
