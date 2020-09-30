import { gql } from "@apollo/client";
const ABSENCE_FRAGMENT = gql`
  fragment absenceFragment on Absence {
    id
    workerId
    worker {
      id
      name
    }
    absence_days
    late_days
    total_days
    month
    year
    notes
    price
  }
`;

export const GET_ABSENCES = gql`
  query absence($offset: ID, $search: String) {
    absence(offset: $offset, search: $search) {
      ...absenceFragment
    }
  }
  ${ABSENCE_FRAGMENT}
`;

export const UPDATE_ABSENCE = gql`
  mutation updateAbsence(
    $id: ID!
    $late_days: Int
    $total_days: Int
    $absence_days: Int
    $month: Int
    $year: Int
    $notes: String
    $price: Float
    $workerId: ID!
  ) {
    updateAbsence(
      id: $id
      late_days: $late_days
      total_days: $total_days
      absence_days: $absence_days
      month: $month
      year: $year
      notes: $notes
      price: $price
      workerId: $workerId
    )
  }
`;
export const ADD_ABSENCE = gql`
  mutation addAbsence(
    $late_days: Int
    $total_days: Int
    $absence_days: Int
    $month: Int
    $year: Int
    $notes: String
    $price: Float
    $workerId: ID!
  ) {
    addAbsence(
      late_days: $late_days
      total_days: $total_days
      absence_days: $absence_days
      month: $month
      year: $year
      notes: $notes
      price: $price
      workerId: $workerId
    ) {
      ...absenceFragment
    }
  }
  ${ABSENCE_FRAGMENT}
`;

export const DELETE_ABSENCE = gql`
  mutation delete($id: ID!) {
    deleteAbsence(id: $id)
  }
`;
