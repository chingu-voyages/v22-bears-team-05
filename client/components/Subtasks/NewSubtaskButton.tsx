import { useMutation } from '@apollo/client';
import React, { FunctionComponent, useState } from 'react';
import { FaRegPlusSquare } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';
import { CREATE_SUBTASK_MUTATION } from '../../utils/graphql/mutation';
import { CREATE_SUBTASK_VARIABLES } from '../../utils/graphql/variables';
import { useCheckIfAuth } from '../../utils/useCheckIfAuth';
import Spinner from '../Spinner';
import Modal from '../Utilities/Modal';

interface IProps {
  taskId: string;
}

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
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
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [createSubtask] = useMutation(CREATE_SUBTASK_MUTATION);
  const maxNameLength = 20;
  const maxCharLengthError = `The max length is ${maxNameLength} characters.`;

  useCheckIfAuth(error);

  const toggleForm = () => {
    setShowModal(!showModal);
    setNewSubtaskName('');
    setErrorMessage('');
  };

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    e.persist();
    if (e.target.value.trim().length === 0) {
      setNewSubtaskName(e.target.value);
      setErrorMessage('The name field is required.');
    } else if (e.target.value.length <= maxNameLength) {
      setNewSubtaskName(e.target.value);
      setErrorMessage('');
    } else setErrorMessage(maxCharLengthError);
  };

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createSubtask({
        variables: CREATE_SUBTASK_VARIABLES({
          taskId,
          subtaskName: newSubtaskName,
        }),
      });
      toggleForm();
    } catch (err) {
      setError(err.message);
      if (newSubtaskName.length === 0) {
        setErrorMessage('The name field is required.');
      } else setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ButtonContainer onClick={toggleForm} title="Add a Subtask">
        <FaRegPlusSquare size={20} />
      </ButtonContainer>
      <Modal isOpen={showModal} onClose={toggleForm} title="Add Subtask">
        <Form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">
              Name
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleInputChange}
                value={newSubtaskName}
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
    </>
  );
};

export default NewSubtaskButton;
