import { gql } from "apollo-server-express";

export default gql`
  type Customer {
    id: ID!
    name: String
    phone: String
    city: String
    state: String
    address: String
    payment_type: String
    load_date: String
    installment_price: Float
    forward_payment: Float
    total_price: Float
    installments_number: Int
    notes: String
    m1Id: ID
    m2Id: ID
    m3Id: ID
    f1Id: ID
    f2Id: ID
    f3Id: ID
    m1: Worker
    m2: Worker
    m3: Worker
    f1: Worker
    f2: Worker
    f3: Worker
  }
  type Installment {
    id: ID!
    year: Int!
    month: Int!
    paid: Boolean!
    fixed: Boolean!
    customerId: ID!
    customer: Customer
    orderId: ID
  }

  extend type Query {
    customers(offset: ID, search: String): [Customer!]!
    installments(customerId: ID!): [Installment!]!
  }
  extend type Mutation {
    filteredInstallments(city: String, month: Int, year: Int): [Installment!]!
    customer(id: ID!): Customer
    updateInstallment(
      id: ID!
      fixed: Boolean
      paid: Boolean
      orderId: ID
    ): String
    updateInstallments(
      ids: [ID!]!
      fixed: Boolean
      paid: Boolean
      orderId: ID
    ): String
    addCustomer(
      name: String!
      phone: String
      city: String
      state: String
      address: String
      payment_type: String
      load_date: String
      installment_price: Float
      forward_payment: Float
      total_price: Float
      installments_number: Int
      notes: String
      m1Id: ID
      m2Id: ID
      m3Id: ID
      f1Id: ID
      f2Id: ID
      f3Id: ID
    ): Customer
    updateCustomer(
      id: ID!
      name: String
      phone: String
      city: String
      state: String
      address: String
      payment_type: String
      load_date: String
      installment_price: Float
      forward_payment: Float
      total_price: Float
      installments_number: Int
      notes: String
      m1Id: ID
      m2Id: ID
      m3Id: ID
      f1Id: ID
      f2Id: ID
      f3Id: ID
    ): String
    deleteCustomer(id: ID!): String
  }
`;
