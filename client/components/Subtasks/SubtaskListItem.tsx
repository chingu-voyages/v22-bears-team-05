import React, { FunctionComponent, useEffect, useState } from 'react';
import { FaCaretDown, FaCaretRight } from 'react-icons/fa';
import styled from 'styled-components';
import { DeleteSubtaskButton, StartSubtaskButton } from '.';
import { TimeSpent } from '../Goals';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
  background-color: #eee;
  &:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    margin-bottom: 2em;
  }
`;

const ListItem = styled.div<{ started?: number }>`
  background-color: ${({ started }) =>
    started ? 'var(--color-yellow)' : '#fff'};
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
  padding: 0.5em 0;
  width: 100%;
  font-weight: 500;
`;

const TaskIndicator = styled.span`
  display: flex;
  align-self: center;
  margin-left: auto;
  font-size: 1.2rem;
`;

const Notifications = styled.div`
  margin: 0 10px;
  font-weight: 700;
`;

const NotificationDot = styled.div`
  position: relative;
  top: -1.5rem;
  right: -0.75rem;
  background-color: #ee6055;
  border-radius: 10rem;
  height: 10px;
  width: 10px;
`;

interface IProps {
  subtaskId: string;
  name: string;
  totalTimeInSeconds: number;
  timeStarted: number;
}

const SubtaskListItem: FunctionComponent<IProps> = ({
  subtaskId,
  name,
  totalTimeInSeconds,
  timeStarted,
}) => {
  const [showDetails, setShowDetails] = useState(false);
  const [timePassed, setTimePassed] = useState(() =>
    timeStarted ? Math.floor((Date.now() - timeStarted) / 1000) : null,
  );
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
    <ListItem onClick={toggleShowSubtasks} started={timeStarted}>
      <MainInfo>
        <ItemName>
          {name}
          {showDetails ? <FaCaretDown size={20} /> : <FaCaretRight size={20} />}
        </ItemName>
        <TaskIndicator>
          <DeleteSubtaskButton subtaskId={subtaskId} subtaskName={name} />
        </TaskIndicator>
      </MainInfo>
      {showDetails || timeStarted ? (
        <>
          {timeStarted ? (
            <TimeSpent
              totalTimeInSeconds={timePassed}
              paddingSmall
              displaySeconds
            />
          ) : (
            <StartSubtaskButton subtaskId={subtaskId} />
          )}
        </>
      ) : null}
    </ListItem>
  );
};

export default SubtaskListItem;
