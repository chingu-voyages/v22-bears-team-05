import React, { FunctionComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import { TaskListItem } from '.';
import { Task } from '../../types';

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
}

const TaskList: FunctionComponent<IProps> = ({ tasks = [] }) => (
  <ListContainer>
    {tasks
      .filter((task) => task.isCompleted === false)
      .map((task) => {
        const { _id, name, totalTimeInSeconds, isCompleted, subtasks } = task;
        return (
          <TaskListItem
            key={_id}
            taskId={_id}
            name={name}
            totalTimeInSeconds={totalTimeInSeconds}
            subtasks={subtasks}
          />
        );
      })}
  </ListContainer>
);

export default TaskList;
