import { useMutation } from '@apollo/client';
import React, { FunctionComponent, useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import styled from 'styled-components';
import { UPDATE_SUBTASK_MUTATION } from '../../utils/graphql/mutation';
import { UPDATE_SUBTASK_VARIABLES } from '../../utils/graphql/variables';
import { useCheckIfAuth } from '../../utils/useCheckIfAuth';
import Spinner from '../Spinner';
import Modal from '../Utilities/Modal';

interface IProps {
  subtaskId: string;
  oldSubtaskName: string;
  oldSubtaskDescription: string;
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

const UpdateSubtaskButton: FunctionComponent<IProps> = ({
  subtaskId,
  oldSubtaskName,
  oldSubtaskDescription,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [subtaskName, setSubtaskName] = useState(oldSubtaskName);
  const [subtaskDescription, setSubtaskDescription] = useState(
    oldSubtaskDescription || '',
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [updateSubtask] = useMutation(UPDATE_SUBTASK_MUTATION);
  const maxNameLength = 30;
  const maxCharLengthError = `The max length is ${maxNameLength} characters.`;
  const maxDescriptionLength = 200;
  const maxDescriptionLengthError = `The max length is ${maxDescriptionLength} characters.`;

  useCheckIfAuth(error);

  const toggleForm = () => {
    setShowModal(!showModal);
    setErrorMessage('');
  };

  const handleNameChange = (e: React.ChangeEvent<any>) => {
    e.persist();
    if (e.target.value.trim().length === 0) {
      setSubtaskName(e.target.value);
      setErrorMessage('The name field is required.');
    } else if (e.target.value.length <= maxNameLength) {
      setSubtaskName(e.target.value);
      setErrorMessage('');
    } else setErrorMessage(maxCharLengthError);
  };

  const handleDescriptionChange = (e: React.ChangeEvent<any>) => {
    e.persist();
    if (e.target.value.length <= maxDescriptionLength) {
      setSubtaskDescription(e.target.value);
      setErrorMessage('');
    } else setErrorMessage(maxDescriptionLengthError);
  };

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await updateSubtask({
        variables: UPDATE_SUBTASK_VARIABLES({
          subtaskId,
          subtaskName,
          subtaskDescription,
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
      <ButtonContainer onClick={toggleForm} title="Update Action Item">
        <FaEdit size={20} />
      </ButtonContainer>
      <Modal isOpen={showModal} onClose={toggleForm} title="Update Action Item">
        <Form onSubmit={handleSubmit}>
          <Container>
            <label htmlFor="name">
              Name
              <input
                type="text"
                id="name"
                name="name"
                onChange={handleNameChange}
                value={subtaskName}
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
                value={subtaskDescription}
                disabled={isLoading}
              />
            </label>
          </Container>
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

export default UpdateSubtaskButton;
