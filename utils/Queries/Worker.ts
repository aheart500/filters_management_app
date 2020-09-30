import { gql } from "@apollo/client";
const WorkerFragment = gql`
  fragment workerFragment on Worker {
    id
    name
    phone
    address
    hire_date
    marital_status
  }
`;

export const GET_WORKERS = gql`
  query workers($offset: ID, $search: String) {
    workers(offset: $offset, search: $search) {
      ...workerFragment
    }
  }
  ${WorkerFragment}
`;

export const UPDATE_WORKER = gql`
  mutation updateWorker(
    $id: ID!
    $name: String
    $phone: String
    $address: String
    $hire_date: String
    $marital_status: String
  ) {
    updateWorker(
      id: $id
      name: $name
      phone: $phone
      address: $address
      hire_date: $hire_date
      marital_status: $marital_status
    )
  }
`;
export const ADD_WORKER = gql`
  mutation addWorker(
    $name: String!
    $phone: String
    $address: String
    $hire_date: String
    $marital_status: String
  ) {
    addWorker(
      name: $name
      phone: $phone
      address: $address
      hire_date: $hire_date
      marital_status: $marital_status
    ) {
      ...workerFragment
    }
  }
  ${WorkerFragment}
`;

export const DELETE_WORKER = gql`
  mutation delete($id: ID!) {
    deleteWorker(id: $id)
  }
`;

export const GET_WORKER = gql`
  mutation worker($id: ID!) {
    worker(id: $id) {
      name
    }
  }
`;
