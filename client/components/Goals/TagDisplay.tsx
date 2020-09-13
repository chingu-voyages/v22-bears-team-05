import { useMutation } from '@apollo/client';
import React, { FunctionComponent, useState } from 'react';
import { FaRegPlusSquare } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';
import { ADD_TAG_MUTATION } from '../../utils/graphql/mutation';
import { ADD_TAG_VARIABLES } from '../../utils/graphql/variables';
import { useCheckIfAuth } from '../../utils/useCheckIfAuth';
import Spinner from '../Spinner';
import Modal from '../Utilities/Modal';

interface IProps {
  componentId: string;
  componentType: 'goal' | 'task' | 'subtask';
  tags: string[];
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const Container = styled.div<{ isGoal: boolean }>`
  display: flex;
  flex-wrap: wrap;
  width: ${({ isGoal }) => (isGoal ? '95%' : '100%')};
  margin: ${({ isGoal }) => (isGoal ? '0 auto' : '0.5em auto 0')};
  align-items: center;

  @media only screen and (max-width: 600px) {
    width: ${({ isGoal }) => (isGoal ? '90%' : '100%')};
  }
`;

const Tag = styled.button`
  background-color: var(--color-blue);
  width: unset;
  height: unset;
  font-weight: 400;
  font-size: 0.85rem;
  margin: 0.25em 0;
  padding: 0.3em 1em;
  &:not(:last-child) {
    margin-right: 10px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  cursor: pointer;
`;

const Form = styled.form`
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
`;

const TagDisplay: FunctionComponent<IProps> = ({
  componentId,
  componentType,
  tags,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tagList, setTagList] = useState(tags);
  const [createTag] = useMutation(ADD_TAG_MUTATION);
  const maxNameLength = 35;
  const maxCharLengthError = `The max length is ${maxNameLength} characters.`;

  useCheckIfAuth(error);

  const toggleForm = () => {
    setShowModal(!showModal);
    setNewTagName('');
    setErrorMessage('');
  };

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    e.persist();
    if (e.target.value.trim().length === 0) {
      setNewTagName(e.target.value);
      setErrorMessage('The name field is required.');
    } else if (e.target.value.length <= maxNameLength) {
      setNewTagName(e.target.value);
      setErrorMessage('');
    } else setErrorMessage(maxCharLengthError);
  };

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createTag({
        variables: ADD_TAG_VARIABLES({
          componentType,
          componentId,
          newTag: newTagName,
        }),
      });
      setTagList([...tags, newTagName]);
      toggleForm();
    } catch (err) {
      setError(err);
      setErrorMessage(/\s\S*\s(.*)/.exec(err.message)[1]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container isGoal={componentType === 'goal'}>
      {tagList.map((tag) => (
        <Tag key={tag}>{tag}</Tag>
      ))}
      <ButtonContainer onClick={toggleForm} title="Add a Tag">
        <FaRegPlusSquare size={20} />
      </ButtonContainer>
      <Modal isOpen={showModal} onClose={toggleForm} title="Add Tag">
        <Form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">
              Name
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleInputChange}
                value={newTagName}
                autoFocus
                disabled={isLoading}
              />
            </label>
          </div>
          <p className="error">{errorMessage}</p>
          {isLoading ? (
            <Spinner />
          ) : (
            <button type="submit" disabled={!!errorMessage}>
              Add
            </button>
          )}
        </Form>
      </Modal>
    </Container>
  );
};

export default TagDisplay;
