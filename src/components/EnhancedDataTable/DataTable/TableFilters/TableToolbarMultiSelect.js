import React from "react";
import { FilterableMultiSelect } from "@carbon/react";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation("EnhancedDataTable");

    const augmentedOnChange = (args) => {
      onChange({ ...args, columnKey, mode });
    };

    // Adapter for Carbon's translation ids with our translation ids
    const translateWithId = (id) => {
      const translationId = `carbon.multiselect.${id}`;
      return t(translationId);
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
