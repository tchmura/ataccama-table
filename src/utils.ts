import { v4 as uuidV4 } from 'uuid';

import { Kids, Item } from './types';

export function enrichKidsWithId(kids: Kids | {}) {
  const enrichedKids: Kids = {};

  return Object.entries(kids).reduce((acc, kid) => {
    acc[kid[0]] = { records: enrichItemsWithId(kid[1].records) };
    return acc;
  }, enrichedKids);
}

export function enrichItemsWithId(items: Omit<Item, 'id'>[]): Item[] {
  return items.map(item => ({ ...item, id: uuidV4(), kids: enrichKidsWithId(item.kids) }));
}
