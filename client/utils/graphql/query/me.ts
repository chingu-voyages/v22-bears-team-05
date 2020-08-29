import { gql } from '@apollo/client';

const ME_QUERY = gql`
  query me {
    me {
      id
      email
    }
  }
`;

export default ME_QUERY;
