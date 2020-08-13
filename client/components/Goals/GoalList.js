import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {GoalListItem} from './';

const ListContainer = styled.div`
  background-color: white;
  max-width: 100%;
`;

const GoalList = ({goals}) => (
  <ListContainer>
    {goals.map((goal) => (
      <GoalListItem key={goal.goalId} title={goal.title} />
    ))}
  </ListContainer>
);

GoalList.propTypes = {
  goals: PropTypes.array.isRequired,
};

export default GoalList;
