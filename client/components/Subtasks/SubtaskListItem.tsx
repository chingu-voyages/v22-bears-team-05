import React, { FunctionComponent, useEffect, useState } from 'react';
import { FaCaretDown, FaCaretRight } from 'react-icons/fa';
import styled from 'styled-components';
import {
  CompleteSubtaskButton,
  DeleteSubtaskButton,
  PauseSubtaskButton,
  StartSubtaskButton,
  UpdateSubtaskButton,
} from '.';
import { TagDisplay, TimeSpent } from '../Goals';
import { rewardSize } from '../Goals/GoalList';

const Description = styled.div`
  margin-top: 1em;
  text-transform: none;
  font-size: 0.9rem;
  font-weight: 300;
`;

const ListItem = styled.div<{ started?: number }>`
  background-color: ${({ started }) =>
    started ? 'var(--color-yellow)' : '#eee'};
  width: 95%;
  border-bottom: 1px solid #ccc;
  text-transform: capitalize;
  padding: 1em;
  margin: 0 auto;
  &:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    border: none;
    margin-bottom: 1em;
  }
`;

const MainInfo = styled.div`
  display: flex;
  width: 100%;
`;

const ItemName = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  width: 100%;
  font-weight: 500;
`;

const TaskIndicator = styled.span`
  display: flex;
  align-self: center;
  margin-left: auto;
  font-size: 1.2rem;
`;

interface IProps {
  subtaskId: string;
  name: string;
  description: string;
  totalTimeInSeconds: number;
  timeStarted: number;
  tags: string[];
  displayReward: (
    size: rewardSize.small | rewardSize.medium | rewardSize.large,
  ) => void;
}

const SubtaskListItem: FunctionComponent<IProps> = ({
  subtaskId,
  name,
  description,
  totalTimeInSeconds,
  timeStarted,
  tags,
  displayReward,
}) => {
  const getStartTime = () => {
    const millisecondsInSecond = 1000;
    let startTime: number | null;
    if (timeStarted) {
      startTime =
        Math.floor((Date.now() - timeStarted) / millisecondsInSecond) +
        totalTimeInSeconds;
    } else startTime = totalTimeInSeconds;
    return startTime;
  };

  const [showDetails, setShowDetails] = useState(false);
  const [timePassed, setTimePassed] = useState(getStartTime);

  const handleSetTimePassed = () => {
    setTimePassed((prev) => totalTimeInSeconds);
  };

  const toggleShowSubtasks = () => {
    setShowDetails(!showDetails);
  };

  useEffect(() => {
    function incrementTimePassed() {
      if (timeStarted !== null) setTimePassed((prev) => prev + 1);
    }
    const interval = setInterval(incrementTimePassed, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [timeStarted]);

  return (
    <ListItem started={timeStarted}>
      <MainInfo>
        <ItemName onClick={toggleShowSubtasks}>
          {name}
          {showDetails ? <FaCaretDown size={20} /> : <FaCaretRight size={20} />}
        </ItemName>
        <TaskIndicator>
          {timeStarted ? (
            <>
              <PauseSubtaskButton subtaskId={subtaskId} />
              <CompleteSubtaskButton
                subtaskId={subtaskId}
                displayReward={displayReward}
              />
            </>
          ) : (
            <StartSubtaskButton
              subtaskId={subtaskId}
              handleSetTimePassed={handleSetTimePassed}
            />
          )}
          <UpdateSubtaskButton
            subtaskId={subtaskId}
            oldSubtaskName={name}
            oldSubtaskDescription={description}
          />
          <DeleteSubtaskButton subtaskId={subtaskId} subtaskName={name} />
        </TaskIndicator>
      </MainInfo>
      <TimeSpent totalTimeInSeconds={timePassed} paddingSmall />
      <TagDisplay tags={tags} componentType="subtask" componentId={subtaskId} />
      {showDetails ? <Description>{description}</Description> : null}
    </ListItem>
  );
};

export default SubtaskListItem;
