import { gql, useApolloClient } from '@apollo/client';
import React, { useState } from 'react';
import styled from 'styled-components';
import { rewardSize } from '../Goals/GoalList';
import SetRewards from './SetRewards';

interface IProps {
  originalSmallRewards: string[];
  originalMediumRewards: string[];
  originalLargeRewards: string[];
}

const TabContainer = styled.div`
  display: flex;
  margin: 0.5em auto 1.75em;
  max-width: 90%;
`;

const TabButton = styled.button`
  &:not(:last-child) {
    margin-right: 15px;
  }
  padding: 0.5em 0.75em;
  height: unset;
  background-color: #eee;
  border: 1px solid #aaa;
  font-weight: 600;
  color: black;

  &:hover {
    border: 1px solid #666;
  }

  @media only screen and (max-width: 500px) {
    font-size: 1rem;
    &:not(:last-child) {
      margin-right: 5px;
    }
  }
`;

const MyRewards: React.FC<IProps> = ({
  originalSmallRewards,
  originalMediumRewards,
  originalLargeRewards,
}) => {
  const client = useApolloClient();
  const [smallRewardsTable, setSmallRewardsTable] = useState<string[]>(
    originalSmallRewards,
  );
  const [mediumRewardsTable, setMediumRewardsTable] = useState<string[]>(
    originalMediumRewards,
  );
  const [largeRewardsTable, setLargeRewardsTable] = useState<string[]>(
    originalLargeRewards,
  );

  const [currentRewardTable, setCurrentRewardTable] = useState<
    'small' | 'medium' | 'large'
  >('small');

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

  const handleSmallRewardBtn = () => {
    setSmallRewardsTable(getRewardTable(rewardSize.small));
    setCurrentRewardTable('small');
  };
  const handleMediumRewardBtn = () => {
    setMediumRewardsTable(getRewardTable(rewardSize.medium));
    setCurrentRewardTable('medium');
  };
  const handleLargeRewardBtn = () => {
    setLargeRewardsTable(getRewardTable(rewardSize.large));
    setCurrentRewardTable('large');
  };

  return (
    <>
      <TabContainer>
        <TabButton onClick={handleSmallRewardBtn}>Small</TabButton>
        <TabButton onClick={handleMediumRewardBtn}>Medium</TabButton>
        <TabButton onClick={handleLargeRewardBtn}>Large</TabButton>
      </TabContainer>
      {currentRewardTable === 'small' ? (
        <SetRewards
          rewards={smallRewardsTable}
          tableSize="Small"
          description="A random small reward is earned each time you complete an action item. Empty reward slots are ignored. It's recommended that they can be enjoyed in a 5 minute time period. Feel free to replace them with whatever motivates you!"
        />
      ) : null}
      {currentRewardTable === 'medium' ? (
        <SetRewards
          rewards={mediumRewardsTable}
          tableSize="Medium"
          description="A randomly chosen medium reward is earned each time you complete a task. It's recommended that they take 1-3 hours to fully enjoy.
          Make sure to reward yourself with things you really want!"
        />
      ) : null}
      {currentRewardTable === 'large' ? (
        <SetRewards
          rewards={largeRewardsTable}
          tableSize="Large"
          description="A random large reward is granted each time you fully complete a goal. It's recommended that they last for 1-7 days.
          Make it something incredible so you make it all the way through!"
        />
      ) : null}
    </>
  );
};

export default MyRewards;
