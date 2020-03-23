import { ItemStore } from '../ItemStore';
import { createItemData } from '../../testUtils/itemTestUtils';

describe('ItemStore', () => {
  it('should delete kid item', () => {
    const store = new ItemStore();
    store.enrichedItems = [createItemData()];
    // @ts-ignore
    expect(store.enrichedItems[0].kids.has_relatives.records.length).toEqual(1);

    store.deleteItem('mockId1');
    // @ts-ignore
    expect(store.enrichedItems[0].kids.has_relatives.records.length).toEqual(0);
  });
});
