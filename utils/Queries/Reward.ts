import { gql } from "@apollo/client";
const REWARD_FRAGMENT = gql`
  fragment rewardFragment on Reward {
    workerId
    worker {
      id
      name
    }
    id
    month
    year
    price
    notes
  }
`;

export const GET_REWARDS = gql`
  query rewards($offset: ID, $search: String) {
    rewards(offset: $offset, search: $search) {
      ...rewardFragment
    }
  }
  ${REWARD_FRAGMENT}
`;

export const UPDATE_REWARD = gql`
  mutation updateReward(
    $id: ID!
    $month: Int
    $year: Int
    $notes: String
    $price: Float
    $workerId: ID!
  ) {
    updateReward(
      id: $id
      month: $month
      year: $year
      notes: $notes
      price: $price
      workerId: $workerId
    )
  }
`;
export const ADD_REWARD = gql`
  mutation addReward(
    $month: Int
    $year: Int
    $notes: String
    $price: Float
    $workerId: ID!
  ) {
    addReward(
      month: $month
      year: $year
      notes: $notes
      price: $price
      workerId: $workerId
    ) {
      ...rewardFragment
    }
  }
  ${REWARD_FRAGMENT}
`;

export const DELETE_REWARD = gql`
  mutation delete($id: ID!) {
    deleteReward(id: $id)
  }
`;
