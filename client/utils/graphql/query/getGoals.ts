import { gql } from '@apollo/client';

export const GET_GOALS_QUERY = gql`
  query GetGoals {
    getAllGoals {
      _id
      name
      isCompleted
      totalTimeInSeconds
      tasks {
        _id
        name
        isCompleted
        subtasks {
          _id
          name
          isCompleted
        }
      }
    }
  }
`;

export default GET_GOALS_QUERY;
