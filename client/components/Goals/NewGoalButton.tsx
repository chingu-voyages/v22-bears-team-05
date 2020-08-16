import React, { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { FaPlus } from 'react-icons/fa';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #61bd8f;
  border: 2px solid #61bd8f;
  margin: 0 0 0.5em;
  padding: 0.6em;
  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.29);
  border-radius: 18px;
`;

const NewGoalButton: FunctionComponent = () => {
  const [showModal, setShowModal] = useState(false);

  const toggleForm = () => {
    setShowModal(!showModal);
  };

  return (
    <ButtonContainer onClick={toggleForm}>
      <FaPlus size={35} />
    </ButtonContainer>
  );
};

export default NewGoalButton;
