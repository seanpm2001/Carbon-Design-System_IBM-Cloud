import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Tag, Button } from "@carbon/react";
import { Close as Close16 } from "@carbon/react/icons";
import { useTranslation } from "react-i18next";
import { match, Enter } from "../../../../utils/keyboard";

const renderPanel = (args) => {
  const {
    children,
    disablePrimaryButton,
    disabled,
    onClearAllFilters,
    onCommitFilters,
    onCloseFilterPanel,
    mode,
    t,
  } = args;

  const childrenWithProps = React.Children.toArray(
    React.Children.toArray(children)
  ).map((child) =>
    React.cloneElement(child, {
      mode,
    })
  );

  const onClear = () => {
    const preservedFilterKeys = childrenWithProps
      .filter((child) => child.props.disabled)
      .map((child) => child.props.columnKey);

    onClearAllFilters(preservedFilterKeys);
    onCloseFilterPanel();
  };

  const okLabel = mode === "batch" ? t("filtersApply") : t("filtersDone");

  const onOk = () => {
    if (mode === "batch") {
      onCommitFilters();
    }
    onCloseFilterPanel();
  };

  return (
    <div className="cds--table-toolbar-filter-panel">
      {childrenWithProps}
      <div className="cds--filters-button-bar">
        <Button
          disabled={
            disabled || childrenWithProps.every((child) => child.props.disabled)
          }
          iconDescription="Clear"
          kind="secondary"
          size="field"
          type="button"
          onClick={onClear}
        >
          {t("filtersClear")}
        </Button>
        <Button
          disabled={disablePrimaryButton || disabled}
          iconDescription={okLabel}
          kind="primary"
          size="field"
          type="button"
          onClick={onOk}
        >
          {okLabel}
        </Button>
      </div>
    </div>
  );
};

const createClearSelection = ({
  filter,
  selectionId,
  filterSelections,
  onFilterChange,
}) => {
  return () => {
    onFilterChange({
      columnKey: filter,
      selectedItems: filterSelections[filter].filter(
        (item) => item.id !== selectionId
      ),
      mode: "live",
    });
  };
};

const renderSelectionTags = (args) => {
  const {
    children,
    headers,
    filterSelections,
    onFilterChange,
    onClearAllFilters,
    disabled,
    t,
  } = args;

  const headerLabels = headers.reduce((acc, curr) => {
    const { key, header } = curr;
    acc[key] = header;
    return acc;
  }, {});

  const childrenWithProps = React.Children.toArray(
    React.Children.toArray(children)
  );

  const preservedFilterKeys = childrenWithProps
    .filter((child) => child.props.disabled)
    .map((child) => child.props.columnKey);

  const onClearKeyDown = (evt) => {
    if (match(evt, Enter)) {
      onClearAllFilters(preservedFilterKeys);
    }
  };

  const tags = Object.keys(filterSelections)
    .map((filter) =>
      filterSelections[filter].map((selection) => {
        const disabledTag =
          disabled ||
          childrenWithProps.find((child) => child.props.columnKey === filter)
            ?.props.disabled;

        return (
          <Tag
            key={`${filter}-${selection.id}`}
            filter
            disabled={disabledTag}
            type="gray"
            onClick={
              disabledTag
                ? undefined
                : createClearSelection({
                    filter,
                    selectionId: selection.id,
                    filterSelections,
                    onFilterChange,
                  })
            }
            onClose={
              disabledTag
                ? undefined
                : createClearSelection({
                    filter,
                    selectionId: selection.id,
                    filterSelections,
                    onFilterChange,
                  })
            }
          >
            {`${(headerLabels && headerLabels[filter]) || filter}:${
              selection.label
            }`}
          </Tag>
        );
      })
    )
    .reduce((acc, cur) => acc.concat(cur), []); // flatten array

  const disabledClearButton =
    disabled || tags.every((tag) => tag.props.disabled);

  return (
    <div className="cds--table-toolbar-filter-tags">
      <div>{tags}</div>
      {tags.length > 0 && (
        <Button
          kind="ghost"
          className="cds--filters-clear"
          iconDescription={t("filtersClearFilters")}
          tooltipAlignment="center"
          tooltipPosition="bottom"
          renderIcon={Close16}
          onClick={() => onClearAllFilters(preservedFilterKeys)}
          onKeyDown={onClearKeyDown}
          hasIconOnly
          disabled={disabledClearButton}
        />
      )}
    </div>
  );
};

const TableToolbarFilterPanel = ({
  isOpen,
  mode,
  headers,
  filterSelections,
  onFilterChange,
  onClearAllFilters,
  onCommitFilters,
  onCloseFilterPanel,
  children,
  disablePrimaryButton,
  disabled,
}) => {
  const { t } = useTranslation("EnhancedDataTable");
  // close filter panel when clicked outside data table
  useEffect(() => {
    const handler = (evt) => {
      if (
        evt &&
        evt.target &&
        evt.target.isConnected &&
        !evt.target.closest(".cds--table-with-filters") &&
        evt.target.className !== "cds--list-box__menu-item__option" &&
        !evt.target.className.startsWith?.("flatpickr") &&
        evt.target.className !== "arrowUp" &&
        evt.target.className !== "arrowDown"
      ) {
        onCloseFilterPanel();
      }
    };

    document.addEventListener("click", handler);
    return () => {
      document.removeEventListener("click", handler);
    };
  });

  return (
    <>
      {isOpen &&
        renderPanel({
          children,
          onClearAllFilters,
          onCommitFilters,
          onCloseFilterPanel,
          mode,
          disablePrimaryButton,
          disabled,
          t,
        })}
      {!isOpen &&
        renderSelectionTags({
          children,
          headers,
          filterSelections,
          onFilterChange,
          onClearAllFilters,
          disabled,
          t,
        })}
    </>
  );
};

TableToolbarFilterPanel.propTypes = {
  /**
   * Provide `isFilterPanelOpen` from render prop
   */
  isOpen: PropTypes.bool.isRequired,
  /**
   * Provide filter mode, either "live" or "batch".
   */
  mode: PropTypes.oneOf(["live", "batch"]),
  /**
   * Provide a set of all possible headers. This includes visible and hidden columns (if table settings feature is used). Do not use `headers` from the render prop as it only contains visible headers.
   */
  headers: PropTypes.arrayOf(PropTypes.object).isRequired,
  /**
   * Provide `filterSelections` from render prop
   */
  filterSelections: PropTypes.objectOf(PropTypes.array),
  /**
   * Provide `onFilterChange` from render prop
   */
  onFilterChange: PropTypes.func.isRequired,
  /**
   * Provide `onClearAllFilters` from render prop
   */
  onClearAllFilters: PropTypes.func.isRequired,
  /**
   * Provide `onCommitFilters` from render prop
   */
  onCommitFilters: PropTypes.func,
  /**
   * Provide `onCloseFilterPanel` from render prop
   */
  onCloseFilterPanel: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  /**
   * The locale used for translating the strings.
   */
  locale: PropTypes.string,
  /**
   * Provide an optional flag to enable or disable the primary button in the filter panel. This may be useful when you have custom validation logic and you wish to disable the primary button when validation fails.
   */
  disablePrimaryButton: PropTypes.bool,
  /**
   * Disable the ability to update any of the filters.
   */
  disabled: PropTypes.bool,
};

TableToolbarFilterPanel.defaultProps = {
  mode: "live",
  filterSelections: {},
  onCommitFilters: () => {},
  // locale: documentLanguage,
  disablePrimaryButton: false,
  disabled: false,
};

export default TableToolbarFilterPanel;
