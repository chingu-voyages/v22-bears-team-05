import React, { FunctionComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import { TaskListItem } from '.';
import { Task, Subtask } from '../../types';

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
  tasks?: Task[];
  subtasks?: Subtask[];
  isSubtask: boolean;
}

const TaskList: FunctionComponent<IProps> = ({
  tasks = [],
  subtasks = [],
  isSubtask = false,
}) => (
  <ListContainer>
    {tasks &&
      tasks
        .filter((task) => task.isCompleted === false)
        .map((task) => {
          const { _id, name, totalTimeInSeconds, isCompleted } = task;

          return (
            <TaskListItem
              key={_id}
              taskId={_id}
              name={name}
              totalTimeInSeconds={totalTimeInSeconds}
              subtasks={subtasks}
              isSubtask={isSubtask}
            />
          );
        })}
    {subtasks &&
      subtasks
        .filter((task) => task.isCompleted === false)
        .map((task) => {
          const { _id, name, totalTimeInSeconds, isCompleted } = task;

          return (
            <TaskListItem
              key={_id}
              taskId={_id}
              name={name}
              totalTimeInSeconds={totalTimeInSeconds}
              subtasks={subtasks}
              isSubtask={isSubtask}
            />
          );
        })}
  </ListContainer>
);

export default TaskList;
