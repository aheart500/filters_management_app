import { gql } from "apollo-server-express";

export default gql`
  type Order {
    id: ID!
    day: String
    month: String
    year: Int
    installments: [Installment!]!
    workerId: ID
    worker: Worker
    notes: String
    city: String
  }

  extend type Query {
    orders(offset: ID, search: String): [Order!]!
  }
  extend type Mutation {
    addOrder(
      day: String
      month: String
      year: Int
      notes: String
      workerId: ID!
    ): Order
    updateOrder(
      id: ID!
      day: String
      month: String
      year: Int
      notes: String
      workerId: ID!
    ): String
    deleteOrder(id: ID!): String
  }
`;
