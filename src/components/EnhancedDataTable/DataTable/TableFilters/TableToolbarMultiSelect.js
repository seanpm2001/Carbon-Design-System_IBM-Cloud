import React from "react";
import { FilterableMultiSelect } from "@carbon/react";

// import translations from '../translations';
// import getLocale from '../../../utils/getLocale';
// import translationUtils from '../../../utils/translate';

/* eslint-disable react/prop-types */

const hoc = (WrappedComponent) => {
  return ({
    columnKey,
    locale,
    onChange,
    mode = "live",
    light = true,
    ...passthroughProps
  }) => {
    const augmentedOnChange = (args) => {
      onChange({ ...args, columnKey, mode });
    };

    // const defaultLocale = getLocale(locale);
    const translate = (str) => str;

    // Adapter for Carbon's translation ids with our translation ids
    const translateWithId = (id) => {
      const translationId = `carbon.multiselect.${id}`;
      return translate(translationId);
    };

    return (
      <WrappedComponent
        {...passthroughProps}
        columnKey={columnKey}
        translateWithId={translateWithId}
        light={light}
        onChange={augmentedOnChange}
      />
    );
  };
};

const TableToolbarMultiSelect = hoc(FilterableMultiSelect);

export default TableToolbarMultiSelect;
