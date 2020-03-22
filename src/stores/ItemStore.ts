import { observable, action } from 'mobx';
import { v4 as uuidV4 } from 'uuid';

import { getItems } from '../dataSet';
import { Item, Kids } from '../types';

export class ItemStore {
  @observable enrichedItems: Item[] = [];

  enrichKidsWithId(kids: Kids | {}) {
    const enrichedKids: Kids = {};

    return Object.entries(kids).reduce((acc, kid) => {
      acc[kid[0]] = { records: this.enrichItemsWithId(kid[1].records) };
      return acc;
    }, enrichedKids);
  }

  enrichItemsWithId(items: Omit<Item, 'id'>[]): Item[] {
    return items.map(item => ({ ...item, id: uuidV4(), kids: this.enrichKidsWithId(item.kids) }));
  }

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

  @action getEnrichedItems() {
    const items = getItems();
    this.enrichedItems = this.enrichItemsWithId(items);
  }

  @action deleteItem(itemId: string) {
    this.enrichedItems = this.filterItemsById(this.enrichedItems, itemId);
  }
}
