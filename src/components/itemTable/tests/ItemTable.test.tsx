import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import 'jest-styled-components';

import { doesKidsHaveRecords } from '../Row';
import { createKidsData, createItemData } from '../../../testUtils/itemTestUtils';
import { Table } from '../Table';

describe('doesKidsHaveRecords', () => {
  afterEach(cleanup);

  it('should return true for kids which have records', () => {
    expect(doesKidsHaveRecords(createKidsData())).toEqual(true);
  });

  it('should return false for kids without records', () => {
    expect(doesKidsHaveRecords(createKidsData({ has_relatives: { records: [] } }))).toEqual(false);
  });
});

describe('Table rendering', () => {
  afterEach(cleanup);

  it('should render correctly', () => {
    const { container } = render(<Table items={[createItemData()]} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should expand', () => {
    const { getByText, queryByText, queryAllByTestId } = render(<Table items={[createItemData()]} />);

    expect(queryAllByTestId('item-table').length).toEqual(1);
    expect(queryByText('Wrap')).toBeFalsy();

    fireEvent.click(getByText('Expand'));

    expect(queryByText('Wrap')).toBeTruthy();
    expect(queryAllByTestId('item-table').length).toEqual(2);
  });
});
