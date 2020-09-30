import { gql } from "apollo-server-express";

export default gql`
  type Worker {
    id: ID!
    name: String
    phone: String
    address: String
    hire_date: String
    marital_status: String
  }
  extend type Query {
    workers(offset: ID, search: String): [Worker!]!
  }
  extend type Mutation {
    worker(id: ID!): Worker
    addWorker(
      name: String!
      phone: String
      address: String
      hire_date: String
      marital_status: String
    ): Worker
    updateWorker(
      id: ID!
      name: String
      phone: String
      address: String
      hire_date: String
      marital_status: String
    ): String
    deleteWorker(id: ID!): String
  }
`;
