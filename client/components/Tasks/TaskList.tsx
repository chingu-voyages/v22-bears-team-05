import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { TaskListItem } from '.';

const ListContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

type TasksProp = {
  tasks: Task[];
  isSubtask: boolean;
};

type Task = {
  _id: string;
  name: string;
  subtasks?: Subtask[];
};

type Subtask = {
  id: string;
  name: string;
};

const TaskList: FunctionComponent<TasksProp> = ({
  tasks = [],
  isSubtask = false,
}) => (
  <ListContainer>
    {tasks.map((task) => {
      const { _id, name, subtasks } = task;
      return (
        <TaskListItem
          key={_id}
          taskId={_id}
          name={name}
          subtasks={subtasks}
          isSubtask={isSubtask}
        />
      );
    })}
  </ListContainer>
);

export default TaskList;
