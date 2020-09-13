import { gql } from '@apollo/client';

const DELETE_TAG_MUTATION = gql`
  mutation($tag: String!, $componentId: String!, $componentType: String!) {
    deleteTag(
      tag: $tag
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

export default DELETE_TAG_MUTATION;
