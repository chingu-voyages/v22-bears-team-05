import { useMutation } from '@apollo/client';
import React, { FunctionComponent, useState } from 'react';
import { FaRegPlusSquare } from 'react-icons/fa';
import styled from 'styled-components';
import { CREATE_SUBTASK_MUTATION } from '../../utils/graphql/mutation';
import { CREATE_SUBTASK_VARIABLES } from '../../utils/graphql/variables';
import { useCheckIfAuth } from '../../utils/useCheckIfAuth';
import Spinner from '../Spinner';
import Modal from '../Utilities/Modal';

interface IProps {
  taskId: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  margin-left: 10px;
  cursor: pointer;
`;

const Form = styled.form`
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
`;

const NewSubtaskButton: FunctionComponent<IProps> = ({ taskId }) => {
  const [showModal, setShowModal] = useState(false);
  const [newSubtaskName, setNewSubtaskName] = useState('');
  const [newSubtaskDescription, setNewSubtaskDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [createSubtask] = useMutation(CREATE_SUBTASK_MUTATION);
  const maxNameLength = 30;
  const maxCharLengthError = `The max length is ${maxNameLength} characters.`;
  const maxDescriptionLength = 200;
  const maxDescriptionLengthError = `The max length is ${maxDescriptionLength} characters.`;

  useCheckIfAuth(error);

  const toggleForm = () => {
    setShowModal(!showModal);
    setNewSubtaskName('');
    setNewSubtaskDescription('');
    setErrorMessage('');
  };

  const handleNameChange = (e: React.ChangeEvent<any>) => {
    e.persist();
    if (e.target.value.trim().length === 0) {
      setNewSubtaskName(e.target.value);
      setErrorMessage('The name field is required.');
    } else if (e.target.value.length <= maxNameLength) {
      setNewSubtaskName(e.target.value);
      setErrorMessage('');
    } else setErrorMessage(maxCharLengthError);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<any>) => {
    e.persist();
    if (e.target.value.length <= maxDescriptionLength) {
      setNewSubtaskDescription(e.target.value);
      setErrorMessage('');
    } else setErrorMessage(maxDescriptionLengthError);
  };

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createSubtask({
        variables: CREATE_SUBTASK_VARIABLES({
          taskId,
          subtaskName: newSubtaskName,
          subtaskDescription: newSubtaskDescription,
        }),
      });
      toggleForm();
    } catch (err) {
      setError(err);
      setErrorMessage(/\s\S*\s(.*)/.exec(err.message)[1]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ButtonContainer onClick={toggleForm} title="Add an Action Item">
        <FaRegPlusSquare size={20} />
      </ButtonContainer>
      <Modal isOpen={showModal} onClose={toggleForm} title="Add Action Item">
        <Form onSubmit={handleSubmit}>
          <Container>
            <label htmlFor="name">
              Name
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleNameChange}
                value={newSubtaskName}
                autoFocus
                disabled={isLoading}
              />
            </label>
            <label htmlFor="description">
              Description
              <textarea
                rows={4}
                id="description"
                name="description"
                onChange={handleDescriptionChange}
                value={newSubtaskDescription}
                disabled={isLoading}
              />
            </label>
          </Container>
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
    </>
  );
};

export default NewSubtaskButton;
