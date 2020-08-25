import { gql } from '@apollo/client';

const REGISTER_MUTATION = gql`
  mutation Register(
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
      email
    }
  }
`;

export default REGISTER_MUTATION;
