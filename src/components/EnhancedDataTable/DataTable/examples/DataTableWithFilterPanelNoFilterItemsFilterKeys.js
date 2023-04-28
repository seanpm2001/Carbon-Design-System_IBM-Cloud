/*
 * Please refer to DataTableWithFilterPanel for usage.
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
  TableToolbarButton,
  TableToolbarFilterPanel,
  TableToolbarDropdown,
  TableToolbarComboBox,
  TableToolbarMultiSelect,
  TableToolbarTextInput,
} from '../..';

import {
  initialRows,
  initialHeaders,
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
          mode="live"
          onFilterChange={onFilterChange}
          onClearAllFilters={onClearAllFilters}
          onCommitFilters={onCommitFilters}
          onCloseFilterPanel={onCloseFilterPanel}
        >
          <TableToolbarTextInput
            defaultValue={filterSelections.name}
            id="name-column"
            columnKey="name"
            labelText="Name"
            placeholder="Name"
            onChange={onFilterChange}
          />
          <TableToolbarDropdown
            id="port-column"
            columnKey="port"
            items={[
              { id: 3000, label: 3000 },
              { id: 443, label: 443 },
              { id: 80, label: 80 },
            ]}
            type="default"
            label="Port"
            titleText="Port"
            filterAllLabel={filterAllLabel}
            initialSelectedItem={filterSelections.port}
            onChange={onFilterChange}
          />
          <TableToolbarComboBox
            id="rule-column"
            columnKey="rule"
            items={[
              { id: 'Round robin', label: 'Round robin' },
              { id: 'DNS delegation', label: 'DNS delegation' },
            ]}
            type="default"
            placeholder="Rule"
            titleText="Rule"
            initialSelectedItem={filterSelections.rule}
            onChange={onFilterChange}
          />
          <TableToolbarMultiSelect
            id="status-column"
            columnKey="status"
            items={[
              { id: 'Disabled', label: 'Disabled' },
              { id: 'Starting', label: 'Starting' },
              { id: 'Active', label: 'Active' },
            ]}
            type="default"
            placeholder="Status"
            titleText="Status"
            initialSelectedItems={filterSelections.status}
            onChange={onFilterChange}
          />
          <TableToolbarMultiSelect
            id="groups-column"
            columnKey="attached_groups"
            items={[
              { id: 'Kevins VM Groups', label: 'Kevins VM Groups' },
              { id: 'Maureens VM Groups', label: 'Maureens VM Groups' },
              { id: 'Andrews VM Groups', label: 'Andrews VM Groups' },
            ]}
            type="default"
            placeholder="Attached Groups"
            titleText="Attached Groups"
            initialSelectedItems={filterSelections.attached_groups}
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
