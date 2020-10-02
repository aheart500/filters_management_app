import { gql } from "@apollo/client";
const ORDER_FRAGMENT = gql`
  fragment orderFragment on Order {
    id
    workerId
    worker {
      id
      name
    }
    city
    day
    month
    year
    installments {
      id
    }
    notes
  }
`;

export const GET_ORDERS = gql`
  query orders($offset: ID, $search: String) {
    orders(offset: $offset, search: $search) {
      ...orderFragment
    }
  }
  ${ORDER_FRAGMENT}
`;

export const UPDATE_ORDER = gql`
  mutation update(
    $id: ID!
    $day: String
    $month: String
    $year: Int
    $notes: String
    $workerId: ID!
  ) {
    updateOrder(
      id: $id
      month: $month
      year: $year
      notes: $notes
      day: $day
      workerId: $workerId
    )
  }
`;
export const ADD_ORDER = gql`
  mutation add(
    $day: String
    $month: String
    $year: Int
    $notes: String
    $workerId: ID!
  ) {
    addOrder(
      month: $month
      year: $year
      notes: $notes
      day: $day
      workerId: $workerId
    ) {
      id
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation delete($id: ID!) {
    deleteOrder(id: $id)
  }
`;
