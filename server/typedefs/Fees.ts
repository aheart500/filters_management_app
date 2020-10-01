import { gql } from "apollo-server-express";

export default gql`
  type Fee {
    id: ID!
    month: Int
    year: Int
    notes: String
    price: Float
    worker: Worker
    workerId: ID
    customer: Customer
    customerId: ID
    numberOfWorkers: Int
    workerRatio: Float
  }
  enum FeeType {
    Installing
    Selling
  }
  extend type Query {
    fees(offset: ID, type: FeeType!, search: String): [Fee!]!
  }
  extend type Mutation {
    addFee(
      type: FeeType!
      month: Int
      year: Int
      notes: String
      price: Float
      workerId: ID!
      customerId: ID!
      numberOfWorkers: Int
      workerRatio: Float
    ): Fee
    updateFee(
      id: ID!
      type: FeeType!
      month: Int
      year: Int
      notes: String
      price: Float
      workerId: ID!
      customerId: ID!
      numberOfWorkers: Int
      workerRatio: Float
    ): String
    deleteFee(type: FeeType!, id: ID!): String
  }
`;
