import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { GoalListItem, NewGoalButton } from '.';
import { Goal } from '../../types';

const ListContainer = styled.div`
  background-color: white;
  max-width: 100%;
  user-select: none;
`;

type GoalProps = {
  goals?: Goal[];
};

const GoalList: FunctionComponent<GoalProps> = ({ goals }) => (
  <ListContainer>
    <NewGoalButton />
    {goals.map((goal) => {
      const { name, tasks, _id, totalTimeInSeconds } = goal;
      return (
        <GoalListItem
          key={_id}
          name={name}
          tasks={tasks}
          goalId={_id}
          totalTimeInSeconds={totalTimeInSeconds}
        />
      );
    })}
  </ListContainer>
);

export default GoalList;
