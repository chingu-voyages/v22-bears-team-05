import { gql } from '@apollo/client';

const DELETE_SUBTASK_MUTATION = gql`
  mutation($subtaskId: String!) {
    deleteSubtask(subtaskId: $subtaskId) {
      _id
      subtasks {
        _id
      }
    }
  }
`;

export default DELETE_SUBTASK_MUTATION;
