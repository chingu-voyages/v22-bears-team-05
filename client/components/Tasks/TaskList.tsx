import React, { FunctionComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import { TaskListItem } from '.';
import { Task } from '../../types';
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
  animation: ${fadeIn} 300ms ease-out forwards;
`;

interface IProps {
  tasks: Task[];
  displayReward: (
    size: rewardSize.small | rewardSize.medium | rewardSize.large,
  ) => void;
}

const TaskList: FunctionComponent<IProps> = ({ tasks = [], displayReward }) => (
  <ListContainer>
    {tasks
      .filter((task) => task.isCompleted === false)
      .map((task) => {
        const { _id, name, totalTimeInSeconds, tags, subtasks } = task;
        return (
          <TaskListItem
            key={_id}
            taskId={_id}
            name={name}
            totalTimeInSeconds={totalTimeInSeconds}
            subtasks={subtasks}
            displayReward={displayReward}
            tags={tags}
          />
        );
      })}
  </ListContainer>
);

export default TaskList;
