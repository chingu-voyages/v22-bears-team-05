import React, { FunctionComponent, useState } from 'react';
import { FaCaretDown, FaCaretRight } from 'react-icons/fa';
import styled from 'styled-components';
import { CompleteGoalButton, DeleteGoalButton, UpdateGoalButton } from '.';
import { TaskList } from '../Tasks';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const ListItem = styled.div`
  border: 2px solid #4ea5d9;
  margin: 0 0 0.5em;
  border-radius: 10px;
  font-size: 1.2rem;
  display: flex;
  text-transform: capitalize;
`;

const ItemName = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 1em;
  width: 100%;
`;

const TaskIndicator = styled.span`
  display: flex;
  align-self: center;
  margin-left: auto;
  margin-right: 10px;
  padding-left: 2ch;
  font-size: 1.2rem;
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

type GoalProp = {
  goalId: string;
  name: string;
  tasks?: Task[];
};

type Task = {
  id: string;
  name: string;
  subtasks?: Subtask[];
};

type Subtask = {
  id: string;
  name: string;
};

const GoalListItem: FunctionComponent<GoalProp> = ({
  name,
  goalId,
  tasks = [],
}) => {
  const [showTasks, setShowTasks] = useState(false);

  const toggleShowTasks = () => {
    setShowTasks(!showTasks);
  };

  return (
    <Container>
      <ListItem>
        <ItemName onClick={toggleShowTasks}>
          {name}
          {showTasks ? <FaCaretDown size={20} /> : <FaCaretRight size={20} />}
        </ItemName>
        <TaskIndicator>
          <UpdateGoalButton goalId={goalId} name={name} />
          <DeleteGoalButton goalId={goalId} name={name} />
          {tasks.length > 0 ? (
            <>
              {tasks.length}
              <NotificationDot className="margin-left-1" />
            </>
          ) : (
            <CompleteGoalButton goalId={goalId} name={name} />
          )}
        </TaskIndicator>
      </ListItem>
      {showTasks && <TaskList tasks={tasks} />}
    </Container>
  );
};

export default GoalListItem;
