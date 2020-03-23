import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';
import styled from 'styled-components';

import { Table } from './components/itemTable/Table';
import { useStores } from './hooks/useStores';

export const App = () => {
  const { itemStore } = useStores();

  useEffect(() => {
    itemStore.getEnrichedItems();
  }, [itemStore]);

  return useObserver(() => {
    if (itemStore.state === 'pending') {
      return <StyledLoader>Loading...</StyledLoader>;
    }

    return <Table items={itemStore.enrichedItems} />;
  });
};

const StyledLoader = styled.div`
  font-size: 40px;
  position: absolute;
  top: 50%;
  left: 50%;
`;
