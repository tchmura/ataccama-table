import { observable, action, flow } from 'mobx';

import { getItems } from '../dataSet';
import { Item, Kids } from '../types';
import { enrichItemsWithId } from '../utils';

export class ItemStore {
  @observable enrichedItems: Item[] = [];
  @observable state = 'pending';

  filterKidsById(kids: Kids | {}, idToFilter: string) {
    const filteredKids: Kids = {};

    return Object.entries(kids).reduce((acc, kid) => {
      acc[kid[0]] = { records: this.filterItemsById(kid[1].records, idToFilter) };
      return acc;
    }, filteredKids);
  }

  filterItemsById(items: Item[], idToFilter: string) {
    const itemsFilteredOnCurrentLevel = items.filter(item => item.id !== idToFilter);
    return itemsFilteredOnCurrentLevel.map(item => ({ ...item, kids: this.filterKidsById(item.kids, idToFilter) }));
  }

  getEnrichedItems = flow(function*(this: ItemStore) {
    this.enrichedItems = [];
    this.state = 'pending';

    const items: Omit<Item, 'id'>[] = yield getItems();

    this.enrichedItems = enrichItemsWithId(items);
    this.state = 'done';
  });

  @action deleteItem(itemId: string) {
    this.enrichedItems = this.filterItemsById(this.enrichedItems, itemId);
  }
}
