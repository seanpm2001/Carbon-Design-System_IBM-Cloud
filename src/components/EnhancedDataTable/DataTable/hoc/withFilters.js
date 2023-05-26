import React, { useState, useEffect, useCallback } from 'react';
import debounce from "../../../../utils/debounce";

/* eslint-disable react/prop-types */

/*
 * Higher Order Component that wraps DataTable,
 * returning a new component with filters support
 */
export const computeFilters = (current = {}, input) => {
  if (input && input.columnKey) {
    let selected = [];
    const { selectedItem, selectedItems, value } = input;
    if (input.isDateRange) {
      selected = selectedItems; // array with 2 date objects for start date and end date
    } else if (Object.prototype.hasOwnProperty.call(input, "selectedItem")) {
      if (selectedItem) {
        selected = [selectedItem].map((item) => item.id);
      }
    } else if (Object.prototype.hasOwnProperty.call(input, "selectedItems")) {
      selected = selectedItems.map((item) => item.id);
    } else if (Object.prototype.hasOwnProperty.call(input, 'value')) {
      selected = value;
    }
    const key = input.columnKey;

    return {
      ...current,
      [key]: selected,
    };
  }

  return current;
};

/*
 * transform filters for DropDown, ComboBox, and MultiSelect
 * filterItems: {
 *    attached_groups: [
 *      { id: 'g1', label: 'Kevins VM Groups' },
 *      { id: 'g2', label: 'Maureens VM Groups' },
 *    ]
 * }
 * input:
 *   {
 *      attached_groups: ['g1'],
 *      status...
 *   }
 * output:
 *   {
 *      attached_groups: [{ id: 'g1', label: 'Kevins VM Groups' }],
 *      status...
 *   }
 * Note: if no filterItems provided, value of id will be used for label
 */
const transform = (input, filterItems) => {
  const output = {};
  Object.keys(input).forEach((key) => {
    if (typeof input[key] === 'string') {
      output[key] = input[key];
    } else {
      output[key] = input[key].map((item, i) => {
        if (item instanceof Date) {
          const start = item;
          const end = input[key][i+1];
          if (end instanceof Date) {
            return {
              id: `${start.getTime()}-${end.getTime()}`,
              label: `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`,
              start,
              end,
            };
          }
          return null;
        } else if (filterItems && Array.isArray(filterItems[key])) {
          const filterItem = filterItems[key].find(entry => entry.id === item);
          const { id, label } = filterItem || {};
          if (id && label) {
            return { id, label };
          }
        }
        return { id: item, label: item };
      }).filter(e => e);
    }
  });
  return output;
};

const trimTime = (input) => {
  const output = new Date(input);
  output.setHours(0, 0, 0, 0);
  return output;
};

const filterRows = ({ rows, filterKeys, filters }) => {
  if (filters && Object.keys(filters).length > 0) {
    return Object.keys(filters).reduce((results, key) => {
      const selections = filters[key];

      return results.filter((candidate) => {
        /*
         * filter by key (display value) by default;
         * if filterKey is provided, filter by filterKey (e.g. an id) instead
         */
        const value =
          filterKeys && filterKeys[key]
            ? candidate[filterKeys[key]]
            : candidate[key];

        // date range filtering, trimming the time portion to eliminate errors caused by timezone differences
        if (
          Array.isArray(selections) &&
          selections[0] instanceof Date &&
          selections[1] instanceof Date
        ) {
          const start = trimTime(selections[0]);
          const end = trimTime(selections[1]);
          const valObj = trimTime(value);
          return (
            valObj.getTime() >= start.getTime() &&
            valObj.getTime() <= end.getTime()
          );
        }
        // rename selections? so it's more accurate with the new field
        if (selections && typeof selections === 'string') {
          return selections === value;
        }

        // no selections (all) or a match
        return selections.length === 0 || selections.includes(value);
      });
    }, rows);
  }
  return rows;
};

const withFilters = (WrappedDataTable) => {
  return ({
    render,
    rows,
    headers,
    filterAllLabel,
    initialFilters,
    filterItems,
    filterKeys,
    onExternalFilterChange,
    onExternalFilterRows,
    ...passthroughProps
  }) => {
    const [prevInitialFilters, sePrevInitialFilters] = useState(initialFilters || {});
    const [filters, setFilters] = useState(initialFilters || {});
    const [batchFilters, setBatchFilters] = useState(initialFilters || {});
    const [isFilterPanelOpen, setFilterPanelOpen] = useState(false);
    const [filteredRows, setFilteredRows] = useState(
      !onExternalFilterChange && rows
        ? filterRows({ rows, filterKeys, filters })
        : undefined
    );

    // Reset the applied filters when initialFilters changes
    if (initialFilters !== prevInitialFilters) {
      changeFilters(initialFilters);
      sePrevInitialFilters(initialFilters);
    };

    // If an external filter function is provided then do not filter the rows
    // here. Otherwise do the internal filtering when the rows or filters change.
    useEffect(() => {
      if (!onExternalFilterChange && rows) {
        setFilteredRows(filterRows({ rows, filterKeys, filters }));
      }
    }, [rows, filterKeys, filters, onExternalFilterChange]);

    // Trigger callback whenever the filters change
    useEffect(() => {
      if (onExternalFilterRows) onExternalFilterRows();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    const handleFilterChange = value => {
      if (value.mode === 'batch') {
        const newBatchFilters = computeFilters(filters, value)
        setBatchFilters(newBatchFilters);
      } else {
        const newFilters = computeFilters(filters, value)
        changeFilters(newFilters)
      }
    }

    const changeFilters = useCallback((filters) => {
      setFilters(filters);
      if(onExternalFilterChange) debounce(onExternalFilterChange(filters), 300);
    }, [onExternalFilterChange])

    const handleFilterClear = preservedFilterKeys => {
      const clearedFilters = Object.fromEntries(
        Object.entries(filters).filter(entry => preservedFilterKeys.includes(entry[0]))
      );
      changeFilters(clearedFilters)
    }

    const handleCommitFilters = () => {
      changeFilters(batchFilters)
    }

    const augmentedRender = (renderProps) => {
      const augmentedRenderProps = {
        ...renderProps,
        headers,
        filterItems,
        filterSelections: transform(filters, filterItems) || {},
        isFilterPanelOpen,
        onOpenFilterPanel: () => setFilterPanelOpen(!isFilterPanelOpen),
        onCloseFilterPanel: () => setFilterPanelOpen(false),
        onFilterChange: handleFilterChange,
        onClearAllFilters: handleFilterClear,
        onCommitFilters: handleCommitFilters,
        filterAllLabel,
      };
      return render(augmentedRenderProps);
    };

    return (
      <WrappedDataTable
        {...passthroughProps}
        rows={filteredRows || rows}
        headers={headers}
        render={augmentedRender}
      />
    );
  };
};

export default withFilters;
