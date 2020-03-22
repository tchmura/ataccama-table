import React from 'react';
import styled from 'styled-components/macro';
import { useObserver } from 'mobx-react';

import { Item } from '../../types';
import { Title } from './Title';
import { Row } from './Row';

type Props = {
  items: Item[];
  tableName?: string;
  rootColumnCount?: number;
};

export const ItemTable: React.FC<Props> = ({ items, tableName }) => {
  return useObserver(() => {
    if (items.length) {
      // assumption - items on the same level have consistent data keys
      const headings = Object.keys(items[0].data);
      const rowsToDisplay = items.map(item => ({ cellsData: Object.values(item.data), itemId: item.id }));
      const kidsList = items.map(item => item.kids);

      return (
        <StyledItemTable cellPadding={10}>
          <thead>
            <tr>
              <StyledTableName>{tableName}</StyledTableName>
            </tr>
            <StyledHeading>
              <StyledButtonsHeader />
              {headings.map((title, idx) => (
                <Title title={title} key={idx} />
              ))}
            </StyledHeading>
          </thead>
          <tbody>
            {rowsToDisplay.map(({ cellsData, itemId }, idx) => (
              <Row
                cellsData={cellsData}
                kids={kidsList[idx]}
                itemId={itemId}
                rootColumnCount={headings.length + 1 /* +1 to accomodate the column for expand button*/}
                key={itemId}
              />
            ))}
          </tbody>
        </StyledItemTable>
      );
    }

    return null;
  });
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

const StyledButtonsHeader = styled.th`
  /* Ensures all nested tables have equally wide first column which contains buttons */
  width: 1px;
`;
