import React from 'react';

import { ItemStore } from '../stores/ItemStore';

export const storesContext = React.createContext({
  itemStore: new ItemStore()
});
