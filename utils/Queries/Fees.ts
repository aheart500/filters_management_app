import { gql } from "@apollo/client";
const FEE_FRAGMENT = gql`
  fragment feeFragment on Fee {
    id
    workerId
    worker {
      id
      name
    }
    customerId
    customer {
      id
      name
    }
    month
    year
    notes
    price
    numberOfWorkers
    workerRatio
  }
`;

export const GET_FEES = gql`
  query fees($type: FeeType!, $offset: ID, $search: String) {
    fees(type: $type, offset: $offset, search: $search) {
      ...feeFragment
    }
  }
  ${FEE_FRAGMENT}
`;

export const UPDATE_FEE = gql`
  mutation updateFee(
    $id: ID!
    $month: Int
    $year: Int
    $notes: String
    $price: Float
    $workerId: ID!
    $customerId: ID!
    $type: FeeType!
    $numberOfWorkers: Int
    $workerRatio: Float
  ) {
    updateFee(
      id: $id
      month: $month
      year: $year
      notes: $notes
      price: $price
      workerId: $workerId
      type: $type
      customerId: $customerId
      numberOfWorkers: $numberOfWorkers
      workerRatio: $workerRatio
    )
  }
`;
export const ADD_Fee = gql`
  mutation addFee(
    $month: Int
    $year: Int
    $notes: String
    $price: Float
    $workerId: ID!
    $customerId: ID!
    $type: FeeType!
    $numberOfWorkers: Int
    $workerRatio: Float
  ) {
    addFee(
      month: $month
      year: $year
      notes: $notes
      price: $price
      workerId: $workerId
      type: $type
      customerId: $customerId
      numberOfWorkers: $numberOfWorkers
      workerRatio: $workerRatio
    ) {
      ...feeFragment
    }
  }
  ${FEE_FRAGMENT}
`;

export const DELETE_FEE = gql`
  mutation delete($type: FeeType!, $id: ID!) {
    deleteFee(id: $id, type: $type)
  }
`;
