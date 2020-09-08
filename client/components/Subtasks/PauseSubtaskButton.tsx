import { useMutation } from '@apollo/client';
import React, { FunctionComponent, useState } from 'react';
import { FaPause } from 'react-icons/fa';
import styled from 'styled-components';
import { PAUSE_SUBTASK_MUTATION } from '../../utils/graphql/mutation';
import { PAUSE_SUBTASK_VARIABLES } from '../../utils/graphql/variables';
import { useCheckIfAuth } from '../../utils/useCheckIfAuth';
import Spinner from '../Spinner';

const ButtonContainer = styled.div`
  cursor: pointer;
  margin-left: 10px;
`;

interface IProps {
  subtaskId: string;
}

const PauseSubtaskButton: FunctionComponent<IProps> = ({ subtaskId }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [pauseSubtask] = useMutation(PAUSE_SUBTASK_MUTATION);

  useCheckIfAuth(error);

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await pauseSubtask({
        variables: PAUSE_SUBTASK_VARIABLES({ subtaskId }),
      });
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <ButtonContainer onClick={handleSubmit}>
        {isLoading ? <Spinner small /> : <FaPause size={20} />}
      </ButtonContainer>
    </>
  );
};

export default PauseSubtaskButton;
