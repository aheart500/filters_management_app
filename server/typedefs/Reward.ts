import { gql } from "apollo-server-express";

export default gql`
  type Reward {
    id: ID!
    month: Int
    year: Int
    notes: String
    price: Float
    worker: Worker
    workerId: ID
  }
  extend type Query {
    rewards(offset: ID, search: String): [Reward!]!
  }
  extend type Mutation {
    addReward(
      month: Int
      year: Int
      notes: String
      price: Float
      workerId: ID!
    ): Reward
    updateReward(
      id: ID!
      month: Int
      year: Int
      notes: String
      price: Float
      workerId: ID!
    ): String
    deleteReward(id: ID!): String
  }
`;
