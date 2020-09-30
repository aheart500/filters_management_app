import { gql } from "@apollo/client";
const BASICS_FRAGMENT = gql`
  fragment basicsFragment on Basics {
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

export const GET_BASICS = gql`
  query basics($offset: ID, $search: String) {
    basics(offset: $offset, search: $search) {
      ...basicsFragment
    }
  }
  ${BASICS_FRAGMENT}
`;

export const UPDATE_BASICS = gql`
  mutation updateBasics(
    $id: ID!
    $month: Int
    $year: Int
    $notes: String
    $price: Float
    $workerId: ID!
  ) {
    updateBasics(
      id: $id
      month: $month
      year: $year
      notes: $notes
      price: $price
      workerId: $workerId
    )
  }
`;
export const ADD_BASICS = gql`
  mutation addBasics(
    $month: Int
    $year: Int
    $notes: String
    $price: Float
    $workerId: ID!
  ) {
    addBasics(
      month: $month
      year: $year
      notes: $notes
      price: $price
      workerId: $workerId
    ) {
      ...basicsFragment
    }
  }
  ${BASICS_FRAGMENT}
`;

export const DELETE_BASICS = gql`
  mutation delete($id: ID!) {
    deleteBasics(id: $id)
  }
`;
