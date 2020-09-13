import React from 'react';
import styled from 'styled-components';

import DropDownItem from './DropDownItem';

const Container = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

interface IProps {
  data: {
    title: string;
    body: JSX.Element;
  }[];
}

const DropDownList: React.FC<IProps> = ({ data }) => (
  <Container>
    {data.map(({ title, body }, index) => (
      <DropDownItem key={title} index={index} title={title}>
        {body}
      </DropDownItem>
    ))}
  </Container>
);

export default DropDownList;
