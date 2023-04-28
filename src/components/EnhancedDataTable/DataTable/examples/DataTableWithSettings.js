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
  TableSettingsSize,
  TableSettingsColumns,
  TableSettingsReset,
} from '../..';

import {
  initialColsNoProtocol,
  initialRows,
  initialHeaders,
  sizeOptions,
  initialSize,
  defaultSettings,
} from './params';

const { withSettings, withMenuFocus } = DataTableHOC;
const DataTableWithSettings = withSettings(DataTable);
const TableToolbarMenuWithMenuFocus = withMenuFocus(TableToolbarMenu);

const Example = () => {
  const [id, setId] = useState(0);

  return (
    <DataTableWithSettings
      rows={initialRows}
      headers={initialHeaders}
      initialSize={initialSize}
      initialCols={initialColsNoProtocol}
      render={({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getTableProps,
        onInputChange,
        size,
        onSizeChange,
        cols,
        onColumnsChange,
        onReset,
        getTableContainerProps,
      }) => (
        <TableContainer {...getTableContainerProps()}>
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
};

export default Example;
