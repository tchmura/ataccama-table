import React from 'react';

import { ItemTable } from './components/Item/ItemTable';
import { getItems } from './dataSet';
import { Item } from './types';

export const App = () => {
  const items: Item[] = getItems();

  return (
    <>
      <ItemTable items={items} />
    </>
  );
};
