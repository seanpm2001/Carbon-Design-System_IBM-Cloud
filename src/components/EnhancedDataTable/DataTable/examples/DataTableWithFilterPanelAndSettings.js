import React, { useState } from 'react';
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
  TableToolbarMenu,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarButton,
  TableToolbarFilterPanel,
  TableToolbarDropdown,
  TableToolbarMultiSelect,
  TableSettingsSize,
  TableSettingsColumns,
  TableSettingsReset,
} from '../..';

import {
  initialRows,
  initialHeaders,
  initialFilters,
  filterItems,
  filterKeys,
  initialSize,
  initialColsNoProtocol,
  sizeOptions,
  defaultSettings,
} from './params';

const { withFilters, withSettings, withMenuFocus } = DataTableHOC;
const DataTableWithFiltersAndSettings = withSettings(withFilters(DataTable));
const TableToolbarMenuWithMenuFocus = withMenuFocus(TableToolbarMenu);

/* eslint-disable react/prop-types */
const Example = ({ rows: rowsProp, initialFilters: initialFiltersProp, mode }) => {
  const [id, setId] = useState(0);

  return (
    <DataTableWithFiltersAndSettings
      rows={rowsProp || initialRows}
      headers={initialHeaders}
      filterItems={filterItems}
      filterKeys={filterKeys}
      initialFilters={initialFiltersProp || initialFilters}
      filterAllLabel="All"
      initialSize={initialSize}
      initialCols={initialColsNoProtocol}
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
        size,
        onSizeChange,
        cols,
        onColumnsChange,
        onReset,
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
              <TableToolbarMenuWithMenuFocus key={id}>
                <TableSettingsSize
                  size={size}
                  sizeOptions={sizeOptions}
                  onChange={onSizeChange}
                />
                <TableSettingsColumns
                  initialCols={cols}
                  headerOptions={initialHeaders}
                  onChange={onColumnsChange}
                />

                <TableSettingsReset
                  defaultSettings={defaultSettings}
                  onClick={val => {
                    onReset(val);
                    setId(id + 1);
                  }}
                />
              </TableToolbarMenuWithMenuFocus>
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
            <TableToolbarMultiSelect
              id="rule-column"
              columnKey="rule"
              items={filterItems.rule}
              type="default"
              placeholder="Rule"
              titleText="Rule"
              initialSelectedItems={filterSelections.rule}
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
};

export default Example;
