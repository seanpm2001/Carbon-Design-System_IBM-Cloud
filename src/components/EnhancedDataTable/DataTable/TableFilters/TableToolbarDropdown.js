import React from "react";
import { Dropdown } from "@carbon/react";
import { useTranslation } from "react-i18next";

/* eslint-disable react/prop-types */

const hoc = (WrappedComponent) => {
  return ({
    columnKey,
    mode = "live",
    filterAllLabel,
    locale,
    items,
    initialSelectedItem,
    onChange,
    light = true,
    ...passthroughProps
  }) => {
    const { t } = useTranslation("EnhancedDataTable");

    // change this to useCallback or - BETTER - remove it
    // Adapter for Carbon's translation ids with our translation ids
    const translateWithId = (id) => {
      const translationId = `carbon.dropdown.${id}`;
      return t(translationId);
    };

    const augmentedOnChange = (args) => {
      if (
        args &&
        args.selectedItem &&
        args.selectedItem.label === filterAllLabel
      ) {
        onChange({ selectedItem: undefined, columnKey, mode });
      } else {
        onChange({ ...args, columnKey, mode });
      }
    };

    // include "All" option if filterAllLabel specified
    const allOption = filterAllLabel
      ? [
          {
            id: filterAllLabel,
            label: filterAllLabel,
          },
        ]
      : [];

    const augmentedItems = [...allOption, ...items];

    const augmentedInitialSelectedItem =
      (initialSelectedItem &&
        initialSelectedItem[0] &&
        String(initialSelectedItem[0].label)) ||
      filterAllLabel;

    return (
      <WrappedComponent
        {...passthroughProps}
        translateWithId={translateWithId}
        items={augmentedItems}
        initialSelectedItem={augmentedInitialSelectedItem}
        light={light}
        onChange={augmentedOnChange}
      />
    );
  };
};

const TableToolbarDropdown = hoc(Dropdown);

export default TableToolbarDropdown;
