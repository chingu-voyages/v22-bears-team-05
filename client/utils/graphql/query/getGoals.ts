import { gql } from '@apollo/client';

export const GET_GOALS_QUERY = gql`
  query GetGoals {
    getAllGoals {
      _id
      name
      isCompleted
      totalTimeInSeconds
      tags
      tasks {
        _id
        name
        isCompleted
        totalTimeInSeconds
        tags
        subtasks {
          _id
          name
          description
          isCompleted
          timeStarted
          totalTimeInSeconds
          tags
        }
      }
    }
  }
`;

export default GET_GOALS_QUERY;
