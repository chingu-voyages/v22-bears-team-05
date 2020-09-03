import { gql } from '@apollo/client';

const UPDATE_GOAL_MUTATION = gql`
  mutation($taskId: String!, $newTaskName: String, $isCompleted: Boolean) {
    updateTask(
      taskId: $taskId
      newTaskName: $newTaskName
      isCompleted: $isCompleted
    ) {
      _id
      tasks {
        _id
        name
        isCompleted
      }
    }
  }
`;

export default UPDATE_GOAL_MUTATION;
