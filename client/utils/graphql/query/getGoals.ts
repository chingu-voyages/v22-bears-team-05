import { gql } from '@apollo/client';

export const GET_GOALS_QUERY = gql`
  query GetGoals {
    getAllGoals {
      _id
      name
      tasks {
        _id
        name
        subtasks {
          _id
          name
        }
      }
    }
  }
`;

export default GET_GOALS_QUERY;
