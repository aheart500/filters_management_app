import { gql } from "apollo-server-express";

export default gql`
  type Absence {
    id: ID!
    late_days: Int
    total_days: Int
    absence_days: Int
    month: Int
    year: Int
    notes: String
    price: Float
    worker: Worker
    workerId: ID
  }
  extend type Query {
    absence(offset: ID, search: String): [Absence!]!
  }
  extend type Mutation {
    addAbsence(
      late_days: Int
      total_days: Int
      absence_days: Int
      month: Int
      year: Int
      notes: String
      price: Float
      workerId: ID!
    ): Absence
    updateAbsence(
      id: ID!
      late_days: Int
      total_days: Int
      absence_days: Int
      month: Int
      year: Int
      notes: String
      price: Float
      workerId: ID!
    ): String
    deleteAbsence(id: ID!): String
  }
`;
