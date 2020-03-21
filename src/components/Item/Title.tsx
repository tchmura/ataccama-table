import React from 'react';
import styled from 'styled-components/macro';

export const Title: React.FC<{ title: string }> = ({ title }) => {
  return <StyledTitle>{title}</StyledTitle>;
};

const StyledTitle = styled.th`
  font-size: 20px;
  font-weight: bold;
  padding: 5px 10px;
`;
