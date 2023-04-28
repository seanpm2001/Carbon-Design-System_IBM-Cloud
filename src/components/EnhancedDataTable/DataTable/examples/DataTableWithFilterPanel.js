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
  TableToolbarDateRangeSelect,
  TableToolbarTextInput,
} from '../..';

import {
  initialRows,
  initialHeaders,
  initialFilters,
  filterItems,
  filterKeys,
} from './params';

const { withFilters } = DataTableHOC;
const DataTableWithFilters = withFilters(DataTable);

/* eslint-disable react/prop-types */
const Example = ({ rows: rowsProp, initialFilters: initialFiltersProp, mode, disabledGroupFilter }) => (
  <DataTableWithFilters
    rows={rowsProp || initialRows}
    headers={initialHeaders}
    filterItems={filterItems}
    filterKeys={filterKeys}
    initialFilters={initialFiltersProp || initialFilters}
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
            items={filterItems.port}
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
            items={filterItems.rule}
            type="default"
            placeholder="Rule"
            titleText="Rule"
            initialSelectedItem={filterSelections.rule}
            onChange={onFilterChange}
          />
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
          <TableToolbarMultiSelect
            id="groups-column"
            columnKey="attached_groups"
            items={filterItems.attached_groups}
            type="default"
            placeholder="Attached Groups"
            titleText="Attached Groups"
            initialSelectedItems={filterSelections.attached_groups}
            onChange={onFilterChange}
            disabled={disabledGroupFilter}
          />
          <TableToolbarDateRangeSelect
            id="created-column"
            columnKey="created_at"
            items={filterItems.created_at}
            type="default"
            titleText="Created"
            initialSelectedItems={filterSelections.created_at}
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
