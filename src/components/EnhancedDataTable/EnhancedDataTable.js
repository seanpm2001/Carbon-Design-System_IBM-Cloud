import React, { Fragment, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import useResizeObserver from "use-resize-observer/polyfilled";
import classnames from "classnames";

// Carbon Components
import {
  OverflowMenu,
  OverflowMenuItem,
  Button,
  Pagination,
  DataTableSkeleton,
  DataTable,
  Table,
  TableBatchAction,
  TableBody,
  TableCell,
  TableContainer,
  TableExpandedRow,
  TableExpandHeader,
  TableExpandRow,
  TableHead,
  TableHeader,
  TableRow,
  TableSelectAll,
  TableSelectRow,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  TableToolbarMenu,
  Grid,
  Row,
  Column
} from "@carbon/react";

import { useTranslation } from "react-i18next";

import {
  DataTableHOC,
  TableSettingsSize,
  TableSettingsColumns,
  TableSettingsReset,
  TableToolbarDropdown,
  TableToolbarMultiSelect,
  TableToolbarTextInput,
  TableToolbarDateRangeSelect,
  TableToolbarFilterPanel,
  TableToolbarButton,
} from "./DataTable";

// Utilities
import debounce from "../../utils/debounce";
import uniqueId from "../../utils/uniqueId";
import { local as storage } from "../../utils/storage";

// // Translations
// import translationStrings from './translations';
// import getLocale, { documentLanguage } from '../../utils/getLocale';
// import translationUtils from '../../utils/translate';
// import interpolate from '../../utils/interpolate';

// Icons
import EmptyStateIcon from "../IsometricIcon";

// Child components
import ActionsDropdown from "./children/ActionsDropdown";
import TableBatchActions from "./children/TableBatchActions";
import { TABLE_SORT_DIRECTION } from "./misc/constants";
import { useSortInfo } from "./hooks/useSortInfo";
import { useSortedRows } from "./hooks/useSortedRows";

const { withSettings, withMenuFocus, withFilters } = DataTableHOC;
const WrappedDataTable = withSettings(withFilters(DataTable));
const TableToolbarMenuWithMenuFocus = withMenuFocus(TableToolbarMenu);

const pageSizes = [10, 25, 50, 100];
const fallbackPageSize = 25;
const toolbarBreakpoint = 850;
const paginationBreakpoint = 600;

const onRowClick = (evt, row, rowClick) => {
  if (!row) return;
  const { charCode, target } = evt;
  if (charCode && charCode !== 13) return;
  const clickedCheckbox =
    target.closest("td") &&
    target.closest("td").querySelector(".cds--checkbox-label");
  const clickedToggle =
    target.closest("td") &&
    target.closest("td").querySelector(".cds--toggle__switch");
  const clickedLink =
    target.closest("a") ||
    target.closest("button") ||
    target.closest(".pal--tag--clickable");
  const clickedOverflow = target.closest(
    ".cds--overflow-menu, .cds--overflow-menu-options"
  );
  if (!clickedLink && !clickedCheckbox && !clickedOverflow && !clickedToggle) {
    rowClick(row.id, row);
  }
};

const getPageRows = (rows, pageNumber, pageSize) => {
  if (!rows || rows.length <= pageSize) return rows;
  const start = (pageNumber - 1) * pageSize;
  const end = start + pageSize;
  return rows.slice(start, end);
};

const getPageSize = (id, initialPageSize) => {
  const size = Number(storage.getItem(`${id}-pageSize`));
  if (pageSizes.indexOf(size) > -1) return size;
  // Otherwise the stored value is not valid so remove it
  if (size) storage.removeItem(`${id}-pageSize`);

  if (initialPageSize && pageSizes.indexOf(initialPageSize) > -1) {
    return initialPageSize;
  }
  return fallbackPageSize;
};

const getRowSize = (id, initialSize, sizeOptions) => {
  const size = storage.getItem(`${id}-rowSize`);
  if (sizeOptions.indexOf(size) > -1) return size;

  // Otherwise the stored value is not valid so remove it
  if (size) storage.removeItem(`${id}-rowSize`);
  return initialSize;
};

const getCols = (id, initialCols, validCols) => {
  const cols = storage.getItem(`${id}-columnKeys`) || "";
  if (cols.split(",").every((c) => validCols.indexOf(c) > -1)) {
    return cols.split(",");
  }

  // Otherwise the stored value is not valid so remove it
  if (cols) storage.removeItem(`${id}-columnKeys`);
  return (initialCols || validCols).sort();
};

const getExternalFilters = (id, filters, initialFilters) => {
  // If initialFilters are provided then always use those and ignore storage
  if (initialFilters) return initialFilters;

  // Try to make sure the stored filters are valid
  const storedFilters = storage.getItem(`${id}-filters`);
  if (storedFilters) {
    try {
      const parsedFilters = JSON.parse(storedFilters);
      if (typeof parsedFilters === "object") {
        // We only care about keys that are part of the current filters
        const keys = Object.keys(parsedFilters).filter((k) =>
          filters.find((f) => f.columnKey === k)
        );
        if (keys.every((k) => Array.isArray(parsedFilters[k]))) {
          const restoredFilters = {};
          keys.forEach((k) => {
            restoredFilters[k] = parsedFilters[k];
          });
          return restoredFilters;
        }
      }
      storage.removeItem(`${id}-filters`);
    } catch (e) {
      storage.removeItem(`${id}-filters`);
    }
  }

  // Otherwise no filters
  return {};
};

const formatCell = (rows, rowId, cell) => {
  const row = rows.find((r) => r.id === rowId);
  return (row && row[`${cell.info.header}__format`]) || cell.value;
};

const shouldShowPagination = (rowCount, hidePagination) => {
  if (!rowCount) return false;
  if (hidePagination === "small" && rowCount > pageSizes[0]) return true;
  return !hidePagination;
};

const getCellProps = (cell, headers, cellProperties) => {
  const cellProps = {};
  const header =
    cell &&
    headers &&
    cell.info &&
    cell.info.header &&
    headers.find((h) => h.key === cell.info.header);
  if (header) {
    if (header.className) cellProps.className = header.className;
  }
  if (cellProperties)
    Object.assign(cellProps, cellProperties(cell, headers, cellProps));
  return cellProps;
};

const getDataItem = (rowId, dataItems) =>
  rowId && (dataItems || []).find((item) => item && item.id === rowId);
const mapToDataItems = (rowIds, dataItems) =>
  (rowIds || []).map((rid) => getDataItem(rid, dataItems)).filter((r) => !!r);

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const getDisplayedRows = (pageNumber, pageSize, sortedRows) => {
  if (pageNumber && pageSize && sortedRows) {
    const start = (pageNumber - 1) * pageSize;
    const end = start + pageSize;
    const displayedRows = sortedRows.slice(start, end);
    return displayedRows;
  } else return null;
};

const TableHiddenExpandRow = ({ children, ...rest }) => (
  <TableRow {...rest}>
    <TableCell></TableCell>
    {children}
  </TableRow>
);
TableHiddenExpandRow.propTypes = {
  children: PropTypes.node,
};
TableHiddenExpandRow.defaultProps = {
  children: undefined,
};

const EnhancedDataTable = ({
  locale,
  id,
  title,
  defaultSearchValue,
  description,
  rows: allRows,
  collator,
  headers: allHeaders,
  forceSkeletonToShow,
  initialCols,
  initialSize,
  initialFilters,
  sizeOptions,
  sortRow,
  isLastPage,
  filterRows,
  hasSearch,
  actions,
  actionsDropdown,
  batchActions,
  rowActions,
  rowDetail,
  rowDetailFilter,
  hideHeader,
  hasRowDetail,
  rowClick,
  rowProperties,
  cellProperties,
  hidePagination,
  hideEditCols,
  hideEditRowSize,
  isSortable,
  filterPanel,
  filters,
  radio,
  useZebraStyles,
  onSelectionChange,
  className,
  emptyStateTitle,
  emptyStateDescription: emptyStateDescriptionProp,
  emptyStateIcon: emptyStateIconProp,
  onSortChange,
  onFilterChange: onFilterChangeProp,
  debounceTime,
  onExternalFilterChange,
  filterPanelMode,
  totalRowCount,
  pageNumber: pageNumberProp,
  onPaginationChange,
  initialPageSize,
  onDownload,
  onRefresh,
  filterPlaceholder,
  clearSelection,
  toolbarLabel,
  disableSelectAll,
  initialSortInfo: propInitialSortInfo,
  rowExpandHeaderId,
  onDisplayedRowsChange,
  light,
}) => {
  const { t: translate } = useTranslation("EnhancedDataTable");

  const [defaultCols] = useState(
    (initialCols || allHeaders.map((h) => h.key)).sort()
  );
  const [pageSize, setPageSize] = useState(
    hidePagination === true ? Infinity : getPageSize(id, initialPageSize)
  );
  const [pageNumber, setPageNumber] = useState(1);
  const [currentSelection, setCurrentSelection] = useState();
  const [currentRowSize, setCurrentRowSize] = useState(
    getRowSize(id, initialSize, sizeOptions)
  );
  const [currentCols, setCurrentCols] = useState(
    getCols(
      id,
      initialCols,
      allHeaders.map((h) => h.key)
    )
  );
  const [currentExternalFilters, setCurrentExternalFilters] = useState(() =>
    getExternalFilters(id, filters, initialFilters)
  );
  const previousExternalFilters = usePrevious(currentExternalFilters);

  // initialFilters that were passed in, or filters from localStorage
  const [initialFiltersPlus] = useState(() =>
    getExternalFilters(id, filters, initialFilters)
  );

  const [hasFilterPanel, setHasFilterPanel] = useState(
    filters && (filters.length > 2 || filterPanel)
  );
  const [sortInfo, setSortInfo] = useSortInfo(propInitialSortInfo);
  const [sortedRows] = useSortedRows(allRows, sortInfo, collator);

  const [stringFilterCallback, setStringFilterCallback] = useState();

  const [resetId, setResetId] = useState(0);

  const tableRef = useRef();
  const { width: tableWidth } = useResizeObserver({ ref: tableRef });

  const [uid] = useState(() => uniqueId("")); // use for anything that needs a unique id

  let filterItems;
  let filterKeys;
  if (filters) {
    filterItems = {};
    filterKeys = {};
    filters.forEach((f) => {
      filterItems[f.columnKey] = f.items;
      filterKeys[f.columnKey] = f.filterKey || f.columnKey;
    });
  }

  let emptyStateIcon = <EmptyStateIcon id={id} icon="EMPTY" />;
  if (typeof emptyStateIconProp === "string") {
    emptyStateIcon = <img src={emptyStateIconProp} alt="" />;
  } else if (emptyStateIconProp) {
    emptyStateIcon = emptyStateIconProp;
  }

  let emptyStateDescription = <p>{translate("emptyStateDescription")}</p>;
  if (typeof emptyStateDescriptionProp === "string") {
    emptyStateDescription = <p>{emptyStateDescriptionProp}</p>;
  } else if (emptyStateDescriptionProp) {
    emptyStateDescription = emptyStateDescriptionProp;
  }

  useEffect(() => {
    if (onFilterChangeProp) {
      const debouncedStringFilterCallback = debounce(
        onFilterChangeProp,
        debounceTime
      );
      const stringFilterCallbackWrapper = (evt) =>
        debouncedStringFilterCallback(evt.target.value);
      setStringFilterCallback(() => stringFilterCallbackWrapper);
    } else {
      setStringFilterCallback(undefined);
    }
  }, [onFilterChangeProp, debounceTime]);

  useEffect(() => {
    // Place floating menus in the main element if there are no other floating menu
    // containers found. A11y requires them to be inside an element with a landmark
    // role so defaulting to document.body doesn't work.
    if (!tableRef.current.closest("[data-floating-menu-container]")) {
      (document.querySelector("main") || document.body).setAttribute(
        "data-floating-menu-container",
        "true"
      );
    }
  }, [tableRef]);

  useEffect(() => {
    setHasFilterPanel(
      filters &&
        (filters.length > 2 || filterPanel || tableWidth < toolbarBreakpoint)
    );
  }, [filters, filterPanel, tableWidth]);

  useEffect(() => {
    setPageSize(
      hidePagination === true ? Infinity : getPageSize(id, initialPageSize)
    );
  }, [hidePagination, id, initialPageSize]);

  // Update selected rows when `allRows` prop changes. This makes sure that if
  // the row no longer exists it's removed from the selection.
  useEffect(() => {
    if (allRows) {
      const selection = [];
      const preselected = allRows.filter((r) => r.isSelected);
      if (preselected.length) {
        preselected.forEach((r) => r && selection.push(r.id));
      } else if (currentSelection && currentSelection.length) {
        const allRowIds = allRows.map((r) => r.id);
        currentSelection.forEach((rid) => {
          if (rid && allRowIds.includes(rid)) selection.push(rid);
        });
      }
      setCurrentSelection(selection.sort());
    } else {
      setCurrentSelection([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allRows]);

  // Call the `onSelectionChange` function when the selection changes
  useEffect(() => {
    if (currentSelection && onSelectionChange) {
      onSelectionChange(
        currentSelection,
        mapToDataItems(currentSelection, allRows)
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSelectionChange, currentSelection]);

  useEffect(() => {
    if (onSortChange) onSortChange(sortInfo);
  }, [sortInfo, onSortChange]);

  useEffect(() => {
    const isDefault = currentRowSize === initialSize;
    const storedValue = storage.getItem(`${id}-rowSize`);
    if (isDefault) {
      if (storedValue) storage.removeItem(`${id}-rowSize`);
    } else storage.setItem(`${id}-rowSize`, currentRowSize);
  }, [id, initialSize, currentRowSize]);

  useEffect(() => {
    const isDefault = currentCols.join(",") === defaultCols.join(",");
    const storedValue = storage.getItem(`${id}-columnKeys`);
    if (isDefault) {
      if (storedValue) storage.removeItem(`${id}-columnKeys`);
    } else storage.setItem(`${id}-columnKeys`, currentCols.join(","));
  }, [id, defaultCols, currentCols]);

  useEffect(() => {
    const isEmpty = Object.keys(currentExternalFilters).length === 0;
    const storedValue = storage.getItem(`${id}-filters`);
    if (isEmpty) {
      if (storedValue) storage.removeItem(`${id}-filters`);
    } else {
      storage.setItem(`${id}-filters`, JSON.stringify(currentExternalFilters));
    }
  }, [id, currentExternalFilters]);

  // Call individual external filter onChange functions
  useEffect(() => {
    if (filters) {
      filters.forEach((fp) => {
        const previous =
          previousExternalFilters && previousExternalFilters[fp.columnKey];
        const current =
          currentExternalFilters && currentExternalFilters[fp.columnKey];
        if (
          fp.onChange &&
          JSON.stringify(previous) !== JSON.stringify(current)
        ) {
          if (fp.filterType === "multiselect") {
            fp.onChange(current);
          } else {
            fp.onChange(current && current.length ? current[0] : undefined);
          }
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentExternalFilters]);

  useEffect(() => {
    if (pageNumber && pageSize && onPaginationChange) {
      onPaginationChange({ page: pageNumber, pageSize });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, pageSize]);

  useEffect(() => {
    if (pageNumber && pageSize && sortedRows && onDisplayedRowsChange) {
      const displayedRows = getDisplayedRows(pageNumber, pageSize, sortedRows);
      onDisplayedRowsChange(displayedRows);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber, pageSize, sortedRows]);

  useEffect(() => {
    if (clearSelection) setCurrentSelection([]);
  }, [clearSelection]);

  const defaultFilterRows = ({ rowIds, headers, inputValue }) => {
    const filteredRowIds = [];
    (rowIds || []).forEach((rowId) => {
      const row = (allRows || []).find((r) => r.id && r.id === rowId);
      if (row) {
        const rowString = headers
          .map((h) => row[`${h.key}__string`] || row[h.key])
          .join("~~");
        if (rowString.toLowerCase().includes(inputValue.toLowerCase())) {
          filteredRowIds.push(rowId);
        } else if (rowDetailFilter && rowDetailFilter(rowId, inputValue)) {
          filteredRowIds.push(rowId);
        }
      }
    });
    return filteredRowIds;
  };

  const translateWithId = (id, interpolation, options) => {
    if (id === "carbon.table.header.icon.description") {
      if (options?.isSortHeader) {
        if (options.sortDirection === options.sortStates.NONE) {
          return translate("sortAscending");
        }
        if (options.sortDirection === options.sortStates.ASC) {
          return translate("sortDescending");
        }
        return translate("removeSort");
      }
      return translate("sortAscending");
    }
    return translate(id, interpolation, options);
  };

  const onSelectAll = (rows) => {
    const selection = currentSelection || [];
    const rowIds = (rows || []).map((r) => r.id);
    const someSelected = rowIds.some((rid) => selection.includes(rid));
    if (someSelected) {
      // If some rows on this page are selected then remove them from the selection
      setCurrentSelection(selection.filter((rid) => !rowIds.includes(rid)));
    } else {
      // Add all rows on this page to the selection
      setCurrentSelection(selection.concat(rowIds).sort());
    }
  };

  const getTotalItemsForPagination = (rows) => {
    if (totalRowCount === "unknown") {
      return undefined;
    }
    return typeof totalRowCount === "number" ? totalRowCount : rows.length;
  };

  const onSelectRow = (row) => {
    const selection = currentSelection || [];
    if (radio) setCurrentSelection([row.id]);
    else if (selection.find((rid) => rid === row.id)) {
      setCurrentSelection(selection.filter((rid) => rid !== row.id));
    } else {
      setCurrentSelection(selection.concat(row.id).sort());
    }
  };

  const onChangeExternalFilter = ({
    selectedItem,
    selectedItems,
    value,
    columnKey,
  }) => {
    const newFilters = { ...currentExternalFilters };
    if (selectedItems) {
      if (selectedItems.length > 0) {
        newFilters[columnKey] = selectedItems.map((s) => s.id);
      } else {
        delete newFilters[columnKey];
      }
    } else if (selectedItem) {
      newFilters[columnKey] = [selectedItem.id];
    } else if (value) {
      newFilters[columnKey] = value;
    } else {
        delete newFilters[columnKey];
    }
    setCurrentExternalFilters(newFilters);
  };

  const onHeaderClick = React.useCallback(
    (event) => {
      const { currentTarget } = event;
      const {
        headerKey,
        sortCycle,
        sortDirection: oldDirection,
      } = currentTarget.dataset;

      setSortInfo({ header: headerKey, sortCycle, oldDirection });
    },
    [setSortInfo]
  );

  const renderFilterFields = (
    filterAllLabel,
    filterSelections,
    onFilterChange,
    additionalProps
  ) =>
    filters.map((field) => {
      let FieldComponent = TableToolbarDropdown;
      let fieldProps = {
        filterAllLabel,
        initialSelectedItem: filterSelections[field.columnKey],
        light: true,
      };
      if (field.filterType === "multiselect") {
        FieldComponent = TableToolbarMultiSelect;
        fieldProps = {
          initialSelectedItems: filterSelections[field.columnKey],
          light: true,
          placeholder: translate("multiselectPlaceholder"),
        };
      }
      if (field.filterType === "daterangeselect") {
        FieldComponent = TableToolbarDateRangeSelect;
      }
      if (field.filterType === 'textinput') {
        FieldComponent = TableToolbarTextInput;
        fieldProps = {
          defaultValue: filterSelections[field.columnKey],
          debounceTime,
          light: true,
        };
      }
      return (
        <FieldComponent
          {...fieldProps}
          {...field}
          {...additionalProps}
          locale={locale}
          key={field.id}
          onChange={(args) => {
            onChangeExternalFilter(args);
            onFilterChange(args);
          }}
          disabled={!allRows || forceSkeletonToShow || field.disabled}
        />
      );
    });

  // Properties for the Select All checkbox in the header
  const getSelectAllProps = (rows = []) => {
    const pageRows = getPageRows(rows, pageNumber, pageSize);
    const allSelected =
      Boolean(currentSelection) &&
      pageRows.length > 0 &&
      pageRows.every((r) => r && currentSelection.includes(r.id));
    const someSelected =
      Boolean(currentSelection) &&
      pageRows.length > 0 &&
      pageRows.some((r) => r && currentSelection.includes(r.id));
    const checked = allSelected;
    const indeterminate = !allSelected && someSelected;
    const translationKey =
      checked || indeterminate
        ? "carbon.table.all.unselect"
        : "carbon.table.all.select";
    return {
      ariaLabel: translate(translationKey, { isDotSeparator: false }),
      checked,
      id: `${id}__select-all`,
      indeterminate,
      name: "select-all",
      disabled: pageRows.length === 0 || disableSelectAll,
      onSelect: () => onSelectAll(pageRows),
    };
  };

  // Properties for the row selection checkbox
  const getSelectRowProps = (row, rowProperties) => {
    if (!row) return {};
    const translationKey = (currentSelection || []).includes(row.id)
      ? "carbon.table.row.unselect"
      : "carbon.table.row.select";
    const rowProps = {
      checked: !!(currentSelection && currentSelection.includes(row.id)),
      onSelect: () => onSelectRow(row),
      id: `${id}__select-row-${row.id}`,
      name: `select-row-${row.id}`,
      ariaLabel: translate(translationKey, { isDotSeparator: false }),
      disabled: row.disabled,
      radio: radio || null,
    };
    if (rowProperties) Object.assign(rowProps, rowProperties(row, rowProps));

    return rowProps;
  };

  const extraColumnCount = [
    rowDetail,
    batchActions || onSelectionChange,
    rowActions,
  ].filter((c) => !!c).length;

  const shouldShowBatchActions =
    batchActions && currentSelection && currentSelection.length;

  return (
    <div
      ref={tableRef}
      className={classnames("pal--data-table", className, {
        "pal--data-table--no-header": hideHeader,
        "pal--data-table--light": light,
      })}
    >
      <WrappedDataTable
        locale={locale}
        translateWithId={translateWithId}
        rows={sortedRows || []}
        headers={allHeaders}
        sortRow={sortRow}
        filterRows={filterRows || defaultFilterRows}
        initialCols={currentCols}
        initialSize={currentRowSize}
        initialFilters={initialFiltersPlus}
        filterItems={filterItems}
        filterKeys={filterKeys}
        isSortable={isSortable}
        filterAllLabel={translate("all")}
        radio={radio}
        onExternalFilterChange={onExternalFilterChange}
        onExternalFilterRows={() => setPageNumber(1)}
        render={({
          rows,
          headers,
          cols,
          getTableProps,
          getRowProps,
          getHeaderProps,
          getTableContainerProps,
          getExpandHeaderProps,
          onInputChange,
          size,
          onSizeChange,
          onColumnsChange,
          onReset,
          filterSelections,
          isFilterPanelOpen,
          onOpenFilterPanel,
          onCloseFilterPanel,
          onFilterChange,
          onClearAllFilters,
          onCommitFilters,
          filterAllLabel,
        }) => (
          <Fragment>
            <TableContainer
              className={classnames({ "cds--table-with-filters": !!filters })}
              title={title}
              description={description}
              {...getTableContainerProps()}
            >
              {!hideHeader && (
                <Fragment>
                  <TableToolbar
                    aria-label={toolbarLabel || `data table toolbar ${uid}`}
                  >
                    {batchActions && allRows && (
                      <TableBatchActions
                        shouldShowBatchActions={!!shouldShowBatchActions}
                        totalSelected={
                          currentSelection ? currentSelection.length : 0
                        }
                        totalRowCount={rows ? rows.length : 0}
                        onCancel={() => setCurrentSelection([])}
                        onSelectAll={() =>
                          setCurrentSelection(
                            (rows || []).map((r) => r.id).sort()
                          )
                        }
                        hideSelectAll={disableSelectAll}
                        translateWithId={translateWithId}
                      >
                        {batchActions(
                          mapToDataItems(currentSelection, allRows)
                        ).map((action) => {
                          const onClick = action.onClick
                            ? () =>
                                action.onClick(
                                  mapToDataItems(currentSelection, allRows)
                                )
                            : null;
                          return (
                            <TableBatchAction
                              key={action.label}
                              {...action}
                              onClick={onClick}
                              tabIndex={
                                currentSelection && currentSelection.length
                                  ? 0
                                  : -1
                              }
                            >
                              {action.label}
                            </TableBatchAction>
                          );
                        })}
                      </TableBatchActions>
                    )}
                    {filters &&
                      !hasFilterPanel &&
                      renderFilterFields(
                        filterAllLabel,
                        filterSelections,
                        onFilterChange,
                        { type: "inline" }
                      )}
                    <TableToolbarContent aria-hidden={!!shouldShowBatchActions}>
                      {hasSearch && (
                        <TableToolbarSearch
                          onChange={(val) => {
                            setPageNumber(1);
                            (stringFilterCallback || onInputChange)(val);
                          }}
                          defaultExpanded
                          defaultValue={defaultSearchValue}
                          disabled={!allRows || forceSkeletonToShow}
                          persistent
                          translateWithId={translateWithId}
                          tabIndex={shouldShowBatchActions ? -1 : 0}
                          placeholder={filterPlaceholder}
                          labelText={`${filterPlaceholder || "Search"} ${uid}`}
                        />
                      )}
                      {hasFilterPanel && (
                        <TableToolbarButton
                          locale={locale}
                          type="filter"
                          disabled={
                            !allRows || isFilterPanelOpen || forceSkeletonToShow
                          }
                          onClick={onOpenFilterPanel}
                          tabIndex={shouldShowBatchActions ? -1 : 0}
                        />
                      )}
                      {onDownload && (
                        <TableToolbarButton
                          locale={locale}
                          type="download"
                          disabled={
                            !allRows ||
                            allRows.length === 0 ||
                            forceSkeletonToShow
                          }
                          onClick={onDownload}
                          tabIndex={shouldShowBatchActions ? -1 : 0}
                        />
                      )}
                      {onRefresh && (
                        <TableToolbarButton
                          locale={locale}
                          type="refresh"
                          disabled={!allRows || forceSkeletonToShow}
                          onClick={onRefresh}
                          tabIndex={shouldShowBatchActions ? -1 : 0}
                        />
                      )}
                      {(!hideEditCols || !hideEditRowSize) && (
                        <TableToolbarMenuWithMenuFocus
                          key={resetId}
                          locale={locale}
                          tabIndex={shouldShowBatchActions ? -1 : 0}
                          disabled={!allRows}
                        >
                          {!hideEditRowSize && allRows && (
                            <TableSettingsSize
                              locale={locale}
                              size={size}
                              sizeOptions={sizeOptions}
                              onChange={(newSize) => {
                                onSizeChange(newSize);
                                setCurrentRowSize(newSize);
                              }}
                            />
                          )}
                          {!hideEditCols && allRows && (
                            <TableSettingsColumns
                              locale={locale}
                              initialCols={cols}
                              headerOptions={allHeaders}
                              onChange={(newCols) => {
                                newCols.sort();
                                onColumnsChange(newCols);
                                setCurrentCols(newCols);
                              }}
                            />
                          )}
                          {allRows && (
                            <TableSettingsReset
                              locale={locale}
                              defaultSettings={{
                                defaultSize: initialSize,
                                defaultCols,
                              }}
                              onClick={(defaultSettings) => {
                                onReset(defaultSettings);
                                setCurrentRowSize(defaultSettings.defaultSize);
                                setCurrentCols(defaultSettings.defaultCols);
                                setResetId(resetId + 1);
                              }}
                            />
                          )}
                        </TableToolbarMenuWithMenuFocus>
                      )}
                      {(actions || []).map((action) => (
                        <Button
                          key={action.label}
                          {...action}
                          tabIndex={
                            batchActions &&
                            currentSelection &&
                            currentSelection.length
                              ? -1
                              : 0
                          }
                        >
                          {action.label}
                        </Button>
                      ))}
                      {actionsDropdown && (
                        <ActionsDropdown
                          label={actionsDropdown.label}
                          kind={actionsDropdown.kind}
                          actions={actionsDropdown.actions}
                        />
                      )}
                    </TableToolbarContent>
                  </TableToolbar>
                  {hasFilterPanel && (
                    <TableToolbarFilterPanel
                      locale={locale}
                      isOpen={isFilterPanelOpen}
                      headers={allHeaders}
                      filterSelections={filterSelections}
                      mode={filterPanelMode}
                      onFilterChange={(args) => {
                        onChangeExternalFilter(args);
                        onFilterChange(args);
                      }}
                      onClearAllFilters={(args) => {
                        setCurrentExternalFilters({});
                        onClearAllFilters(args);
                      }}
                      onCommitFilters={onCommitFilters}
                      onCloseFilterPanel={onCloseFilterPanel}
                      disabled={!allRows || forceSkeletonToShow}
                    >
                      {renderFilterFields(
                        filterAllLabel,
                        filterSelections,
                        onFilterChange
                      )}
                    </TableToolbarFilterPanel>
                  )}
                </Fragment>
              )}
              <div className="pal--data-table__table-wrapper">
                {!allRows || forceSkeletonToShow ? (
                  <DataTableSkeleton showHeader={false} showToolbar={false} />
                ) : (
                  <Table {...getTableProps()} useZebraStyles={useZebraStyles}>
                    <TableHead>
                      <TableRow>
                        {rowDetail && (
                          <TableExpandHeader
                            id={rowExpandHeaderId}
                            {...getExpandHeaderProps()}
                          />
                        )}
                        {(batchActions || onSelectionChange) &&
                          (radio ? (
                            <TableHeader />
                          ) : (
                            <TableSelectAll {...getSelectAllProps(rows)} />
                          ))}
                        {headers.map((header) => {
                          const sortDirectionForThisCell =
                            header.key === sortInfo?.header
                              ? sortInfo.direction
                              : TABLE_SORT_DIRECTION.NONE;
                          return (
                            <TableHeader
                              {...getHeaderProps({
                                header,
                              })}
                              translateWithId={translateWithId}
                              sortDirection={sortDirectionForThisCell}
                              isSortHeader={header.key === sortInfo?.header}
                              isSortable={
                                header.isSortable === false ? false : isSortable
                              }
                              data-header-key={header.key}
                              data-sort-cycle={header.sortCycle}
                              data-sort-direction={sortDirectionForThisCell}
                              className={header.className}
                              onClick={onHeaderClick}
                            >
                              {header.header}
                            </TableHeader>
                          );
                        })}
                        {rowActions && <TableHeader />}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.length === 0 && allRows.length > 0 && (
                        <TableRow className="pal--data-table__no-hover">
                          <TableCell
                            colSpan={headers.length + extraColumnCount}
                          >
                            {translate("noItems")}
                          </TableCell>
                        </TableRow>
                      )}
                      {rows.length === 0 && allRows.length === 0 && (
                        <TableRow className="pal--data-table__no-hover">
                          <TableCell
                            colSpan={headers.length + extraColumnCount}
                          >
                            <Grid className="pal--data-table__empty-state">
                              <Row>
                                <Column
                                  sm={4}
                                  lg={{ offset: 1, span: 15 }}
                                  className="pal--data-table__empty-state-col"
                                >
                                  <div className="pal--data-table__empty-state-icon">
                                    {emptyStateIcon}
                                  </div>
                                  <h3>
                                    {emptyStateTitle ||
                                      translate("emptyStateTitle")}
                                  </h3>
                                  <div className="pal--data-table__empty-state-description">
                                    {emptyStateDescription}
                                  </div>
                                </Column>
                              </Row>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      )}
                      {rows.length > 0 &&
                        (typeof pageNumberProp === "number"
                          ? rows
                          : getPageRows(rows, pageNumber, pageSize)
                        ).map((row) => {
                          const dataItem = getDataItem(row && row.id, allRows);
                          const canShowRowDetail =
                            dataItem && hasRowDetail(row.id, dataItem);
                          const ExpandRowComponent = canShowRowDetail
                            ? TableExpandRow
                            : TableHiddenExpandRow;
                          const RowComponent = rowDetail
                            ? ExpandRowComponent
                            : TableRow;
                          const rowClickHandler =
                            dataItem && rowClick
                              ? (evt) => onRowClick(evt, dataItem, rowClick)
                              : null;
                          const rowItemActions =
                            dataItem && rowActions
                              ? rowActions(row.id, dataItem)
                              : null;
                          const rowProps = getRowProps({ row });
                          if (RowComponent === TableExpandRow) {
                            rowProps.expandHeader = rowExpandHeaderId;
                          }
                          return (
                            <React.Fragment key={row.id}>
                              <RowComponent
                                {...rowProps}
                                isSelected={
                                  row &&
                                  currentSelection &&
                                  currentSelection.includes(row.id)
                                }
                                onClick={rowClickHandler}
                                onKeyPress={rowClickHandler}
                                tabIndex={rowClick ? "0" : undefined}
                                className={
                                  rowClick
                                    ? "pal--data-table__row-clickable"
                                    : null
                                }
                                {...((rowProperties &&
                                  rowProperties(row, rowProps)) ||
                                  {})}
                              >
                                {(batchActions || onSelectionChange) && (
                                  <TableSelectRow
                                    {...getSelectRowProps(row, rowProperties)}
                                  />
                                )}
                                {row.cells.map((cell) => (
                                  <TableCell
                                    key={cell.id}
                                    {...getCellProps(
                                      cell,
                                      headers,
                                      cellProperties
                                    )}
                                  >
                                    {formatCell(allRows, row.id, cell)}
                                  </TableCell>
                                ))}
                                {rowActions && (
                                  <TableCell className="pal--data-table__row-actions-cell">
                                    {rowItemActions &&
                                      rowItemActions.length > 0 && (
                                        <OverflowMenu
                                          flipped
                                          ariaLabel={translate("overflowMenu")}
                                          iconDescription={translate(
                                            "overflowMenu"
                                          )}
                                        >
                                          {rowItemActions.map((action) => {
                                            if (React.isValidElement(action)) {
                                              return action;
                                            }
                                            const onClick = action.onClick
                                              ? () =>
                                                  action.onClick(
                                                    row.id,
                                                    dataItem
                                                  )
                                              : null;
                                            return (
                                              <OverflowMenuItem
                                                key={action.itemText}
                                                {...action}
                                                onClick={onClick}
                                                requireTitle
                                              />
                                            );
                                          })}
                                        </OverflowMenu>
                                      )}
                                  </TableCell>
                                )}
                              </RowComponent>
                              {canShowRowDetail && row.isExpanded && (
                                <TableExpandedRow
                                  colSpan={headers.length + extraColumnCount}
                                  {...((rowProperties &&
                                    rowProperties(row, rowProps, "expanded")) ||
                                    {})}
                                >
                                  {dataItem && rowDetail(row.id, dataItem)}
                                </TableExpandedRow>
                              )}
                            </React.Fragment>
                          );
                        })}
                    </TableBody>
                  </Table>
                )}
              </div>
            </TableContainer>
            {shouldShowPagination(rows.length, hidePagination) && (
              <Pagination
                className={classnames({
                  "pal--data-table__pagination--sm":
                    tableWidth < paginationBreakpoint,
                })}
                page={
                  typeof pageNumberProp === "number"
                    ? pageNumberProp
                    : pageNumber
                }
                isLastPage={!!isLastPage}
                pagesUnknown={totalRowCount === "unknown"}
                pageSize={pageSize}
                disabled={!!forceSkeletonToShow}
                onChange={(change) => {
                  const storedPageSize = Number(
                    storage.getItem(`${id}-pageSize`)
                  );
                  const defaultPageSize = initialPageSize || fallbackPageSize;
                  if (storedPageSize && change.pageSize === defaultPageSize) {
                    storage.removeItem(`${id}-pageSize`);
                  } else if (change.pageSize !== defaultPageSize) {
                    storage.setItem(`${id}-pageSize`, change.pageSize);
                  }
                  if (onPaginationChange) onPaginationChange(change);
                  else {
                    setPageNumber(change.page);
                    setPageSize(change.pageSize);
                  }
                }}
                totalItems={getTotalItemsForPagination(rows)}
                pageSizes={pageSizes}
                backwardText={translate("previousPage")}
                forwardText={translate("nextPage")}
                itemRangeText={(min, max, total) =>
                  total === 1
                    ? translate("itemRangeSingle")
                    : translate("itemRange", { min, max, total })
                }
                itemsPerPageText={translate("itemsPerPage")}
                pageNumberText={translate("pageNumber")}
                pageRangeText={(current, total) =>
                  total === 1
                    ? translate("pageRangeSingle")
                    : translate("pageRange", { current, total })
                }
                itemText={(min, max) => translate("itemText", { min, max })}
                pageText={(pageNum) =>
                  translate("pageText", { pageNumber: pageNum })
                }
              />
            )}
          </Fragment>
        )}
      />
    </div>
  );
};

EnhancedDataTable.propTypes = {
  /**
   * The locale used for translating the strings.
   */
  locale: PropTypes.string,
  /**
   * A unique identifier for the table. Used for saving certain options into local storage.
   */
  id: PropTypes.string.isRequired,
  /**
   * The title to display above the table.
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * The value used to pre-populate the search input.
   */
  defaultSearchValue: PropTypes.string,
  /**
   * The description to display above the table, below the title.
   */
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * The row data to display in the table. Each item must have a unique id.
   */
  rows: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      disabled: PropTypes.bool,
      isSelected: PropTypes.bool,
      isExpanded: PropTypes.bool,
    })
  ),
  /**
   * Column headers. The key corresponds to a property of each item in the row data. Set the `isSortable` property to `false` to disable sorting for the column. If a `className` is provided for a column header then it will be applied to the <th> element as well as every <td> in the column.
   */
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      header: PropTypes.node.isRequired,
      isSortable: PropTypes.oneOf([false]),
      className: PropTypes.string,
      sortCycle: PropTypes.string,
    })
  ).isRequired,
  /**
   * Initial columns (keys) to display.
   */
  initialCols: PropTypes.arrayOf(PropTypes.string),
  /**
   * Hide the option to edit the columns.
   */
  hideEditCols: PropTypes.bool,
  /**
   * Initial row size.
   */
  initialSize: PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"]),
  /**
   * Available row size options.
   */
  sizeOptions: PropTypes.arrayOf(
    PropTypes.oneOf(["xs", "sm", "md", "lg", "xl"])
  ),
  /**
   * Initial filters to set. For example, if you have a multiselect filter on a `status` field then it might look like this: { status: ['Active', 'Starting'] }. If initial filters are provided then any persisted filters are ignored.
   */
  initialFilters: PropTypes.shape({}),
  /**
   * Array of property objects that define the filter components to display. The TableToolbarDropdown, TableToolbarMultiSelect, TableToolbarDateRangeSelect, and TableToolbarTextInput components are supported, and each object can contain any property supported by the component being used. By default the TableToolbarDropdown is assumed, but the TableToolbarMultiSelect, TableToolbarDateRangeSelect, or TableToolbarTextInput can be used instead by setting the `filterType` property to "multiselect", "daterangeselect", or "textinput" respectively. Some of the properties are provided automatically and do not need to be specified here. These include `filterAllLabel` and `initialSelectedItem` used by TableToolbarDropdown, and `initialSelectedItems` used by TableToolbarMultiSelect. In addition, the `onChange` prop is always set automatically and does not need to be provided, but if one is provided it will be called with the selected filter values. The `filterKey` prop can be provided to specify the actual row property to filter on if it's different from `columnKey` which is used to get the display value for the filter tag label. If two or less filters are provided they will be displayed in the toolbar. If more than two filters are provided they will be displayed in the filter panel, accessible by clicking on the Filters button in the toolbar. The default width for the toolbar filter dropdown is set to 10rem. Apply a width to the dropdown element using the specified filter id in your stylesheet to set a width that makes sense for each filter. Filter selections are persisted in local storage. See examples below.
   */
  filters: PropTypes.arrayOf(PropTypes.shape({})),
  /**
   * Display the filters in the filter panel. This will happen automatically if there are more than two filters provided or if the table width is small, but this can be used to force usage of the filter panel when there are only one or two filters. If false then they are shown inline in the toolbar.
   */
  filterPanel: PropTypes.bool,
  /**
   * Hide the option to edit the row size.
   */
  hideEditRowSize: PropTypes.bool,
  /**
   * Custom sortRow function to provide to the DataTable. Should not be needed if the data formatting convention is being used.
   */
  sortRow: PropTypes.func,
  /**
   * Custom filterRows function to provide to the DataTable. Should not be needed if the data formatting convention is being used.
   */
  filterRows: PropTypes.func,
  /**
   * Show/Hide the search bar.
   */
  hasSearch: PropTypes.bool,
  /**
   * A function that takes a row id and row data object and should return a boolean that defines whether or not the row has detail (can be expanded). This allows for only certain rows to be expandable.
   */
  hasRowDetail: PropTypes.func,
  /**
   * A function that takes a row id and row data object and returns the content for the expanded row detail area. This function is not called until the row is expanded.
   */
  rowDetail: PropTypes.func,
  /**
   * A function that takes a row id and filter string value and should return a boolean that indicates whether or not the row detail contains the string. This is necessary to be able to include rows in the table filter results that might only contain the given filter string in the row detail content.
   */
  rowDetailFilter: PropTypes.func,
  /**
   * Array of Button property objects that define the actions to show in the toolbar. See examples below.
   */
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      kind: PropTypes.string,
      label: PropTypes.node.isRequired,
      onClick: PropTypes.func,
      href: PropTypes.string,
    })
  ),
  /**
   * Config object for displaying a dropdown menu containing multiple actions.
   */
  actionsDropdown: PropTypes.shape({
    label: PropTypes.node.isRequired,
    kind: PropTypes.string,
    actions: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.node.isRequired,
        onClick: PropTypes.func,
        href: PropTypes.string,
      })
    ),
  }),
  /**
   * A function that takes an array of selected row ids and returns an array of Button property objects that define the actions to show in the batch actions bar when rows are selected. The selected row ids can be used to determine which actions are available. See examples below.
   */
  batchActions: PropTypes.func,
  /**
   * A function that takes a row id and row data object and returns an array of OverflowMenuItem property objects and/or OverflowMenuItems that define the menu items to show in the row actions overflow menu. The row id can be used to determine which actions are available. See examples below.
   */
  rowActions: PropTypes.func,
  /**
   * Hide the header completely, including the toolbar.
   */
  hideHeader: PropTypes.bool,
  /**
   * A function called when a row is clicked on. It takes the row id and row data object as arguments.
   */
  rowClick: PropTypes.func,
  /**
   * A function (`row`, `rowProps`) to resolve additional row properties, like event listeners.
   */
  rowProperties: PropTypes.func,
  /**
   * A function (`cell`, `headers`, `cellProps`) to resolve additional cell properties, like event listeners.
   */
  cellProperties: PropTypes.func,
  /**
   * Hide the pagination. Use `true` to always hide the pagination, `false` to never hide it, and `small` to hide it only when the row count is small.
   */
  hidePagination: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.oneOf(["small"]),
  ]),
  /**
   * Determines if the columns can be sorted.
   */
  isSortable: PropTypes.bool,
  /**
   * Specify whether row selection should be a radio button or inline checkbox.
   */
  radio: PropTypes.bool,
  /**
   * Use zebra striping on table rows.
   */
  useZebraStyles: PropTypes.bool,
  /**
   * Function called when the row selection changes. Passed an array of selected row IDs and array of row data objects. Make sure this is a function that does not change on every render or it will cause an infinite loop. For example, set it as a state property or use useCallback.
   */
  onSelectionChange: PropTypes.func,
  /**
   * Class name to apply to the component.
   */
  className: PropTypes.string,
  /**
   * Title to show on the empty state. If not provided the translated string "Resources" is used.
   */
  emptyStateTitle: PropTypes.string,
  /**
   * Description to show on the empty state. If not provided a default translated description is displayed.
   */
  emptyStateDescription: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
  /**
   * If true, it will show skeletons even if rows is an array. Useful to force skeletons when doing back-end pagination
   */
  forceSkeletonToShow: PropTypes.bool,
  /**
   * Icon to show on the empty state. If not provided a default empty state icon is used.
   */
  emptyStateIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Function to call when the string filter is changed. Use this to override the built-in string filtering to either do your own custom filtering or to call an API to get new data based on the filter. It is passed the value entered into the table filter input. Make sure this is a function that does not change on every render or it will cause an infinite loop. For example, set it as a state property or use useCallback.
   */
  onFilterChange: PropTypes.func,
  /**
   * When using the onFilterChange function, this sets the number of ms the debounce feature uses before filtering. It is also used for debouncing any TextInput in the filter panel while filterPanelMode is 'live'. Defaults to 300ms.
   */
  debounceTime: PropTypes.number,
  /**
   * Function to call when the provided external filters are changed. Use this to override the built-in row filtering for external filters to either do your own custom filtering or to call an API to get new data based on the filter. It is passed an object containing column keys and selected filter values. Make sure this is a function that does not change on every render or it will cause an infinite loop. For example, set it as a state property or use useCallback.
   */
  onExternalFilterChange: PropTypes.func,
  /**
   * When using the filter panel, control whether changes should take effect immediately or batched until Apply is clicked. Batch mode is most useful when using onExternalFilterChange and calling backend APIs for filtering.
   */
  filterPanelMode: PropTypes.oneOf(["live", "batch"]),
  /**
   * Function to call when the sort is changed. Use this to react to the new sort being applied. This does not override the internal sorting but allows you to fetch new data based on the sort. It is passed an object containing `header` and `direction` properties, or `undefined` if no sort is applied. Make sure this is a function that does not change on every render or it will cause an infinite loop. For example, set it as a state property or use useCallback.
   */
  onSortChange: PropTypes.func,
  /**
   * If pagination is being performed by the back-end API, provide the total row count. If the pagination pattern uses infinite-scrolling pattern, provide this value as "unknown".
   */
  totalRowCount: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.oneOf(["unknown"]),
  ]),
  /**
   * If pagination is being performed by the back-end API and uses infinite-scrolling pattern, provide this boolean to determine if current page is last page.
   */
  isLastPage: PropTypes.bool,
  /**
   * If pagination is being performed by the back-end API, provide the current page number.
   */
  pageNumber: PropTypes.number,
  /**
   * If pagination is being performed by the back-end API, use this function to react to pagination changes in the table to fetch the data. Make sure this is a function that does not change on every render or it will cause an infinite loop. For example, set it as a state property or use useCallback.
   */
  onPaginationChange: PropTypes.func,
  /**
   * Initial page size. The page size is persisted in local storage, and any previously stored value will take precedence.
   */
  initialPageSize: PropTypes.oneOf([10, 25, 50, 100]),
  /**
   * A function to call to download the table data. If provided, the Download button will be displayed in the toolbar.
   */
  onDownload: PropTypes.func,
  /**
   * A function to call to refresh the table data. If provided, the Refresh button will be displayed in the toolbar.
   */
  onRefresh: PropTypes.func,
  /**
   * Placeholder text for the table toolbar search field. Also used for the search input field label for a11y.
   */
  filterPlaceholder: PropTypes.string,
  /**
   * A trigger used to clear the current selection. For example, set it to `new Date()` to clear selection and hide the batch action bar.
   */
  // eslint-disable-next-line react/forbid-prop-types
  clearSelection: PropTypes.object,
  /**
   * Aria label for the toolbar. Must be unique when there are multiple instances on the page. Only for a11y, not displayed.
   */
  toolbarLabel: PropTypes.string,
  /**
   * Don't include select all functionality even if the table has selectable rows. This can be useful if some rows may be disabled, or if select all just isn't a desired operation.
   */
  disableSelectAll: PropTypes.bool,
  /**
   * Table sorting info.
   */
  initialSortInfo: PropTypes.shape({
    header: PropTypes.string,
    direction: PropTypes.string,
  }),
  /**
   * The g11n collator to use.
   */
  collator: PropTypes.shape({}),
  /**
   * ID for the row expand header. Used for a11y and must be unique when there are multiple EDT instances displayed at once.
   */
  rowExpandHeaderId: PropTypes.string,
  /**
   * Returns the row objects displayed in the table on the current page
   */
  onDisplayedRowsChange: PropTypes.func,
  /**
   * Set to `true` to use the light version. For use on $ui-01 backgrounds only. Don't use this to make the component background color the same as the container background color.
   */
  light: PropTypes.bool,
};

