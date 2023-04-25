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
  TableToolbarDropdown,
  TableToolbarMultiSelect,
} from '../..';

import {
  initialRows,
  initialHeaders,
  initialExternalFilters,
  filterItems,
  filterKeys,
} from './params';

const { withFilters } = DataTableHOC;
const DataTableWithFilters = withFilters(DataTable);

/* eslint-disable react/prop-types */
const Example = ({ initialFilters: initialFiltersProp }) => (
  <DataTableWithFilters
    rows={initialRows}
    headers={initialHeaders}
    filterItems={filterItems}
    filterKeys={filterKeys}
    initialFilters={initialFiltersProp || initialExternalFilters}
    filterAllLabel="All"
    render={({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getTableProps,
      onInputChange,
      filterItems,
      filterSelections,
      onFilterChange,
      filterAllLabel,
      getTableContainerProps,
    }) => (
      <TableContainer
        className="bx--table-with-filters"
        {...getTableContainerProps()}
      >
        <TableToolbar>
          <TableToolbarDropdown
            id="port-column"
            columnKey="port"
            titleText="Port:"
            label="Port"
            items={filterItems.port}
            type="inline"
            filterAllLabel={filterAllLabel}
            initialSelectedItem={filterSelections.port}
            onChange={onFilterChange}
          />
          <TableToolbarMultiSelect
            id="groups-column"
            columnKey="attached_groups"
            titleText="Attached Groups:"
            placeholder="Filter..."
            items={filterItems.attached_groups}
            type="inline"            
            initialSelectedItems={filterSelections.attached_groups}
            onChange={onFilterChange}
          />
          <TableToolbarContent>
            <TableToolbarSearch
              placeholder="Search table..."
              onChange={onInputChange}
            />
          </TableToolbarContent>
        </TableToolbar>
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
                {row.cells.map(cell => (
                  <TableCell key={cell.id}>{cell.value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )}
  />
);

export default Example;
