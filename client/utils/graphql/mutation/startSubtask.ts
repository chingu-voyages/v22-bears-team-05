import { gql } from '@apollo/client';

const START_SUBTASK_MUTATION = gql`
  mutation($subtaskId: String!) {
    startSubtask(subtaskId: $subtaskId) {
      _id
      timeStarted
      totalTimeInSeconds
    }
  }
`;

export default START_SUBTASK_MUTATION;
