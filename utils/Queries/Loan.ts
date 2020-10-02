import { gql } from "@apollo/client";
const LOAN_FRAFMENT = gql`
  fragment loanFragment on Loan {
    id
    workerId
    worker {
      id
      name
    }
    month
    year
    price
    paid
    notes
  }
`;

export const GET_LOANS = gql`
  query loans($offset: ID, $search: String) {
    loans(offset: $offset, search: $search) {
      ...loanFragment
    }
  }
  ${LOAN_FRAFMENT}
`;

export const UPDATE_LOAN = gql`
  mutation update(
    $id: ID!
    $month: Int
    $year: Int
    $notes: String
    $price: Float
    $paid: Float
    $workerId: ID!
  ) {
    updateLoan(
      id: $id
      month: $month
      year: $year
      notes: $notes
      paid: $paid
      price: $price
      workerId: $workerId
    )
  }
`;
export const ADD_LOAN = gql`
  mutation add(
    $month: Int
    $year: Int
    $notes: String
    $price: Float
    $paid: Float
    $workerId: ID!
  ) {
    addLoan(
      month: $month
      year: $year
      notes: $notes
      paid: $paid
      price: $price
      workerId: $workerId
    ) {
      ...loanFragment
    }
  }
  ${LOAN_FRAFMENT}
`;

export const DELETE_LOAN = gql`
  mutation delete($id: ID!) {
    deleteLoan(id: $id)
  }
`;
