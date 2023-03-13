import React from "react";
import { Dropdown } from "@carbon/react";

// import translations from '../translations';
// import getLocale from '../../../utils/getLocale';
// import translationUtils from '../../../utils/translate';

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
    // const defaultLocale = getLocale(locale);
    const translate = (str) => str;
    // Adapter for Carbon's translation ids with our translation ids
    const translateWithId = (id) => {
      const translationId = `carbon.dropdown.${id}`;
      return translate(translationId);
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
