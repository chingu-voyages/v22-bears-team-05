import React, { FunctionComponent, useState } from 'react';
import { FaCaretDown, FaCaretRight } from 'react-icons/fa';
import styled from 'styled-components';
import { DeleteTaskButton, UpdateTaskButton } from '.';
import { Subtask } from '../../types';
import { TimeSpent } from '../Goals';
import { NewSubtaskButton, SubtaskList } from '../Subtasks';
import CompleteTaskButton from './CompleteTaskButton';

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-flow: column nowrap;
  background-color: #333;
  &:last-child {
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    margin-bottom: 1em;
    padding-bottom: 1em;
  }
`;

const ListItem = styled.div<{ showSubtasks: boolean }>`
  background-color: #ccc;
  width: 95%;
  &:not(:first-child) {
    margin-top: 0.5em;
  }
  margin-bottom: ${({ showSubtasks }) => (showSubtasks ? '0' : '0.5em')};
  text-transform: capitalize;
  padding: 1em;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const MainInfo = styled.div`
  display: flex;
  width: 100%;
`;

const ItemName = styled.span`
  cursor: pointer;
  display: flex;
  align-items: center;
  align-self: baseline;
  padding: 0.5em 0;
  width: 100%;
  font-weight: 500;
  font-size: 1.2rem;
`;

const TaskIndicator = styled.span`
  display: flex;
  align-self: baseline;
  margin-left: auto;
  font-size: 1.2rem;
`;

const Notifications = styled.div`
  margin: 0 10px;
  font-weight: 700;
`;

const NotificationDot = styled.div`
  position: relative;
  top: -1.5rem;
  right: -0.75rem;
  background-color: #ee6055;
  border-radius: 10rem;
  height: 10px;
  width: 10px;
`;

const Spacer = styled.div`
  height: 0.5em;
`;

interface IProps {
  taskId: string;
  name: string;
  totalTimeInSeconds: number;
  subtasks?: Subtask[];
}

const TaskListItem: FunctionComponent<IProps> = ({
  taskId,
  name,
  totalTimeInSeconds,
  subtasks = [],
}) => {
  const [showSubtasks, setShowSubtasks] = useState(false);
  const toggleShowSubtasks = () => {
    setShowSubtasks(!showSubtasks);
  };

  return (
    <Container>
      <ListItem showSubtasks={showSubtasks}>
        <MainInfo>
          <ItemName onClick={toggleShowSubtasks}>
            {name}
            {showSubtasks ? (
              <FaCaretDown size={20} />
            ) : (
              <FaCaretRight size={20} />
            )}
          </ItemName>
          <TaskIndicator>
            <NewSubtaskButton taskId={taskId} />
            <UpdateTaskButton taskId={taskId} name={name} />
            <DeleteTaskButton taskName={name} taskId={taskId} />
            {subtasks.length > 0 ? (
              <Notifications title="Subtasks Remaining">
                {
                  subtasks.filter((subtask) => subtask.isCompleted === false)
                    .length
                }
                <NotificationDot />
              </Notifications>
            ) : (
              <CompleteTaskButton taskId={taskId} name={name} />
            )}
          </TaskIndicator>
        </MainInfo>
        <TimeSpent totalTimeInSeconds={totalTimeInSeconds} paddingSmall />
      </ListItem>

      {showSubtasks && (
        <>
          <SubtaskList subtasks={subtasks} />
          {subtasks.length === 0 ? <Spacer /> : null}
        </>
      )}
    </Container>
  );
};

export default TaskListItem;
