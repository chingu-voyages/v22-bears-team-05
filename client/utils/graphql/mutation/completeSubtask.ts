import { gql } from '@apollo/client';

const COMPLETE_SUBTASK_MUTATION = gql`
  mutation($subtaskId: String!) {
    completeSubtask(subtaskId: $subtaskId) {
      _id
      totalTimeInSeconds
      totalCompletedSubtasks
      tasks {
        _id
        totalTimeInSeconds
        totalCompletedSubtasks
        subtasks {
          _id
        }
      }
    }
  }
`;

export default COMPLETE_SUBTASK_MUTATION;
