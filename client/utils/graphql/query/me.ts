import { gql } from '@apollo/client';

const ME_QUERY = gql`
  query me {
    me {
      id
      email
      smallRewards
      mediumRewards
      largeRewards
    }
  }
`;

export default ME_QUERY;
