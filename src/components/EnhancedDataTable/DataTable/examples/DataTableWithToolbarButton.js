import React from 'react';
import { Download16, Renew16 } from '@carbon/icons-react';
import {
  DataTable,
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
} from '../..';

import { initialRows, initialHeaders } from './params';

const iconData = {
  download: {
    description: 'Export',
    icon: Download16,
  },
  refresh: {
    description: 'Refresh',
    icon: Renew16,
    css: 'optional-css1 optional-css2',
  },
};

/* eslint-disable no-console */
const Example = () => (
  <DataTable
    rows={initialRows}
    headers={initialHeaders}
    render={({
      rows,
      headers,
      getHeaderProps,
      getRowProps,
      getTableProps,
      onInputChange,
      getTableContainerProps,
    }) => (
      <TableContainer
        className="bx--table-with-toolbar-buttons"
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
              type="download"
              iconData={iconData}
              onClick={() => {
                console.log('Export onClick: your implementation goes here.');
              }}
            />
            <TableToolbarButton
              type="refresh"
              iconData={iconData}
              onClick={() => {
                console.log('Refresh onClick: your implementation goes here.');
              }}
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
/* eslint-enable no-console */

export default Example;
