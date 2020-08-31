import { gql } from '@apollo/client';

const UPDATE_GOAL_MUTATION = gql`
  mutation($goalId: String!, $newGoalName: String, $isCompleted: Boolean) {
    updateGoal(
      goalId: $goalId
      newGoalName: $newGoalName
      isCompleted: $isCompleted
    ) {
      _id
      name
      isCompleted
    }
  }
`;

export default UPDATE_GOAL_MUTATION;
