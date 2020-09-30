import { gql } from "@apollo/client";
const CUSTOMERFRAGMENT = gql`
  fragment CUSTOMERFRAGMENT on Customer {
    id
    name
    phone
    city
    state
    address
    payment_type
    load_date
    installment_price
    forward_payment
    total_price
    installments_number
    notes
    m1Id
    m1 {
      name
    }
    m2Id
    m2 {
      name
    }
    m3Id
    m3 {
      name
    }
    f1Id
    f1 {
      name
    }
    f2Id
    f2 {
      name
    }
    f3Id

    f3 {
      name
    }
  }
`;

export const GET_CUSTOMERS = gql`
  query get($offset: ID, $search: String) {
    customers(offset: $offset, search: $search) {
      ...CUSTOMERFRAGMENT
    }
  }
  ${CUSTOMERFRAGMENT}
`;

export const UPDATE_CUSTOMER = gql`
  mutation update(
    $id: ID!
    $name: String
    $phone: String
    $city: String
    $state: String
    $address: String
    $payment_type: String
    $load_date: String
    $installment_price: Float
    $forward_payment: Float
    $total_price: Float
    $installments_number: Int
    $notes: String
    $m1Id: ID
    $m2Id: ID
    $m3Id: ID
    $f1Id: ID
    $f2Id: ID
    $f3Id: ID
  ) {
    updateCustomer(
      id: $id
      name: $name
      phone: $phone
      city: $city
      state: $state
      address: $address
      payment_type: $payment_type
      load_date: $load_date
      installment_price: $installment_price
      forward_payment: $forward_payment
      total_price: $total_price
      installments_number: $installments_number
      notes: $notes
      m1Id: $m1Id
      m2Id: $m2Id
      m3Id: $m3Id
      f1Id: $f1Id
      f2Id: $f2Id
      f3Id: $f3Id
    )
  }
`;
export const ADD_CUSTOMER = gql`
  mutation addCustomer(
    $name: String!
    $phone: String
    $city: String
    $state: String
    $address: String
    $payment_type: String
    $load_date: String
    $installment_price: Float
    $forward_payment: Float
    $total_price: Float
    $installments_number: Int
    $notes: String
    $m1Id: ID
    $m2Id: ID
    $m3Id: ID
    $f1Id: ID
    $f2Id: ID
    $f3Id: ID
  ) {
    addCustomer(
      name: $name
      phone: $phone
      city: $city
      state: $state
      address: $address
      payment_type: $payment_type
      load_date: $load_date
      installment_price: $installment_price
      forward_payment: $forward_payment
      total_price: $total_price
      installments_number: $installments_number
      notes: $notes
      m1Id: $m1Id
      m2Id: $m2Id
      m3Id: $m3Id
      f1Id: $f1Id
      f2Id: $f2Id
      f3Id: $f3Id
    ) {
      ...CUSTOMERFRAGMENT
    }
  }
  ${CUSTOMERFRAGMENT}
`;

export const DELETE_CUSTOMER = gql`
  mutation delete($id: ID!) {
    deleteCustomer(id: $id)
  }
`;