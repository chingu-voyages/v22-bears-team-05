import { useMutation } from '@apollo/client';
import React, { FunctionComponent, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import styled from 'styled-components';
import { UPDATE_GOAL_MUTATION } from '../../utils/graphql/mutation';
import { UPDATE_GOAL_NAME_VARIABLES } from '../../utils/graphql/variables';
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
  goalId: string;
  name: string;
}

const UpdateGoalButton: FunctionComponent<IProps> = ({ goalId, name }) => {
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [newGoalName, setNewGoalName] = useState(name);
  const [error, setError] = useState<Error | null>(null);
  const [updateGoal] = useMutation(UPDATE_GOAL_MUTATION);
  const maxNameLength = 20;
  const maxCharLengthError = `The max length is ${maxNameLength} characters.`;

  useCheckIfAuth(error);

  const toggleForm = () => {
    setShowModal(!showModal);
    setErrorMessage('');
  };

  const handleInputChange = (e: React.ChangeEvent<any>) => {
    e.persist();
    if (e.target.value.length <= maxNameLength) {
      setNewGoalName(e.target.value);
      setErrorMessage('');
    } else setErrorMessage(maxCharLengthError);
  };

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateGoal({
        variables: UPDATE_GOAL_NAME_VARIABLES({ goalId, newGoalName }),
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
      <ButtonContainer onClick={toggleForm} title="Edit Goal Name">
        <FaEdit size={20} />
      </ButtonContainer>
      <Modal isOpen={showModal} onClose={toggleForm} title="Update Goal Name">
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
          {isLoading ? <Spinner /> : <button type="submit">Update</button>}
        </Form>
      </Modal>
    </>
  );
};

export default UpdateGoalButton;
