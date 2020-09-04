import { useMutation } from '@apollo/client';
import React, { FunctionComponent, useState } from 'react';
import { FaRegPlusSquare } from 'react-icons/fa';
import styled, { keyframes } from 'styled-components';
import { CREATE_TASK_MUTATION } from '../../utils/graphql/mutation';
import { GET_GOALS_QUERY } from '../../utils/graphql/query';
import { CREATE_TASK_VARIABLES } from '../../utils/graphql/variables';
import { useCheckIfAuth } from '../../utils/useCheckIfAuth';
import Spinner from '../Spinner';
import Modal from '../Utilities/Modal';

interface IProps {
  goalId: string;
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
  justify-content: center;
  align-items: center;
  background-color: var(--color-blue);
  margin: 0 0 0.5em;
  padding: 0.6em;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 1rem;
  font-weight: 700;
  animation: ${fadeIn} 300ms ease-out forwards;
`;

const Form = styled.form`
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
`;

const NewTaskButton: FunctionComponent<IProps> = ({ goalId }) => {
  const [showModal, setShowModal] = useState(false);
  const [newTaskName, setNewTaskName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [createTask] = useMutation(CREATE_TASK_MUTATION);
  const maxNameLength = 20;
  const maxCharLengthError = `The max length is ${maxNameLength} characters.`;

  useCheckIfAuth(error);

  const toggleForm = () => {
    setShowModal(!showModal);
    setNewTaskName('');
    setErrorMessage('');
  };

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    e.persist();
    if (e.target.value.length <= maxNameLength) {
      setNewTaskName(e.target.value);
      setErrorMessage('');
    } else setErrorMessage(maxCharLengthError);
  };

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createTask({
        variables: CREATE_TASK_VARIABLES({ goalId, taskName: newTaskName }),
        update: (cache, { data: newData }) => {
          const newTask = newData.createTask;
          const goalData = cache.readQuery({
            query: GET_GOALS_QUERY,
          });
          const goalToUpdate = goalData.getAllGoals.filter(
            (goal) => goal._id === goalId,
          )[0];
          const updatedGoal = [...goalToUpdate.tasks, newTask];
          cache.writeQuery({
            query: GET_GOALS_QUERY,
            data: {
              getAllGoals: [...goalData.getAllGoals, updatedGoal],
            },
          });
        },
      });
      toggleForm();
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <ButtonContainer onClick={toggleForm}>
        Add Task &nbsp;
        <FaRegPlusSquare size={20} />
      </ButtonContainer>
      <Modal isOpen={showModal} onClose={toggleForm} title="Add Task">
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
                autoFocus={true}
                disabled={isLoading}
              />
            </label>
          </div>
          <p className="error">{errorMessage}</p>
          {isLoading ? <Spinner /> : <button type="submit">Add Task</button>}
        </Form>
      </Modal>
    </>
  );
};

export default NewTaskButton;
