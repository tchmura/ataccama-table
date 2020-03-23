import React from 'react';
import styled from 'styled-components';

export const Cell: React.FC<{ text: string }> = ({ text }) => {
  return <StyledCell>{text}</StyledCell>;
};

const StyledCell = styled.td`
  border-right: solid 1px;
  border-left: solid 1px;
`;
