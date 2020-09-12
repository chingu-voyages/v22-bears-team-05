import { gql } from '@apollo/client';

const CREATE_SUBTASK_MUTATION = gql`
  mutation(
    $subtaskName: String!
    $subtaskDescription: String
    $taskId: String!
  ) {
    createSubtask(
      subtaskName: $subtaskName
      subtaskDescription: $subtaskDescription
      taskId: $taskId
    ) {
      _id
      subtasks {
        _id
        name
        description
        totalTimeInSeconds
        isCompleted
      }
    }
  }
`;

export default CREATE_SUBTASK_MUTATION;
