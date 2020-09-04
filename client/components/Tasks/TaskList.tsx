import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { TaskListItem } from '.';

const ListContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

interface IProps {
  tasks: Task[];
  isSubtask: boolean;
}

type Task = {
  _id: string;
  name: string;
  isCompleted: boolean;
  totalTimeInSeconds: number;
  subtasks?: Subtask[];
};

type Subtask = {
  _id: string;
  name: string;
  totalTimeInSeconds: number;
  isCompleted: boolean;
};

const TaskList: FunctionComponent<IProps> = ({
  tasks = [],
  isSubtask = false,
}) => (
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
            isSubtask={isSubtask}
          />
        );
      })}
  </ListContainer>
);

export default TaskList;
