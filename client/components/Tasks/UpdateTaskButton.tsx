import { useMutation } from '@apollo/client';
import React, { FunctionComponent, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import styled from 'styled-components';
import { UPDATE_TASK_MUTATION } from '../../utils/graphql/mutation';
import { UPDATE_TASK_NAME_VARIABLES } from '../../utils/graphql/variables';
import { useCheckIfAuth } from '../../utils/useCheckIfAuth';
import Spinner from '../Spinner';
import Modal from '../Utilities/Modal';

const ButtonContainer = styled.div`
  cursor: pointer;
  margin-left: 10px;
`;

const Form = styled.form`
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
`;

interface IProps {
  taskId: string;
  name: string;
}

const UpdateTaskButton: FunctionComponent<IProps> = ({ taskId, name }) => {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [newTaskName, setNewTaskName] = useState(name);
  const [error, setError] = useState<Error | null>(null);
  const [updateTask] = useMutation(UPDATE_TASK_MUTATION);
  const maxNameLength = 30;
  const maxCharLengthError = `The max length is ${maxNameLength} characters.`;

  useCheckIfAuth(error);

  const toggleForm = () => {
    setShowModal(!showModal);
    setErrorMessage('');
  };

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    e.persist();
    if (e.target.value.trim().length === 0) {
      setNewTaskName(e.target.value);
      setErrorMessage('The name field is required.');
    } else if (e.target.value.length <= maxNameLength) {
      setNewTaskName(e.target.value);
      setErrorMessage('');
    } else setErrorMessage(maxCharLengthError);
  };

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateTask({
        variables: UPDATE_TASK_NAME_VARIABLES({ taskId, newTaskName }),
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
      <ButtonContainer onClick={toggleForm} title="Edit Task Name">
        <FaEdit size={20} />
      </ButtonContainer>
      <Modal isOpen={showModal} onClose={toggleForm} title="Update Task Name">
        <Form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">
              Name
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleInputChange}
                value={newTaskName}
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
              Update
            </button>
          )}
        </Form>
      </Modal>
    </>
  );
};

export default UpdateTaskButton;
