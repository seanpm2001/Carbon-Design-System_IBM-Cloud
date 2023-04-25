/*
 * Please refer to DataTableWithExternalFilters for usage.
 * This example doesn't provide FilterItems to Data Table and is for backward compatibility only.
 */
 
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
} from './params';

const { withFilters } = DataTableHOC;
const DataTableWithFilters = withFilters(DataTable);

/* eslint-disable react/prop-types */
const Example = () => (
  <DataTableWithFilters
    rows={initialRows}
    headers={initialHeaders}
    initialFilters={{
      port: [],
      status: ['Active', 'Starting'],
      attached_groups: ['Maureens VM Groups'],
    }}
    filterAllLabel="All"
    render={({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getTableProps,
      onInputChange,
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
            items={[
              { id: 3000, label: 3000 },
              { id: 443, label: 443 },
              { id: 80, label: 80 },
            ]}
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
            items={[
              { id: 'Kevins VM Groups', label: 'Kevins VM Groups' },
              { id: 'Maureens VM Groups', label: 'Maureens VM Groups' },
              { id: 'Andrews VM Groups', label: 'Andrews VM Groups' },
            ]}
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
