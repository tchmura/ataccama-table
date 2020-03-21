import React from 'react';
import styled from 'styled-components/macro';

import { Item } from '../../types';
import { Title } from './Title';
import { Row } from './Row';

type Props = {
  items: Item[];
  tableName?: string;
  rootColumnCount?: number;
};

export const ItemTable: React.FC<Props> = ({ items, tableName }) => {
  const headings = Object.keys(items[0].data);
  const rowData = items.map(item => Object.values(item.data));
  const kidsList = items.map(item => item.kids);

  return (
    <StyledItemTable cellPadding={10}>
      <thead>
        <tr>
          <StyledTableName>{tableName}</StyledTableName>
        </tr>
        <StyledHeading>
          <th />
          {headings.map((title, idx) => (
            <Title title={title} key={idx} />
          ))}
        </StyledHeading>
      </thead>
      <tbody>
        {rowData.map((cellsData, idx) => (
          <Row cellsData={cellsData} kids={kidsList[idx]} key={idx} rootColumnCount={headings.length + 1} /> // +1 to accomodate the the column for expand button
        ))}
      </tbody>
    </StyledItemTable>
  );
};

const StyledItemTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin-bottom: 20px;
`;

const StyledHeading = styled.tr`
  background-color: lightgray;
  border: solid 1px;
`;

const StyledTableName = styled.td`
  font-size: 25px;
  font-weight: bold;
`;
