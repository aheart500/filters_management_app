import { gql } from "@apollo/client";
const BORROW_FRAGMENT = gql`
  fragment borrowFragment on Borrow {
    id
    workerId
    worker {
      id
      name
    }
    month
    year
    notes
    price
  }
`;

export const GET_BORROWS = gql`
  query borrows($offset: ID, $search: String) {
    borrows(offset: $offset, search: $search) {
      ...borrowFragment
    }
  }
  ${BORROW_FRAGMENT}
`;

export const UPDATE_BORROW = gql`
  mutation updateBorrow(
    $id: ID!
    $month: Int
    $year: Int
    $notes: String
    $price: Float
    $workerId: ID!
  ) {
    updateBorrow(
      id: $id
      month: $month
      year: $year
      notes: $notes
      price: $price
      workerId: $workerId
    )
  }
`;
export const ADD_BORROW = gql`
  mutation addBorrow(
    $month: Int
    $year: Int
    $notes: String
    $price: Float
    $workerId: ID!
  ) {
    addBorrow(
      month: $month
      year: $year
      notes: $notes
      price: $price
      workerId: $workerId
    ) {
      ...borrowFragment
    }
  }
  ${BORROW_FRAGMENT}
`;

export const DELETE_BORROW = gql`
  mutation delete($id: ID!) {
    deleteBorrow(id: $id)
  }
`;
