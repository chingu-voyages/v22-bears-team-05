import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ListItem = styled.div`
  background-color: #fff;
  border: 2px solid #407899;
  margin: 0 0 0.5em;
  padding: 1em;
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.29);
  border-radius: 18px;
`;

const GoalListItem = ({title}) => <ListItem>{title}</ListItem>;

GoalListItem.propTypes = {
  title: PropTypes.string.isRequired,
};

export default GoalListItem;
