import { withSettings, withMenuFocus, withFilters } from './hoc';
import {
  TableSettingsSize,
  TableSettingsColumns,
  TableSettingsReset,
} from './TableSettings';

import {
  TableToolbarDropdown,
  TableToolbarMultiSelect,
  TableToolbarFilterPanel,
  TableToolbarDateRangeSelect,
  TableToolbarTextInput,
  TableToolbarComboBox
} from './TableFilters';

import TableToolbarButton from './TableToolbarButton';

const DataTableHOC = {
  withSettings,
  withMenuFocus,
  withFilters,
};

export {
  DataTableHOC,
  TableSettingsSize,
  TableSettingsColumns,
  TableSettingsReset,
  TableToolbarDropdown,
  TableToolbarMultiSelect,
  TableToolbarDateRangeSelect,
  TableToolbarTextInput,
  TableToolbarComboBox,
  TableToolbarFilterPanel,
  TableToolbarButton,
};