EnhancedDataTable.defaultProps = {
  collator: new Intl.Collator(),
  // locale: documentLanguage,
  title: undefined,
  description: undefined,
  rows: undefined,
  initialCols: undefined,
  initialSize: "lg",
  sizeOptions: ["xs", "sm", "md", "lg", "xl"],
  initialFilters: undefined,
  filters: undefined,
  filterPanel: false,
  forceSkeletonToShow: false,
  hasRowDetail: () => true,
  rowDetail: undefined,
  rowDetailFilter: undefined,
  sortRow: undefined,
  filterRows: undefined,
  hasSearch: true,
  actions: undefined,
  batchActions: undefined,
  rowActions: undefined,
  hideHeader: false,
  rowProperties: undefined,
  cellProperties: undefined,
  rowClick: undefined,
  hidePagination: false,
  hideEditCols: false,
  hideEditRowSize: false,
  isSortable: true,
  radio: false,
  useZebraStyles: false,
  onSelectionChange: undefined,
  className: undefined,
  emptyStateTitle: undefined,
  emptyStateDescription: undefined,
  emptyStateIcon: undefined,
  onFilterChange: undefined,
  debounceTime: 300,
  onExternalFilterChange: undefined,
  filterPanelMode: "live",
  onSortChange: undefined,
  totalRowCount: undefined,
  pageNumber: undefined,
  onPaginationChange: undefined,
  initialPageSize: 25,
  onDownload: undefined,
  onRefresh: undefined,
  filterPlaceholder: undefined,
  clearSelection: undefined,
  toolbarLabel: undefined,
  isLastPage: false,
  disableSelectAll: false,
  rowExpandHeaderId: "expand",
  light: false,
};

export default EnhancedDataTable;
