import { useMutation } from '@apollo/client';
import React, { FunctionComponent, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import styled from 'styled-components';
import { UPDATE_TASK_MUTATION } from '../../utils/graphql/mutation';
import { UPDATE_TASK_COMPLETED_VARIABLES } from '../../utils/graphql/variables';
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

const GoalName = styled.p`
  font-weight: 700;
  margin-bottom: 50px;
  text-transform: capitalize;
`;

const Note = styled.p`
  font-size: 0.7rem;
  text-transform: uppercase;
`;

interface IProps {
  taskId: String;
  name: String;
}

const CompleteTaskButton: FunctionComponent<IProps> = ({ taskId, name }) => {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [updateTask] = useMutation(UPDATE_TASK_MUTATION);

  useCheckIfAuth(error);

  const toggleForm = () => {
    setErrorMessage('');
    setShowModal(!showModal);
  };

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateTask({
        variables: UPDATE_TASK_COMPLETED_VARIABLES({
          taskId,
          isCompleted: true,
        }),
      });
      toggleForm();
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <ButtonContainer onClick={toggleForm}>
        <FaCheck size={20} />
      </ButtonContainer>
      <Modal isOpen={showModal} onClose={toggleForm} title="Complete Task">
        <Form onSubmit={handleSubmit}>
          <ConfirmMessage>Are you sure this task is completed?</ConfirmMessage>
          <GoalName>{name}</GoalName>
          <p className="error">{errorMessage}</p>
          {isLoading ? <Spinner /> : <button type="submit">Complete</button>}
        </Form>
      </Modal>
    </>
  );
};

export default CompleteTaskButton;
