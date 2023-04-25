import * as PALImports from '.';
import { DataTable, CarbonImports } from '..';

const pal = [
  'DataTableHOC',
  'TableSettingsSize',
  'TableSettingsColumns',
  'TableSettingsReset',
  'TableToolbarDropdown',
  'TableToolbarMultiSelect',
  'TableToolbarButton',
  'TableToolbarFilterPanel',
];

const carbon = [
  'Table',
  'TableActionList',
  'TableBatchAction',
  'TableBatchActions',
  'TableBody',
  'TableCell',
  'TableContainer',
  'TableExpandHeader',
  'TableExpandRow',
  'TableExpandedRow',
  'TableHead',
  'TableHeader',
  'TableRow',
  'TableSelectAll',
  'TableSelectRow',
  'TableToolbar',
  'TableToolbarAction',
  'TableToolbarContent',
  'TableToolbarSearch',
  'TableToolbarMenu',
];

describe('DataTable CloudPAL exports', () => {
  pal.forEach(component => {
    it(`should have a named export for Component: ${component}`, () => {
      expect(PALImports[component]).toBeDefined();
    });
  });
});

describe('DataTable Carbon exports via CloudPAL', () => {
  carbon.forEach(component => {
    it(`should have a named export for Component: DataTable.${component}`, () => {
      expect(DataTable[component]).toBeDefined();
    });
  });

  // TODO: why do we want to have PAL exports mixed into carbon imports?
  // [...carbon, ...pal].forEach(component => {
  //   it(`should have a named export for Component: ${component}`, () => {
  //     expect(CarbonImports[component]).toBeDefined();
  //   });
  // });
});

describe('Ensure no name collision between Carbon and PAL', () => {
  carbon.forEach(component => {
    it(`should not have the same (carbon) component name in pal ${component}`, () => {
      expect(pal.includes(component)).toBe(false);
    });
  });

  pal.forEach(component => {
    it(`should not have the same (pal) component name in carbon ${component}`, () => {
      expect(carbon.includes(component)).toBe(false);
    });
  });
});
