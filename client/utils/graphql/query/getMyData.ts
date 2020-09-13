import { gql } from '@apollo/client';

const GET_MY_DATA_QUERY = gql`
  query getMyData {
    getMyData {
      id
      email
      smallRewards
      mediumRewards
      largeRewards
      tags {
        tagName
        time
      }
    }
  }
`;

export default GET_MY_DATA_QUERY;
