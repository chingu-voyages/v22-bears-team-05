import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

import { GoalListItem } from '.';

const ListContainer = styled.div`
  background-color: white;
  max-width: 100%;
`;

type Goal = {
  title: string;
  goalId: string;
};

type GoalProps = {
  goals: Goal[];
};

const GoalList: FunctionComponent<GoalProps> = ({ goals }) => (
  <ListContainer>
    {goals.map((goal) => (
      <GoalListItem key={goal.goalId} title={goal.title} />
    ))}
  </ListContainer>
);

export default GoalList;
