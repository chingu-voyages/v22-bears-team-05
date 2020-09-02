import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { TaskList } from '.';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
  background-color: #eee;
  &:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    margin-bottom: 1em;
    padding-bottom: 1em;
  }
`;

const ListItem = styled.div<{ subtask: boolean }>`
  background-color: #fff;
  width: 95%;
  margin-bottom: 0.5em;
  text-transform: capitalize;
  padding: 1em;
  border-radius: 5px;
  ${(props) => props.subtask && 'background-color: #E0F2E9;'}
  ${(props) => props.subtask && 'border-color: #9AD5B8;'}
`;

type TaskProp = {
  _id: string;
  name: string;
  subtasks?: Subtask[];
  isSubtask: boolean;
};

type Subtask = {
  subtaskId: string;
  name: string;
};

const TaskListItem: FunctionComponent<TaskProp> = ({
  _id,
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
