import { useMutation } from '@apollo/client';
import React, { FunctionComponent, useState } from 'react';
import { FaPlay } from 'react-icons/fa';
import styled from 'styled-components';
import { START_SUBTASK_MUTATION } from '../../utils/graphql/mutation';
import { START_SUBTASK_VARIABLES } from '../../utils/graphql/variables';
import { useCheckIfAuth } from '../../utils/useCheckIfAuth';
import Spinner from '../Spinner';

const ButtonContainer = styled.div`
  cursor: pointer;
  margin-left: 10px;
`;

interface IProps {
  subtaskId: string;
  handleSetTimePassed: () => void;
}

const StartSubtaskButton: FunctionComponent<IProps> = ({
  subtaskId,
  handleSetTimePassed,
}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [startSubtask] = useMutation(START_SUBTASK_MUTATION);

  useCheckIfAuth(error);

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await startSubtask({
        variables: START_SUBTASK_VARIABLES({ subtaskId }),
      });
      handleSetTimePassed();
    } catch (err) {
      setError(err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <ButtonContainer onClick={handleSubmit} title="Start Subtask">
        {isLoading ? <Spinner small /> : <FaPlay size={20} />}
      </ButtonContainer>
    </>
  );
};

export default StartSubtaskButton;
