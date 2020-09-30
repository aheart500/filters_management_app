import { gql } from "@apollo/client";
const PENALTY_FRAGMENT = gql`
  fragment penaltyFragment on Penalty {
    id
    workerId
    worker {
      id
      name
    }
    days
    month
    year
    notes
    price
  }
`;

export const GET_PENALTIES = gql`
  query penalties($offset: ID, $search: String) {
    penalties(offset: $offset, search: $search) {
      ...penaltyFragment
    }
  }
  ${PENALTY_FRAGMENT}
`;

export const UPDATE_PENALTY = gql`
  mutation updatePenalty(
    $id: ID!
    $days: Int
    $month: Int
    $year: Int
    $notes: String
    $price: Float
    $workerId: ID!
  ) {
    updatePenalty(
      id: $id
      days: $days
      month: $month
      year: $year
      notes: $notes
      price: $price
      workerId: $workerId
    )
  }
`;
export const ADD_PENALTY = gql`
  mutation addPenalty(
    $month: Int
    $days: Int
    $year: Int
    $notes: String
    $price: Float
    $workerId: ID!
  ) {
    addPenalty(
      month: $month
      days: $days
      year: $year
      notes: $notes
      price: $price
      workerId: $workerId
    ) {
      ...penaltyFragment
    }
  }
  ${PENALTY_FRAGMENT}
`;

export const DELETE_PENALTY = gql`
  mutation delete($id: ID!) {
    deletePenalty(id: $id)
  }
`;
