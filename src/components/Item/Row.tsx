import React, { useState } from 'react';
import styled from 'styled-components/macro';

import { Cell } from './Cell';
import { Kids } from '../../types';
import { ItemTable } from './ItemTable';

type Props = {
  cellsData: string[];
  kids: Kids;
  rootColumnCount?: number;
};

export const Row: React.FC<Props> = ({ cellsData, kids, rootColumnCount }) => {
  const [shouldExpand, setShouldExpand] = useState(false);

  const kidsContainerNames = Object.keys(kids);

  return (
    <>
      <StyledRow>
        <td>
          {!!kidsContainerNames.length && (
            <button onClick={() => setShouldExpand(prevShouldExpand => !prevShouldExpand)}>
              {!!shouldExpand ? 'Wrap' : 'Expand'}
            </button>
          )}
        </td>
        {cellsData.map((cellText, idx) => (
          <Cell text={cellText} key={idx} />
        ))}
      </StyledRow>
      <tr>
        {!!kidsContainerNames.length && (
          <td colSpan={rootColumnCount}>
            {shouldExpand &&
              kidsContainerNames.map((name, idx) => {
                return (
                  <ItemTable items={kids[name].records} tableName={name} key={idx} rootColumnCount={rootColumnCount} />
                );
              })}
          </td>
        )}
      </tr>
    </>
  );
};

const StyledRow = styled.tr`
  border: solid 1px;
`;
