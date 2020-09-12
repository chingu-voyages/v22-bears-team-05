import { gql } from '@apollo/client';

const UPDATE_SUBTASK_MUTATION = gql`
  mutation(
    $subtaskName: String!
    $subtaskDescription: String
    $subtaskId: String!
  ) {
    updateSubtask(
      subtaskName: $subtaskName
      subtaskDescription: $subtaskDescription
      subtaskId: $subtaskId
    ) {
      _id
      name
      description
    }
  }
`;

export default UPDATE_SUBTASK_MUTATION;
