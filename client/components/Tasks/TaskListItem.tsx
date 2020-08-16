import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';

import { TaskList } from '.';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const ListItem = styled.div<{ subtask: boolean }>`
  background-color: #9ad5b8;
  border: 2px solid #61bd8f;
  margin: 0 0 1em;
  padding: 1em;
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.29);
  border-radius: 18px;
  ${(props) => props.subtask && 'background-color: #E0F2E9;'}
  ${(props) => props.subtask && 'border-color: #9AD5B8;'}
`;

type TaskProp = {
  id: string;
  name: string;
  subtasks?: Subtask[];
  isSubtask: boolean;
};

type Subtask = {
  subtaskId: string;
  name: string;
};

const TaskListItem: FunctionComponent<TaskProp> = ({
  id,
  name,
  subtasks = [],
  isSubtask = false,
}) => {
  const [showSubtasks, setShowSubtasks] = useState(false);

  const toggleShowSubtasks = () => {
    setShowSubtasks(!showSubtasks);
  };

  return (
    <Container>
      <ListItem onClick={toggleShowSubtasks} subtask={isSubtask}>
        {name}
      </ListItem>
      {showSubtasks && <TaskList tasks={subtasks} isSubtask />}
    </Container>
  );
};

export default TaskListItem;
