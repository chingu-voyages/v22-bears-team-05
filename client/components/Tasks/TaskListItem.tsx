import React, { FunctionComponent, useState } from 'react';
import { FaCaretDown, FaCaretRight } from 'react-icons/fa';
import styled from 'styled-components';
import { DeleteTaskButton, TaskList } from '.';

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

type TaskProp = {
  taskId: string;
  name: string;
  subtasks?: Subtask[];
  isSubtask: boolean;
};

type Subtask = {
  subtaskId: string;
  name: string;
};

const TaskListItem: FunctionComponent<TaskProp> = ({
  taskId,
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
        <MainInfo>
          <ItemName>
            {name}
            {showSubtasks ? (
              <FaCaretDown size={20} />
            ) : (
              <FaCaretRight size={20} />
            )}
          </ItemName>
          <TaskIndicator>
            <DeleteTaskButton taskName={name} taskId={taskId} />
          </TaskIndicator>
        </MainInfo>
      </ListItem>
      {showSubtasks && <TaskList tasks={subtasks} isSubtask />}
    </Container>
  );
};

export default TaskListItem;
