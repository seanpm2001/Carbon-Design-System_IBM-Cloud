import React from 'react';
import { DataTable } from '../..';

import { initialRows, initialHeaders } from './params';

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
      getTableContainerProps,
    }) => (
      <DataTable.TableContainer {...getTableContainerProps()}>
        <DataTable.Table {...getTableProps()}>
          <DataTable.TableHead>
            <DataTable.TableRow>
              {headers.map(header => (
                <DataTable.TableHeader {...getHeaderProps({ header })}>
                  {header.header}
                </DataTable.TableHeader>
              ))}
            </DataTable.TableRow>
          </DataTable.TableHead>
          <DataTable.TableBody>
            {rows.map(row => (
              <DataTable.TableRow {...getRowProps({ row })}>
                {row.cells.map(cell => (
                  <DataTable.TableCell key={cell.id}>
                    {cell.value}
                  </DataTable.TableCell>
                ))}
              </DataTable.TableRow>
            ))}
          </DataTable.TableBody>
        </DataTable.Table>
      </DataTable.TableContainer>
    )}
  />
);

export default Example;
