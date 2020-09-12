import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import styled from 'styled-components';
import {
  UPDATE_LARGE_REWARDS_MUTATION,
  UPDATE_MEDIUM_REWARDS_MUTATION,
  UPDATE_SMALL_REWARDS_MUTATION,
} from '../../utils/graphql/mutation';
import {
  UPDATE_LARGE_REWARDS_VARIABLES,
  UPDATE_MEDIUM_REWARDS_VARIABLES,
  UPDATE_SMALL_REWARDS_VARIABLES,
} from '../../utils/graphql/variables';
import { useCheckIfAuth } from '../../utils/useCheckIfAuth';
import Spinner from '../Spinner';
import Modal from '../Utilities/Modal';

interface IProps {
  rewards: string[];
  tableSize: 'Small' | 'Medium' | 'Large';
  description: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0.5em auto 1.75em;
`;

const ModalText = styled.p`
  text-align: center;
  font-size: 1.5rem;
`;

const Form = styled.form`
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
`;

const SetRewards: React.FC<IProps> = ({ rewards, tableSize, description }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [rewardOne, setRewardOne] = useState<string>(
    rewards[0] ? rewards[0] : '',
  );
  const [rewardTwo, setRewardTwo] = useState<string>(
    rewards[1] ? rewards[1] : '',
  );
  const [rewardThree, setRewardThree] = useState<string>(
    rewards[2] ? rewards[2] : '',
  );
  const [error, setError] = useState<Error | null>(null);
  const [updateSmallRewards] = useMutation(UPDATE_SMALL_REWARDS_MUTATION);
  const [updateMediumRewards] = useMutation(UPDATE_MEDIUM_REWARDS_MUTATION);
  const [updateLargeRewards] = useMutation(UPDATE_LARGE_REWARDS_MUTATION);
  const maxCharLength = 30;
  const maxCharLengthError = `The max length is ${maxCharLength} characters.`;

  useCheckIfAuth(error);

  const handleRewardOne = (e: React.ChangeEvent<any>) => {
    e.persist();
    if (e.target.value.length <= maxCharLength) {
      setRewardOne(e.target.value);
      setErrorMessage('');
    } else setErrorMessage(maxCharLengthError);
  };
  const handleRewardTwo = (e: React.ChangeEvent<any>) => {
    e.persist();
    if (e.target.value.length <= maxCharLength) {
      setRewardTwo(e.target.value);
      setErrorMessage('');
    } else setErrorMessage(maxCharLengthError);
  };
  const handleRewardThree = (e: React.ChangeEvent<any>) => {
    e.persist();
    if (e.target.value.length <= maxCharLength) {
      setRewardThree(e.target.value);
      setErrorMessage('');
    } else setErrorMessage(maxCharLengthError);
  };

  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    setIsLoading(true);
    const updatedRewards = [rewardOne, rewardTwo, rewardThree].filter(
      (reward) =>
        reward !== undefined && reward.trim().length > 0 && reward.length <= 30,
    );
    try {
      if (tableSize === 'Small') {
        await updateSmallRewards({
          variables: UPDATE_SMALL_REWARDS_VARIABLES({
            smallRewards: updatedRewards,
          }),
        });
      } else if (tableSize === 'Medium') {
        await updateMediumRewards({
          variables: UPDATE_MEDIUM_REWARDS_VARIABLES({
            mediumRewards: updatedRewards,
          }),
        });
      } else if (tableSize === 'Large') {
        await updateLargeRewards({
          variables: UPDATE_LARGE_REWARDS_VARIABLES({
            largeRewards: updatedRewards,
          }),
        });
      }
      setIsOpen(true);
    } catch (err) {
      setError(err);
      setErrorMessage(/\s\S*\s(.*)/.exec(err.message)[1]);
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Container>
        <h2>{`${tableSize} Reward Table`}</h2>
        <p>{description}</p>
        <Form onSubmit={handleSubmit}>
          <Container>
            <label htmlFor="rewardOne">
              Reward One
              <input
                type="text"
                id="rewardOne"
                name="rewardOne"
                onChange={handleRewardOne}
                value={rewardOne}
                disabled={isLoading}
              />
            </label>
            <label htmlFor="rewardTwo">
              Reward Two
              <input
                type="text"
                id="rewardTwo"
                name="rewardTwp"
                onChange={handleRewardTwo}
                value={rewardTwo}
                disabled={isLoading}
              />
            </label>
            <label htmlFor="rewardThree">
              Reward Three
              <input
                type="text"
                id="rewardThree"
                name="rewardThree"
                onChange={handleRewardThree}
                value={rewardThree}
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
      </Container>
      <Modal title="Updated" isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalText>Saved successfully!</ModalText>
      </Modal>
    </>
  );
};

export default SetRewards;
