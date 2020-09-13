import { gql } from '@apollo/client';

const UPDATE_MEDIUM_REWARDS_MUTATION = gql`
  mutation($mediumRewards: [String]!) {
    updateMediumRewards(mediumRewards: $mediumRewards) {
      id
      mediumRewards
    }
  }
`;

export default UPDATE_MEDIUM_REWARDS_MUTATION;
