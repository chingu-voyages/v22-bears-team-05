import { gql } from '@apollo/client';

const CREATE_GOAL_MUTATION = gql`
  mutation($goalName: String!) {
    createGoal(goalName: $goalName) {
      _id
      name
      tasks {
        _id
        name
        subtasks {
          _id
          name
          description
        }
      }
    }
  }
`;

export default CREATE_GOAL_MUTATION;
