import React, { FunctionComponent } from 'react';
import styled from 'styled-components';

const ListItem = styled.div`
  background-color: #fff;
  border: 2px solid #407899;
  margin: 0 0 0.5em;
  padding: 1em;
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.29);
  border-radius: 18px;
`;

type GoalProp = {
  title: string;
};

const GoalListItem: FunctionComponent<GoalProp> = ({ title }) => (
  <ListItem>{title}</ListItem>
);

export default GoalListItem;
