import { gql } from '@apollo/client';

const CREATE_SUBTASK_MUTATION = gql`
  mutation($subtaskName: String!, $taskId: String!) {
    createSubtask(subtaskName: $subtaskName, taskId: $taskId) {
      _id
      subtasks {
        _id
        name
        description
        totalTimeInSeconds
        isCompleted
        timeStarted
        timeCompleted
      }
    }
  }
`;

export default CREATE_SUBTASK_MUTATION;
