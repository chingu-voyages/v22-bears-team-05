import { gql } from '@apollo/client';

const ADD_TAG_MUTATION = gql`
  mutation($newTag: String!, $componentId: String!, $componentType: String!) {
    addTag(
      newTag: $newTag
      componentId: $componentId
      componentType: $componentType
    ) {
      tagName
      componentId
      componentType
      status
    }
  }
`;

export default ADD_TAG_MUTATION;
