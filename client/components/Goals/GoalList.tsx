import { gql, useApolloClient } from '@apollo/client';
import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { GoalListItem, NewGoalButton, PartySvg } from '.';
import { Goal } from '../../types';
import Modal from '../Utilities/Modal';

const ListContainer = styled.div<{ tooFewGoals: boolean }>`
  background-color: white;
  max-width: 100%;
  user-select: none;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: ${({ tooFewGoals }) =>
    tooFewGoals
      ? 'repeat(auto-fit, minmax(50%, 734px))'
      : 'repeat(auto-fit, minmax(400px, 1fr))'};
  @media only screen and (max-width: 550px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;

const Reward = styled.div`
  text-align: center;
  font-size: 2rem;
  font-weight: 600;
  margin-top: 1em;
`;

type GoalProps = {
  goals?: Goal[];
};

export enum rewardSize {
  small = 'small',
  medium = 'medium',
  large = 'large',
}

const GoalList: FunctionComponent<GoalProps> = ({ goals }) => {
  const [reward, setReward] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const client = useApolloClient();

  const getRewardTable = (
    size: rewardSize.small | rewardSize.medium | rewardSize.large,
  ): string[] => {
    const {
      me: { smallRewards, mediumRewards, largeRewards },
    } = client.readQuery({
      query: gql`
        query {
          me {
            smallRewards
            mediumRewards
            largeRewards
          }
        }
      `,
    });
    if (size === rewardSize.small) return smallRewards;
    if (size === rewardSize.medium) return mediumRewards;
    return largeRewards;
  };

  const chooseReward = (rewardTable: string[]): string => {
    const randomNumber = Math.floor(Math.random() * rewardTable.length);
    return rewardTable[randomNumber];
  };

  const displayReward = (
    size: rewardSize.small | rewardSize.medium | rewardSize.large,
  ) => {
    const rewardTable = getRewardTable(size);
    const chosenReward = chooseReward(rewardTable);
    setReward(chosenReward);
    setIsOpen(true);
  };

  const dismissReward = () => {
    setReward('');
    setIsOpen(false);
  };

  return (
    <>
      <NewGoalButton />
      <ListContainer tooFewGoals={goals.length < 2}>
        {goals.map((goal) => {
          const { name, tasks, _id, totalTimeInSeconds } = goal;
          return (
            <GoalListItem
              key={_id}
              name={name}
              tasks={tasks}
              goalId={_id}
              totalTimeInSeconds={totalTimeInSeconds}
              displayReward={displayReward}
            />
          );
        })}
      </ListContainer>

      <Modal title="Well Done!" isOpen={isOpen} onClose={dismissReward}>
        <PartySvg />
        <Reward>{reward}</Reward>
      </Modal>
    </>
  );
};

export default GoalList;
