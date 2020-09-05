import React, { FunctionComponent } from 'react';
import styled, { keyframes } from 'styled-components';
import { SubtaskListItem } from '.';
import { Subtask } from '../../types';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const ListContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  animation: ${fadeIn} 300ms ease-out forwards;
`;

interface IProps {
  subtasks: Subtask[];
}

const SubtaskList: FunctionComponent<IProps> = ({ subtasks = [] }) => (
  <ListContainer>
    {subtasks
      .filter((subtask) => subtask.isCompleted === false)
      .map((subtask) => {
        const { _id, name, totalTimeInSeconds, isCompleted } = subtask;
        return (
          <SubtaskListItem
            key={_id}
            subtaskId={_id}
            name={name}
            totalTimeInSeconds={totalTimeInSeconds}
          />
        );
      })}
  </ListContainer>
);

export default SubtaskList;
