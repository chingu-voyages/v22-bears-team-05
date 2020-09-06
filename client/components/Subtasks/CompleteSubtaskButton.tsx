import { useMutation } from '@apollo/client';
import React, { FunctionComponent, useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import styled from 'styled-components';
import { COMPLETE_SUBTASK_MUTATION } from '../../utils/graphql/mutation';
import { COMPLETE_SUBTASK_VARIABLES } from '../../utils/graphql/variables';
import { useCheckIfAuth } from '../../utils/useCheckIfAuth';
import Spinner from '../Spinner';

const ButtonContainer = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  background-color: #ccc;
  padding: 0.6em;
  margin-top: 0.75em;
  border-radius: 100px;
  width: 48%;
  &:hover {
    opacity: 0.8;
  }
`;

interface IProps {
  subtaskId: string;
}

const CompleteSubtaskButton: FunctionComponent<IProps> = ({ subtaskId }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [completeSubtask] = useMutation(COMPLETE_SUBTASK_MUTATION);

  useCheckIfAuth(error);

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await completeSubtask({
        variables: COMPLETE_SUBTASK_VARIABLES({ subtaskId }),
      });
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <ButtonContainer onClick={handleSubmit}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            Complete&nbsp;
            <FaCheck size={20} />
          </>
        )}
      </ButtonContainer>
    </>
  );
};

export default CompleteSubtaskButton;
