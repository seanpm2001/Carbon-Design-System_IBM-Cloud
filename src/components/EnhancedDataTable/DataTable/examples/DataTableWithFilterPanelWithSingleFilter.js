import React from 'react';
import {
  DataTable,
  DataTableHOC,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarButton,
  TableToolbarFilterPanel,
  TableToolbarMultiSelect,
} from '../..';

import {
  initialRows,
  initialHeaders,
  filterItems,
} from './params';

const { withFilters } = DataTableHOC;
const DataTableWithFilters = withFilters(DataTable);

/* eslint-disable react/prop-types */
const Example = ({ rows: rowsProp, initialFilters: initialFiltersProp, mode }) => (
  <DataTableWithFilters
    rows={rowsProp || initialRows}
    headers={initialHeaders}
    filterItems={{ status: filterItems.status }}
    initialFilters={initialFiltersProp || {}}
    filterAllLabel="All"
    render={({
      rows,
      headers,
      filterItems,
      getHeaderProps,
      getRowProps,
      getTableProps,
      filterSelections,
      isFilterPanelOpen,
      onInputChange,
      onOpenFilterPanel,
      onCloseFilterPanel,
      onFilterChange,
      onClearAllFilters,
      onCommitFilters,
      filterAllLabel,
      getTableContainerProps,
    }) => (
      <TableContainer
        className="bx--table-with-filters"
        {...getTableContainerProps()}
      >
        <TableToolbar>
          <TableToolbarContent>
            <TableToolbarSearch
              persistent
              placeholder="Search table..."
              onChange={onInputChange}
            />
            <TableToolbarButton
              type="filter"
              toggleState={isFilterPanelOpen}
              onClick={onOpenFilterPanel}
            />
          </TableToolbarContent>
        </TableToolbar>
        <TableToolbarFilterPanel
          isOpen={isFilterPanelOpen}
          headers={initialHeaders}
          filterSelections={filterSelections}
          mode={mode}
          onFilterChange={onFilterChange}
          onClearAllFilters={onClearAllFilters}
          onCommitFilters={onCommitFilters}
          onCloseFilterPanel={onCloseFilterPanel}
        >
          <TableToolbarMultiSelect
            id="status-column"
            columnKey="status"
            items={filterItems.status}
            type="default"
            placeholder="Status"
            titleText="Status"
            initialSelectedItems={filterSelections.status}
            onChange={onFilterChange}
          />
        </TableToolbarFilterPanel>
        <Table {...getTableProps()}>
          <TableHead>
            <TableRow>
              {headers.map(header => (
                <TableHeader {...getHeaderProps({ header })}>
                  {header.header}
                </TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow {...getRowProps({ row })}>
                {row.cells.map(cell => {
                  const value = (cell.info && (cell.info.header === 'created_at')) ? (new Date(cell.value)).toLocaleDateString() : cell.value;
                  return <TableCell key={cell.id}>{value}</TableCell>;
                }
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  />
);

export default Example;
