import { useMutation } from '@apollo/client';
import React, { FunctionComponent, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import styled from 'styled-components';
import { DELETE_TASK_MUTATION } from '../../utils/graphql/mutation';
import { DELETE_TASK_VARIABLES } from '../../utils/graphql/variables';
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

const ConfirmMessage = styled.p`
  font-size: 1.2rem;
`;

const TaskName = styled.p`
  font-weight: 700;
  margin-bottom: 50px;
  text-transform: capitalize;
`;

const Note = styled.p`
  font-size: 0.7rem;
  text-transform: uppercase;
`;

interface IProps {
  taskId: string;
  taskName: string;
}

const DeleteTaskButton: FunctionComponent<IProps> = ({ taskId, taskName }) => {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION);

  useCheckIfAuth(error);

  const toggleForm = () => {
    setShowModal(!showModal);
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await deleteTask({
        variables: DELETE_TASK_VARIABLES({ taskId }),
      });
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <ButtonContainer onClick={toggleForm}>
        <FaTrashAlt size={20} />
      </ButtonContainer>
      <Modal isOpen={showModal} onClose={toggleForm} title="Delete Task">
        <Form onSubmit={handleSubmit}>
          <ConfirmMessage>
            Are you sure you want to delete the following task?
          </ConfirmMessage>
          <TaskName>{taskName}</TaskName>
          <Note>Note: All of its Subtasks will be deleted as well.</Note>
          <p className="error">{errorMessage}</p>
          {isLoading ? <Spinner /> : <button type="submit">Delete</button>}
        </Form>
      </Modal>
    </>
  );
};

export default DeleteTaskButton;
