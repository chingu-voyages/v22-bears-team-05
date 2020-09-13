import { gql } from '@apollo/client';

const UPDATE_LARGE_REWARDS_MUTATION = gql`
  mutation($largeRewards: [String]!) {
    updateLargeRewards(largeRewards: $largeRewards) {
      id
      largeRewards
    }
  }
`;

export default UPDATE_LARGE_REWARDS_MUTATION;
