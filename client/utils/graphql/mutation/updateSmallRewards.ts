import { gql } from '@apollo/client';

const UPDATE_SMALL_REWARDS_MUTATION = gql`
  mutation($smallRewards: [String]!) {
    updateSmallRewards(smallRewards: $smallRewards) {
      id
      smallRewards
    }
  }
`;

export default UPDATE_SMALL_REWARDS_MUTATION;
