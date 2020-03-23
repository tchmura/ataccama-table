import { enrichItemsWithId } from '../utils';

describe('utils', () => {
  it('should enrich items with id', () => {
    const mockedItems = [
      {
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
        kids: {
          has_relatives: {
            records: [
              {
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
          }
        }
      }
    ];

    const enrichedItems = enrichItemsWithId(mockedItems);

    expect(enrichedItems[0].id).toBeTruthy();
    // @ts-ignore
    expect(enrichedItems[0].kids.has_relatives.records[0].id).toBeTruthy();
  });
});
