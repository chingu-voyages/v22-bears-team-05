import React, { FunctionComponent, useEffect } from 'react';
import ReactDom from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import styled from 'styled-components';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 500;
`;

const Content = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  background-color: #fff;
  z-index: 1000;
  border-radius: 5px;
`;

const ChildrenContainer = styled.div`
  padding: 50px;
`;

const Title = styled.h2`
  color: white;
  letter-spacing: 2px;
  text-transform: capitalize;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #4ea5d9;
  padding: 0 1em 0 1em;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const CloseButton = styled.button`
  cursor: pointer;
  width: unset;
  height: unset;
  margin: 0;
  padding: 0;
`;

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

const Modal: FunctionComponent<IProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  const MODAL_OPEN_CLASS = 'body--modal-open';

  useEffect(() => {
    if (isOpen) document.body.classList.add(MODAL_OPEN_CLASS);
    else document.body.classList.remove(MODAL_OPEN_CLASS);

    return () => {
      document.body.classList.remove(MODAL_OPEN_CLASS);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return ReactDom.createPortal(
    <>
      <Overlay onClick={onClose} />

      <Content>
        <Header>
          <Title>{title}</Title>
          <CloseButton type="button" onClick={onClose}>
            <FaTimes size={35} color="white" />
          </CloseButton>
        </Header>
        <ChildrenContainer>{children}</ChildrenContainer>
      </Content>
    </>,
    document.getElementById('modal')
  );
};

export default Modal;
