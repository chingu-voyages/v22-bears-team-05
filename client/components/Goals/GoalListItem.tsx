import React, { FunctionComponent, useState } from 'react';
import { FaCaretDown, FaCaretRight } from 'react-icons/fa';
import styled from 'styled-components';
import {
  CompleteGoalButton,
  DeleteGoalButton,
  TimeSpent,
  UpdateGoalButton,
} from '.';
import { Task } from '../../types';
import { NewTaskButton, TaskList } from '../Tasks';
import { rewardSize } from './GoalList';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  margin-bottom: 1em;
`;

const ListItem = styled.div`
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  font-size: 1.2rem;
  display: flex;
  text-transform: capitalize;
  background-color: #333;
  color: #eee;
`;

const MainInfo = styled.div`
  display: flex;
  width: 100%;
`;

const ItemName = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 1em;
  width: 100%;
  font-weight: 600;
  font-size: 1.3rem;
`;

const TaskIndicator = styled.span`
  display: flex;
  align-self: center;
  margin-left: auto;
  font-size: 1.2rem;
  padding: 1em;
`;

const Notifications = styled.div`
  position: relative;
  margin: 0 10px;
  font-weight: 700;
`;

const NotificationDot = styled.div`
  position: absolute;
  top: -0.2rem;
  right: -0.75rem;
  background-color: #ee6055;
  border-radius: 10rem;
  height: 10px;
  width: 10px;
`;

interface IProps {
  goalId: string;
  name: string;
  totalTimeInSeconds: number;
  tasks?: Task[];
  displayReward: (
    size: rewardSize.small | rewardSize.medium | rewardSize.large,
  ) => void;
}

const GoalListItem: FunctionComponent<IProps> = ({
  name,
  goalId,
  totalTimeInSeconds,
  tasks = [],
  displayReward,
}) => {
  const [showTasks, setShowTasks] = useState(false);

  const toggleShowTasks = () => {
    setShowTasks(!showTasks);
  };

  return (
    <Container>
      <ListItem>
        <Container>
          <MainInfo>
            <ItemName onClick={toggleShowTasks}>
              {name}
              {showTasks ? (
                <FaCaretDown size={20} />
              ) : (
                <FaCaretRight size={20} />
              )}
            </ItemName>
            <TaskIndicator>
              <NewTaskButton goalId={goalId} />
              <UpdateGoalButton goalId={goalId} name={name} />
              <DeleteGoalButton goalId={goalId} name={name} />
              {tasks.length > 0 ? (
                <Notifications title="Tasks Remaining">
                  {tasks.filter((task) => task.isCompleted === false).length}
                  <NotificationDot />
                </Notifications>
              ) : (
                <CompleteGoalButton
                  goalId={goalId}
                  name={name}
                  displayReward={displayReward}
                />
              )}
            </TaskIndicator>
          </MainInfo>
          <TimeSpent totalTimeInSeconds={totalTimeInSeconds} />
        </Container>
      </ListItem>
      {showTasks && <TaskList tasks={tasks} displayReward={displayReward} />}
    </Container>
  );
};

export default GoalListItem;
