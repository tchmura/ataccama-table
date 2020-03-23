import { Kids, Item } from '../types';

export function createKidsData(data: Partial<Kids> = {}): Kids {
  return {
    has_relatives: {
      records: [
        {
          id: 'mockId1',
          data: {
            'Relative ID': '1007',
            'Patient ID': '34',
            'Is alive?': 'true',
            'Frequency of visits': '29'
          },
          kids: {
            has_phone: {
              records: [
                {
                  id: 'mockId1',
                  data: {
                    'Phone ID': '2008',
                    'ID of the relative': '1007',
                    Phone: '+(179)-982-0570'
                  },
                  kids: {}
                }
              ]
            }
          }
        }
      ]
    },
    ...data
  };
}

export function createItemData(data: Partial<Item> = {}): Item {
  return {
    id: 'mockItemId',
    data: {
      'Identification number': '34',
      Name: 'Joqmo',
      Gender: 'female',
      Risk: 'BITES',
      'Hair length': '6.2000000000',
      IQ: '98',
      'Admission date': 'Mon Dec 13 00:00:00 CET 1993',
      'Last breakdown': 'Wed Dec 24 07:14:50 CET 2014',
      'Yearly fee': '67035',
      'Knows the Joker?': 'true'
    },
    kids: { ...createKidsData() },
    ...data
  };
}
