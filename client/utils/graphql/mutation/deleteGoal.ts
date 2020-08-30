import { gql } from '@apollo/client';

const DELETE_GOAL_MUTATION = gql`
  mutation($goalId: String!) {
    deleteGoal(goalId: $goalId) {
      deletedGoals
      deletedTasks
      deletedSubtasks
    }
  }
`;

export default DELETE_GOAL_MUTATION;
