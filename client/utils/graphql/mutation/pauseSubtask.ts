import { gql } from '@apollo/client';

const PAUSE_SUBTASK_MUTATION = gql`
  mutation($subtaskId: String!) {
    pauseSubtask(subtaskId: $subtaskId) {
      _id
      timeStarted
      totalTimeInSeconds
    }
  }
`;

export default PAUSE_SUBTASK_MUTATION;
