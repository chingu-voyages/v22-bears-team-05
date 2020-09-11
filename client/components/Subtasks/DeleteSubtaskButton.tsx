import { useMutation } from '@apollo/client';
import React, { FunctionComponent, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import styled from 'styled-components';
import { DELETE_SUBTASK_MUTATION } from '../../utils/graphql/mutation';
import { DELETE_SUBTASK_VARIABLES } from '../../utils/graphql/variables';
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

interface IProps {
  subtaskId: string;
  subtaskName: string;
}

const DeleteSubtaskButton: FunctionComponent<IProps> = ({
  subtaskId,
  subtaskName,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [deleteSubtask] = useMutation(DELETE_SUBTASK_MUTATION);

  useCheckIfAuth(error);

  const toggleForm = () => {
    setShowModal(!showModal);
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await deleteSubtask({
        variables: DELETE_SUBTASK_VARIABLES({ subtaskId }),
      });
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <ButtonContainer onClick={toggleForm} title="Delete Action Item">
        <FaTrashAlt size={20} />
      </ButtonContainer>
      <Modal isOpen={showModal} onClose={toggleForm} title="Delete Action Item">
        <Form onSubmit={handleSubmit}>
          <ConfirmMessage>
            Are you sure you want to delete the following action item?
          </ConfirmMessage>
          <TaskName>{subtaskName}</TaskName>
          <p className="error">{errorMessage}</p>
          {isLoading ? <Spinner /> : <button type="submit">Delete</button>}
        </Form>
      </Modal>
    </>
  );
};

export default DeleteSubtaskButton;
