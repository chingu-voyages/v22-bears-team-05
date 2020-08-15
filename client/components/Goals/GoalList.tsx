import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { GoalListItem } from '.';

const ListContainer = styled.div`
  background-color: white;
  max-width: 100%;
`;

type Task = {};

type Goal = {
  name: string;
  goalId: string;
  tasks: Task[];
};

type GoalProps = {
  goals: Goal[];
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
