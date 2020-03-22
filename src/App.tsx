import React, { useEffect } from 'react';
import { useObserver } from 'mobx-react';

import { ItemTable } from './components/Item/ItemTable';
import { useStores } from './hooks/useStores';

export const App = () => {
  const { itemStore } = useStores();

  useEffect(() => {
    itemStore.getEnrichedItems();
  }, [itemStore]);

  return useObserver(() => (
    <>
      <ItemTable items={itemStore.enrichedItems} />
    </>
  ));
};
