import { useMutation } from '@apollo/client';
import React, { FunctionComponent, useState } from 'react';
import { FaRegPlusSquare } from 'react-icons/fa';
import styled from 'styled-components';
import { CREATE_GOAL_MUTATION } from '../../utils/graphql/mutation';
import { GET_GOALS_QUERY } from '../../utils/graphql/query';
import { CREATE_GOAL_VARIABLES } from '../../utils/graphql/variables';
import { useCheckIfAuth } from '../../utils/useCheckIfAuth';
import Spinner from '../Spinner';
import Modal from '../Utilities/Modal';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #9bc995;
  margin: 0 0 0.5em;
  padding: 0.6em;
  border-radius: 100px;
  cursor: pointer;
  text-transform: uppercase;
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 auto 1.5em;
  max-width: 300px;
`;

const Form = styled.form`
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
`;

const NewGoalButton: FunctionComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [newGoalName, setNewGoalName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [createGoal] = useMutation(CREATE_GOAL_MUTATION);
  const maxNameLength = 30;
  const maxCharLengthError = `The max length is ${maxNameLength} characters.`;

  useCheckIfAuth(error);

  const toggleForm = () => {
    setShowModal(!showModal);
    setNewGoalName('');
    setErrorMessage('');
  };

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    e.persist();
    if (e.target.value.trim().length === 0) {
      setNewGoalName(e.target.value);
      setErrorMessage('The name field is required.');
    } else if (e.target.value.length <= maxNameLength) {
      setNewGoalName(e.target.value);
      setErrorMessage('');
    } else setErrorMessage(maxCharLengthError);
  };

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await createGoal({
        variables: CREATE_GOAL_VARIABLES({ goalName: newGoalName }),
        update: (cache, { data: newData }) => {
          const { getAllGoals } = cache.readQuery({
            query: GET_GOALS_QUERY,
          });
          cache.writeQuery({
            query: GET_GOALS_QUERY,
            data: {
              getAllGoals: [...getAllGoals, newData.createGoal],
            },
          });
        },
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
      <ButtonContainer onClick={toggleForm}>
        Add Goal &nbsp;
        <FaRegPlusSquare size={20} />
      </ButtonContainer>
      <Modal isOpen={showModal} onClose={toggleForm} title="Add Goal">
        <Form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">
              Name
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleInputChange}
                value={newGoalName}
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

export default NewGoalButton;
