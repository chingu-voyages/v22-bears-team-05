import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { GoalListItem } from '.';

const ListContainer = styled.div`
  background-color: white;
  max-width: 100%;
  user-select: none;
`;

type GoalProps = {
  goals?: Goal[];
};

type Goal = {
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

const GoalList: FunctionComponent<GoalProps> = ({ goals }) => (
  <ListContainer>
    {goals.map((goal) => {
      const { name, tasks, goalId } = goal;
      return (
        <GoalListItem key={goalId} name={name} tasks={tasks} goalId={goalId} />
      );
    })}
  </ListContainer>
);

export default GoalList;
