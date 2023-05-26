import React from 'react';
import { render, screen, waitFor } from '../../../config/jest/test-utils';
import userEvent from '@testing-library/user-event';
import useResizeObserver from 'use-resize-observer/polyfilled';
import { OverflowMenuItem } from '@carbon/react';
import EnhancedDataTable from './EnhancedDataTable';
import { fireEvent } from '@storybook/testing-library';

jest.mock('use-resize-observer/polyfilled');

const rows = [
  {
    id: 'c1',
    name: 'my-dal12-cluster',
    status: 'normal',
    location: 'dal12',
    version: '1.15.2',
  },
  {
    id: 'c2',
    name: 'london-cluster',
    status: 'critical',
    location: 'london',
    version: '1.14.3',
  },
  {
    id: 'c3',
    name: 'toronto-cluster',
    status: 'deploying',
    location: 'tor01',
    version: '1.15.2',
  },
];

const lotsOfRows = Array.from(Array(30)).map((_, idx) => ({
  ...rows[0],
  id: `c${idx}`,
  name: `${rows[0].name}-${idx}`,
}));

const formattedRows = [
  {
    id: 'c1',
    name: 'my-dal12-cluster',
    status: 'normal',
    status__format: <div className="pal--status">Ready</div>,
    location: 'dal12',
    version: '1.15.2',
  },
];

const headers = [
  {
    key: 'name',
    header: 'Name',
  },
  {
    key: 'status',
    header: 'Status',
  },
  {
    key: 'location',
    header: 'Location',
  },
  {
    key: 'version',
    header: 'Version',
  },
];

const actions = [{ kind: 'primary', onClick: () => {}, label: 'Create' }];

const actionsDropdown = {
  label: 'Add',
  kind: 'ghost',
  actions: [
    {
      onClick: () => {},
      label: 'Logging',
    },
    {
      onClick: () => {},
      label: 'Monitoring',
    },
  ],
};

const batchActions = () => [
  { onClick: () => {}, label: 'Delete', renderIcon: null, kind: 'danger' },
];

const rowActions = rowId =>
  [
    { itemText: 'Update', onClick: () => {} },
    { itemText: 'Delete', onClick: () => {}, isDelete: true },
    <OverflowMenuItem itemText="Random" key="Random" />,
  ].filter(a => rowId !== 'c3' || a.itemText !== 'Delete');

const filters = [
  {
    columnKey: 'name',
    filterType: 'textinput',
    id: 'name-filter',
    labelText: 'Name:',
  },
  {
    columnKey: 'status',
    filterType: 'multiselect',
    id: 'status-filter',
    items: [
      {
        id: 'normal',
        label: 'normal',
      },
      {
        id: 'critical',
        label: 'critical',
      },
      {
        id: 'deploying',
        label: 'deploying',
      },
    ],
    placeholder: 'Filter...',
    titleText: 'Status:',
  },
  {
    columnKey: 'location',
    filterType: 'combobox',
    id: 'location-filter',
    items: [
      {
        id: 'london',
        label: 'london',
      },
      {
        id: 'dal12',
        label: 'dal12',
      },
      {
        id: 'tor01',
        label: 'tor01',
      },
    ],
    label: 'Location',
    titleText: 'Location:',
  },
  {
    id: 'version-filter',
    columnKey: 'version',
    titleText: 'Version:',
    label: 'Version',
    items: [
      { id: '1.14.3', label: '1.14.3' },
      { id: '1.15.2', label: '1.15.2' },
    ],
  },
  {
    columnKey: 'name',
    filterKey: 'id',
    filterType: 'dropdown',
    id: 'filter-with-internal-props',
    items: [],
    label: '',
  },
];

