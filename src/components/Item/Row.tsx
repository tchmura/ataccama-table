import React, { useState } from 'react';
import styled from 'styled-components/macro';

import { Cell } from './Cell';
import { Kids } from '../../types';
import { ItemTable } from './ItemTable';
import { useStores } from '../../hooks/useStores';

type Props = {
  cellsData: string[];
  kids: Kids;
  itemId: string;
  rootColumnCount?: number;
};

const doesKidsHaveRecords = (kids: Kids) => {
  return !!Object.values(kids)
    .map(value => value.records)
    .flat(Infinity).length;
};

export const Row: React.FC<Props> = ({ cellsData, kids, rootColumnCount, itemId }) => {
  const [shouldExpand, setShouldExpand] = useState(false);
  const { itemStore } = useStores();

  const kidsContainerNames = Object.keys(kids);

  return (
    <>
      <StyledRow>
        <StyledButtons>
          <StyledDeleteButton onClick={() => itemStore.deleteItem(itemId)}>delete</StyledDeleteButton>
          {doesKidsHaveRecords(kids) && (
            <button onClick={() => setShouldExpand(prevShouldExpand => !prevShouldExpand)}>
              {shouldExpand ? 'Wrap' : 'Expand'}
            </button>
          )}
        </StyledButtons>
        {cellsData.map((cellText, idx) => (
          <Cell text={cellText} key={idx} />
        ))}
      </StyledRow>
      {doesKidsHaveRecords(kids) && shouldExpand && (
        <tr>
          <td colSpan={rootColumnCount}>
            {kidsContainerNames.map((name, idx) => (
              <ItemTable items={kids[name].records} tableName={name} key={idx} rootColumnCount={rootColumnCount} />
            ))}
          </td>
        </tr>
      )}
    </>
  );
};

const StyledRow = styled.tr`
  border: solid 1px;
`;

const StyledButtons = styled.td`
  display: flex;
  justify-content: space-evenly;

  & button {
    width: 100%;
    border-radius: 5px;
    font-weight: bold;
    margin-right: 10px;
  }

  & button:last-child {
    margin-right: 0;
  }
`;

const StyledDeleteButton = styled.button`
  background-color: red;
  color: white;
`;
