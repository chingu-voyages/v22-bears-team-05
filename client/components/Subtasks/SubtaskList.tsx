import React, { FunctionComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import { SubtaskListItem } from '.';
import { Subtask } from '../../types';
import { rewardSize } from '../Goals/GoalList';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  animation: ${fadeIn} 300ms ease-out forwards;
`;

interface IProps {
  subtasks: Subtask[];
  displayReward: (
    size: rewardSize.small | rewardSize.medium | rewardSize.large,
  ) => void;
}

const SubtaskList: FunctionComponent<IProps> = ({
  subtasks = [],
  displayReward,
}) => (
  <ListContainer>
    {subtasks
      .filter((subtask) => subtask.isCompleted === false)
      .map((subtask) => {
        const {
          _id,
          name,
          description,
          totalTimeInSeconds,
          isCompleted,
          timeStarted,
        } = subtask;
        return (
          <SubtaskListItem
            key={_id}
            subtaskId={_id}
            name={name}
            description={description}
            totalTimeInSeconds={totalTimeInSeconds}
            timeStarted={timeStarted}
            displayReward={displayReward}
          />
        );
      })}
  </ListContainer>
);

export default SubtaskList;