describe('EnhancedDataTable', () => {
  let tableWidth = 1200;

  beforeEach(() => {
    useResizeObserver.mockImplementation(() => ({ width: tableWidth }));
  });

  afterEach(() => {
    tableWidth = 1200;
  });

  describe('render classes as expected for EnhancedDataTable component', () => {
    it('it renders the EnhancedDataTable base class', () => {
      const { container } = render(
        <EnhancedDataTable rows={rows} headers={headers} id="t1" />,
      );
      const baseClass = container.querySelector('.pal--data-table');
      expect(baseClass).toBeInTheDocument();
    });

    it('it renders the loading state', () => {
      const { container } = render(
        <EnhancedDataTable headers={headers} id="t1" />,
      );
      const baseClass = container.querySelector('.pal--data-table');
      expect(
        baseClass.querySelector('.cds--search-input[disabled]'),
      ).toBeInTheDocument();
      expect(
        baseClass.querySelector(
          '.cds--toolbar-action.cds--overflow-menu[disabled]',
        ),
      ).toBeInTheDocument();
      expect(
        baseClass.querySelector('.cds--skeleton.cds--data-table'),
      ).toBeInTheDocument();
    });

    it('it renders contents correctly', () => {
      const { container } = render(
        <EnhancedDataTable rows={lotsOfRows} headers={headers} id="t2" />,
      );
      const baseClass = container.querySelector('.pal--data-table');
      expect(baseClass.querySelector('.cds--search-input')).toBeInTheDocument();
      expect(
        baseClass.querySelector('.cds--toolbar-action.cds--overflow-menu'),
      ).toBeInTheDocument();
      expect(baseClass.querySelector('.cds--skeleton')).not.toBeInTheDocument();
      expect(
        baseClass.querySelectorAll('.cds--data-table thead th').length,
      ).toBe(4);
      expect(
        baseClass.querySelectorAll('.cds--data-table tbody tr').length,
      ).toBe(25);
      expect(baseClass.querySelector('.cds--pagination')).toBeInTheDocument();
      expect(screen.getByText('Search 3')).toBeInTheDocument();
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Status')).toBeInTheDocument();
      expect(screen.getByText('Location')).toBeInTheDocument();
      expect(screen.getByText('Version')).toBeInTheDocument();
      expect(screen.getByText('my-dal12-cluster-0')).toBeInTheDocument();
      expect(screen.getByText('my-dal12-cluster-24')).toBeInTheDocument();
      expect(screen.getByText('1–25 of 30 items')).toBeInTheDocument();
      expect(screen.getByText('1 of 2 pages')).toBeInTheDocument();
    });

    it('it renders actions correctly', async () => {
      const { container } = render(
        <EnhancedDataTable
          rows={rows}
          headers={headers}
          id="t3"
          actions={actions}
          batchActions={batchActions}
          rowActions={rowActions}
          hidePagination="small"
        />,
      );
      const baseClass = container.querySelector('.pal--data-table');

      // No pagination when row count is less than smallest page size
      expect(
        baseClass.querySelector('.cds--pagination'),
      ).not.toBeInTheDocument();

      // Table actions
      expect(
        baseClass.querySelector('.cds--toolbar-content .cds--btn--primary'),
      ).toBeInTheDocument();
      expect(screen.getByText('Create')).toBeInTheDocument();

      // Batch actions
      expect(
        baseClass.querySelectorAll('.cds--data-table thead th').length,
      ).toBe(6);
      expect(
        baseClass.querySelector('.cds--batch-actions--active'),
      ).not.toBeInTheDocument();
      userEvent.click(baseClass.querySelector('.cds--checkbox'));
      expect(
        baseClass.querySelector('.cds--batch-actions--active'),
      ).toBeInTheDocument();
      expect(
        baseClass.querySelectorAll('.cds--batch-actions .cds--btn').length,
      ).toBe(2);
      expect(screen.getByText('Delete')).toBeInTheDocument();
      expect(screen.getByText('Cancel')).toBeInTheDocument();
      userEvent.click(screen.getByText('Cancel'));
      expect(
        baseClass.querySelector('.cds--batch-actions--active'),
      ).not.toBeInTheDocument();

      // Row actions
      expect(
        baseClass.querySelectorAll('.cds--data-table .cds--overflow-menu').length,
      ).toBe(3);
      expect(
        document.querySelector('.cds--overflow-menu-options__option'),
      ).not.toBeInTheDocument();
      const menus = baseClass.querySelectorAll(
        '.cds--data-table .cds--overflow-menu',
      );
      userEvent.click(menus[0]);
      await waitFor(() =>
        document.querySelector('.cds--overflow-menu-options__option'),
      );
      expect(
        document.querySelectorAll('.cds--overflow-menu-options__option').length,
      ).toBe(3);
      const menuItems = document.querySelectorAll(
        '.cds--overflow-menu-options__option-content',
      );
      expect(menuItems[0]).toHaveTextContent('Update');
      expect(menuItems[1]).toHaveTextContent('Delete');
      expect(menuItems[2]).toHaveTextContent('Random');
      userEvent.click(document.body);
      expect(
        document.querySelectorAll('.cds--overflow-menu-options__option').length,
      ).toBe(0);
      userEvent.click(menus[2]);
      await waitFor(() =>
        document.querySelector('.cds--overflow-menu-options__option'),
      );
      expect(
        document.querySelectorAll('.cds--overflow-menu-options__option').length,
      ).toBe(2);
      expect(
        document.querySelector('.cds--overflow-menu-options__option-content'),
      ).toHaveTextContent('Update');
    });

    test.todo('fix dropdown test')
    // it('it renders dropdown actions correctly', async () => {
    //   const { findAllByRole, debug } = render(
    //     <EnhancedDataTable
    //       rows={rows}
    //       headers={headers}
    //       id="table-with-actions-dropdown"
    //       actionsDropdown={actionsDropdown}
    //     />,
    //   );

    //   expect(screen.queryByRole('menuitem')).not.toBeInTheDocument();

    //   fireEvent.mouseDown(screen.getByText('Add'));

    //   expect(screen.findAllByRole('menuitem')).toBeInTheDocument()
    //   const dropdownActions = await waitFor(() => {return screen.queryByRole('menuitem')});
    //   debug()
    //   expect(dropdownActions.length).toEqual(2);
    //   expect(dropdownActions[0]).toHaveTextContent('Logging');
    //   expect(dropdownActions[1]).toHaveTextContent('Monitoring');
    //   expect(
    //     document.querySelector('.pal--data-table--actions-dropdown .cds--btn--ghost'),
    //   ).toBeInTheDocument();
    // });

    it('it renders row detail correctly', async () => {
      const { container } = render(
        <EnhancedDataTable
          rows={rows}
          headers={headers}
          id="t4"
          hasRowDetail={rowId => rowId !== 'c1'}
          rowDetail={rowId => `Cluster ID: ${rowId}`}
        />,
      );
      const baseClass = container.querySelector('.pal--data-table');
      expect(
        baseClass.querySelectorAll('.cds--data-table thead th').length,
      ).toBe(5);
      const tableRows = baseClass.querySelectorAll('.cds--data-table tbody tr');
      expect(tableRows[0]).not.toHaveClass('cds--parent-row');
      expect(tableRows[1]).toHaveClass('cds--parent-row');
      expect(tableRows[2]).toHaveClass('cds--parent-row');
      expect(
        baseClass.querySelector(
          '.cds--data-table tbody tr[data-child-row="true"]',
        ),
      ).not.toBeInTheDocument();
      userEvent.click(tableRows[1].querySelector('.cds--table-expand__button'));
      expect(
        baseClass.querySelector(
          '.cds--data-table tbody tr[data-child-row="true"]',
        ),
      ).toBeInTheDocument();
      expect(screen.getByText('Cluster ID: c2')).toBeInTheDocument();
    });

    it('it renders filter panel correctly', async () => {
      const { container } = render(
        <EnhancedDataTable
          rows={rows}
          headers={headers}
          id="t5"
          filters={filters}
        />,
      );
      const baseClass = container.querySelector('.pal--data-table');
      expect(
        baseClass.querySelector('.cds--table-toolbar-filter-button'),
      ).toBeInTheDocument();
      expect(
        baseClass.querySelector('.cds--table-toolbar-filter-panel'),
      ).not.toBeInTheDocument();
      userEvent.click(
        baseClass.querySelector('.cds--table-toolbar-filter-button'),
      );
      expect(
        baseClass.querySelector('.cds--table-toolbar-filter-panel'),
      ).toBeInTheDocument();
      expect(screen.getByText('Clear')).toBeInTheDocument();
      expect(screen.getByText('Done')).toBeInTheDocument();
      expect(baseClass.querySelector('.cds--text-input')).toBeInTheDocument();
      expect(baseClass.querySelector('.cds--multi-select')).toBeInTheDocument();
      expect(baseClass.querySelector('.cds--combo-box')).toBeInTheDocument();
      expect(baseClass.querySelector('.cds--dropdown')).toBeInTheDocument();
      userEvent.click(screen.getByText('Clear'));
      expect(
        baseClass.querySelector('.cds--table-toolbar-filter-panel'),
      ).not.toBeInTheDocument();
    });

    it('it renders inline filter correctly', async () => {
      const { container } = render(
        <EnhancedDataTable
          rows={rows}
          headers={headers}
          id="t6"
          filters={[filters[3]]}
        />,
      );
      const baseClass = container.querySelector('.pal--data-table');
      expect(
        baseClass.querySelector('.cds--table-toolbar .cds--dropdown'),
      ).toBeInTheDocument();
      expect(
        baseClass.querySelector('.cds--table-toolbar-filter-button'),
      ).not.toBeInTheDocument();
    });

    it('it renders filter panel when small', async () => {
      tableWidth = 800;
      const { container } = render(
        <EnhancedDataTable
          rows={rows}
          headers={headers}
          id="t11"
          filters={[filters[3]]}
        />,
      );
      const baseClass = container.querySelector('.pal--data-table');
      expect(
        baseClass.querySelector('.cds--table-toolbar .cds--dropdown'),
      ).not.toBeInTheDocument();
      expect(
        baseClass.querySelector('.cds--table-toolbar-filter-button'),
      ).toBeInTheDocument();
      expect(
        baseClass.querySelector('.pal--data-table__pagination--sm'),
      ).not.toBeInTheDocument();
    });

    it('it renders smaller pagination when small', async () => {
      tableWidth = 500;
      const { container } = render(
        <EnhancedDataTable rows={lotsOfRows} headers={headers} id="t12" />,
      );
      const baseClass = container.querySelector('.pal--data-table');
      expect(
        baseClass.querySelector('.pal--data-table__pagination--sm'),
      ).toBeInTheDocument();
    });

    it('it renders table with row click support', async () => {
      const rowClick = jest.fn();
      const { container } = render(
        <EnhancedDataTable
          rows={rows}
          headers={headers}
          id="t7"
          rowClick={rowClick}
        />,
      );
      const baseClass = container.querySelector('.pal--data-table');
      expect(
        baseClass.querySelector('.pal--data-table__row-clickable'),
      ).toBeInTheDocument();
      userEvent.click(
        baseClass.querySelector('.pal--data-table__row-clickable'),
      );
      expect(rowClick).toHaveBeenCalledWith(
        'c1',
        expect.objectContaining({ id: 'c1' }),
      );
    });

    it('it renders table with no settings or paging', async () => {
      const { container } = render(
        <EnhancedDataTable
          rows={rows}
          headers={headers}
          id="t8"
          hideEditCols
          hideEditRowSize
          hidePagination
        />,
      );
      const baseClass = container.querySelector('.pal--data-table');
      expect(
        baseClass.querySelector('.cds--pagination'),
      ).not.toBeInTheDocument();
      expect(
        baseClass.querySelector('.cds--toolbar-action.cds--overflow-menu'),
      ).not.toBeInTheDocument();
    });

    it('it renders table with formatted data', async () => {
      const { container } = render(
        <EnhancedDataTable rows={formattedRows} headers={headers} id="t9" />,
      );
      const baseClass = container.querySelector('.pal--data-table');
      expect(baseClass.querySelector('.pal--status')).toBeInTheDocument();
      expect(screen.getByText('Ready')).toBeInTheDocument();
    });

    it('it renders table with empty state', async () => {
      const { container } = render(
        <EnhancedDataTable rows={[]} headers={headers} id="t10" />,
      );
      const baseClass = container.querySelector('.pal--data-table');
      expect(
        baseClass.querySelector('.pal--data-table__empty-state'),
      ).toBeInTheDocument();
      expect(screen.getByText('Resources')).toBeInTheDocument();
    });

    it('it supports server-side sorting, filtering, and paging', async () => {
      const onSortChange = jest.fn();
      const onFilterChange = jest.fn();
      const onPaginationChange = jest.fn();
      render(
        <EnhancedDataTable
          rows={lotsOfRows}
          headers={headers}
          id="sort-and-filter"
          onSortChange={onSortChange}
          onFilterChange={onFilterChange}
          onPaginationChange={onPaginationChange}
          totalRowCount={lotsOfRows.length}
          pageNumber={1}
        />,
      );
      userEvent.click(screen.getByText('Name'));
      expect(onSortChange).toHaveBeenCalledWith({
        header: 'name',
        direction: 'ASC',
      });
      userEvent.click(screen.getByText('Name'));
      expect(onSortChange).toHaveBeenCalledWith({
        header: 'name',
        direction: 'DESC',
      });
      userEvent.click(screen.getByText('Name'));
      expect(onSortChange).toHaveBeenCalledWith({
        header: 'name',
        direction: 'NONE',
      });
      userEvent.type(screen.getByPlaceholderText('Search'), 'abcd');
      await waitFor(() => expect(onFilterChange).toHaveBeenCalledWith('abcd'));
      userEvent.click(screen.getByRole('button', { name: /Next page/i }));
      expect(onPaginationChange).toHaveBeenCalledWith({
        page: 2,
        pageSize: 25,
        backBtnRef: expect.any(Object)
      });
    });
    // TODO:

    it('it supports infinite-scroll pagination pattern', async () => {
      const onPaginationChange = jest.fn();
      const mockPages = [
        { rows: [...lotsOfRows], next: 'next-page-token-1', previous: '' },
        {
          rows: [...lotsOfRows],
          next: 'next-page-token-2',
          previous: 'prev-page-token-1',
        },
        { rows: [...lotsOfRows], next: '', previous: 'prev-page-token-2' },
      ];
      let currentPageNum = 1;
      render(
        <EnhancedDataTable
          rows={mockPages[currentPageNum - 1].rows}
          headers={headers}
          isLastPage={!!mockPages[currentPageNum - 1].next}
          id="infinite-scroll"
          onPaginationChange={({ page, pageSize }) => {
            currentPageNum = page;
            onPaginationChange({ page, pageSize });
          }}
          totalRowCount="unknown"
          pageNumber={currentPageNum}
        />,
      );

      const infiniteActions = [
        { buttonToClick: 'Previous page', expected: { page: 1, pageSize: 25 } },
        { buttonToClick: 'Next page', expected: { page: 2, pageSize: 25 } },
        { buttonToClick: 'Previous page', expected: { page: 1, pageSize: 25 } },
        { buttonToClick: 'Next page', expected: { page: 2, pageSize: 25 } },
        { buttonToClick: 'Next page', expected: { page: 3, pageSize: 25 } },
        { buttonToClick: 'Previous page', expected: { page: 2, pageSize: 25 } },
        { buttonToClick: 'Next page', expected: { page: 3, pageSize: 25 } },
        { buttonToClick: 'Next page', expected: { page: 3, pageSize: 25 } },
        { buttonToClick: 'Previous page', expected: { page: 2, pageSize: 25 } },
        { buttonToClick: 'Previous page', expected: { page: 1, pageSize: 25 } },
        { buttonToClick: 'Previous page', expected: { page: 1, pageSize: 25 } },
      ];

      await infiniteActions.map(async action => {
        userEvent.click(screen.getByText(action.buttonToClick));
        await waitFor(() =>
          expect(onPaginationChange).toHaveBeenCalledWith(!action.expected),
        );
        await waitFor(() =>
          expect(currentPageNum).toEqual(action.expected.page),
        );
        onPaginationChange.mockClear();
      });
    });

    it('it applies the correct classname in light mode', async () => {
      const { container } = render(
        <EnhancedDataTable rows={[]} headers={headers} id="t10" light />,
      );
      const base = container.querySelector('.pal--data-table');
      expect(base.classList).toContain('pal--data-table--light');
    });
  });

  test('it does not pass internal filter props down to child filter components', async () => {
    const filter = render(
      <EnhancedDataTable
        filters={[filters.find((filter) => filter.id == 'filter-with-internal-props')]}
        headers={headers}
        id="table-with-filter-with-internal-props"
        rows={rows}
      />,
    ).container.querySelector('#filter-with-internal-props');
    expect(filter).not.toHaveAttribute('filterKey');
    expect(filter).not.toHaveAttribute('filterType');
  });
});
