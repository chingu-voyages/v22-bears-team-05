import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { GoalListItem, NewGoalButton } from '.';
import { Goal } from '../../types';

const ListContainer = styled.div<{ tooFewGoals: boolean }>`
  background-color: white;
  max-width: 100%;
  user-select: none;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: ${({ tooFewGoals }) =>
    tooFewGoals
      ? 'repeat(auto-fit, minmax(300px, 500px))'
      : 'repeat(auto-fit, minmax(300px, 1fr))'};
`;

type GoalProps = {
  goals?: Goal[];
};

const GoalList: FunctionComponent<GoalProps> = ({ goals }) => (
  <>
    <NewGoalButton />
    <ListContainer tooFewGoals={goals.length < 3}>
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
  </>
);

export default GoalList;
