import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { FaCaretRight } from 'react-icons/fa';

const Container = styled.div<{ open: boolean }>`
  width: 100%;
  padding: 1rem;
  margin: 0 auto 25px;
  z-index: 10;

  display: inline-grid;
  grid-template-columns: 1fr 6fr 1fr;
  border: 2px solid #1d1e2c;
  justify-items: center;
  align-items: center;
  text-align: center;

  font-weight: bold;
  font-size: 0.85rem;

  > :first-child {
    justify-self: start;
  }

  > :last-child {
    justify-self: end;
    transition: all 150ms ease-out;
    ${({ open }) => open && 'transform: rotate(90deg);'}
  }

  @media only screen and (min-width: 800px) {
    font-size: 1rem;
  }
`;

const TextBlock = styled.div<{ open: boolean }>`
  padding: 0 1rem;
  color: white;
  background-color: #1d1e2c;
  transition: all 150ms ease-in;
  opacity: 0;
  z-index: -10;
  visibility: hidden;
  height: 0;
  margin: 0;

  ${({ open }) =>
    open &&
    css`
      opacity: 1;
      z-index: 10;
      visibility: visible;
      margin: 0 0 25px;
      height: auto;
      padding: 1rem;
    `}

  p {
    margin: 0;
    font-weight: 300;
    font-size: 1rem;
    text-align: left;
  }

  p b {
    font-weight: 500;
  }

  @media only screen and (min-width: 800px) {
    p {
      font-size: 1.1rem;
    }
  }
`;

interface IProps {
  title: string;
  index: number;
  children: JSX.Element;
}

const DropDownItem: React.FC<IProps> = ({ title, index, children }) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Container open={open} onClick={toggleOpen}>
        <div>{`${index + 1}.`}</div>
        <div>{title}</div>
        <FaCaretRight size={24} />
      </Container>
      <TextBlock open={open}>
        <p>{children}</p>
      </TextBlock>
    </div>
  );
};

export default DropDownItem;
