import { gql } from '@apollo/client';

const CREATE_TASK_MUTATION = gql`
  mutation($taskName: String!, $goalId: String!) {
    createTask(taskName: $taskName, goalId: $goalId) {
      _id
      parent {
        _id
      }
      name
      totalTimeInSeconds
      isCompleted
      subtasks {
        _id
        name
        description
      }
    }
  }
`;

export default CREATE_TASK_MUTATION;
