import { useMutation } from '@apollo/client';
import React, { FunctionComponent, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import styled from 'styled-components';
import { DELETE_GOAL_MUTATION } from '../../utils/graphql/mutation';
import { GET_GOALS_QUERY } from '../../utils/graphql/query';
import { DELETE_GOAL_VARIABLES } from '../../utils/graphql/variables';
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
  goalId: string;
  name: string;
}

const DeleteGoalButton: FunctionComponent<IProps> = ({ goalId, name }) => {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [deleteGoal] = useMutation(DELETE_GOAL_MUTATION);

  useCheckIfAuth(error);

  const toggleForm = () => {
    setShowModal(!showModal);
    setErrorMessage('');
  };

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await deleteGoal({
        variables: DELETE_GOAL_VARIABLES({ goalId }),
        update: (cache) => {
          const { getAllGoals } = cache.readQuery({
            query: GET_GOALS_QUERY,
          });

          cache.writeQuery({
            query: GET_GOALS_QUERY,
            data: {
              getAllGoals: getAllGoals.filter(({ _id }) => _id !== goalId),
            },
          });
        },
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
      <Modal isOpen={showModal} onClose={toggleForm} title="Delete Goal">
        <Form onSubmit={handleSubmit}>
          <ConfirmMessage>
            Are you sure you want to delete the following goal?
          </ConfirmMessage>
          <GoalName>{name}</GoalName>
          <Note>
            Note: All of its Tasks and Subtasks will be deleted as well.
          </Note>
          <p className="error">{errorMessage}</p>
          {isLoading ? <Spinner /> : <button type="submit">Delete Goal</button>}
        </Form>
      </Modal>
    </>
  );
};

export default DeleteGoalButton;
