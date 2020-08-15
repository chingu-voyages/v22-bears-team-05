import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';

import { TaskList } from '../Tasks';

const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

const ListItem = styled.div`
  background-color: #fff;
  border: 2px solid #407899;
  margin: 0 0 0.5em;
  padding: 1em;
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.29);
  border-radius: 18px;
`;

type Task = {};

type GoalProp = {
  name: string;
  goalId: string;
  tasks: Task[];
};

const GoalListItem: FunctionComponent<GoalProp> = ({ name, goalId, tasks }) => {
  const [showTasks, setShowTasks] = useState(false);

  const toggleShowTasks = () => {
    setShowTasks(showTasks!);
  };

  return (
    <Container>
      <ListItem onClick={toggleShowTasks}>{name}</ListItem>
      {showTasks && <TaskList tasks={tasks} />}
    </Container>
  );
};

export default GoalListItem;
