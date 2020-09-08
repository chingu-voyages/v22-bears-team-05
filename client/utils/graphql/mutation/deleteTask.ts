import { gql } from '@apollo/client';

const DELETE_TASK_MUTATION = gql`
  mutation($taskId: String!) {
    deleteTask(taskId: $taskId) {
      _id
      tasks {
        _id
      }
    }
  }
`;

export default DELETE_TASK_MUTATION;
