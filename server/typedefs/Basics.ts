import { gql } from "apollo-server-express";

export default gql`
  type Basics {
    id: ID!
    month: Int
    year: Int
    notes: String
    price: Float
    worker: Worker
    workerId: ID
  }
  extend type Query {
    basics(offset: ID, search: String): [Basics!]!
  }
  extend type Mutation {
    addBasics(
      month: Int
      year: Int
      notes: String
      price: Float
      workerId: ID!
    ): Basics
    updateBasics(
      id: ID!
      month: Int
      year: Int
      notes: String
      price: Float
      workerId: ID!
    ): String
    deleteBasics(id: ID!): String
  }
`;
