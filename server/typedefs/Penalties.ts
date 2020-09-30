import { gql } from "apollo-server-express";

export default gql`
  type Penalty {
    id: ID!
    days: Int
    month: Int
    year: Int
    notes: String
    price: Float
    worker: Worker
    workerId: ID
  }
  extend type Query {
    penalties(offset: ID, search: String): [Penalty!]!
  }
  extend type Mutation {
    addPenalty(
      days: Int
      month: Int
      year: Int
      notes: String
      price: Float
      workerId: ID!
    ): Penalty
    updatePenalty(
      id: ID!
      days: Int
      month: Int
      year: Int
      notes: String
      price: Float
      workerId: ID!
    ): String
    deletePenalty(id: ID!): String
  }
`;
