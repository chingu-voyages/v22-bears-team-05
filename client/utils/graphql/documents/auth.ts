import { gql } from '@apollo/client';

const MeDocument = gql`
  query AuthData {
    user {
      email
      id
    }
  }
`;

export default MeDocument;
