import React, { useRef } from 'react';
import { DatePicker, DatePickerInput } from "@carbon/react";
import { useTranslation } from "react-i18next";
import useId from "../../../../utils/useId";

/* eslint-disable react/prop-types */

const hoc = (WrappedComponent) => {
  return ({
    columnKey,
    locale,
    onChange,
    mode = "live",
    light = true,
    initialSelectedItems = [],
    ...passthroughProps
  }) => {
    const { t } = useTranslation("EnhancedDataTable");

    const datepickerRef = useRef(null);
    const datePickerId =
      passthroughProps?.id || useId("datatable-filter-datepicker");
    const disabled = passthroughProps?.disabled;

    const augmentedOnChange = (args) => {
      onChange({ selectedItems: args, columnKey, isDateRange: true, mode });
    };

    // Adapter for Carbon's translation ids with our translation ids
    const translateWithId = (id) => {
      const translationId = `carbon.dateselect.${id}`;
      return t(translationId);
    };

    let start;
    let end;
    if (
      Array.isArray(initialSelectedItems) &&
      initialSelectedItems[0] &&
      initialSelectedItems[0].start instanceof Date &&
      initialSelectedItems[0].end instanceof Date
    ) {
      start = initialSelectedItems[0].start;
      end = initialSelectedItems[0].end;
    }

    if (Array.isArray(datepickerRef.current?.cal?.selectedDates)
      && !datepickerRef.current.cal.selectedDates.length
      && initialSelectedItems.length
    ) {
      datepickerRef.current.cal.setDate([start, end], false);
    }


    return (
      <WrappedComponent
        {...passthroughProps}
        columnKey={columnKey}
        id={datePickerId}
        translateWithId={translateWithId}
        light={light}
        onChange={augmentedOnChange}
        datePickerType="range"
        dateFormat="m/d/Y"
        className="cds--dropdown_wrapper"
        ref={datepickerRef}
      >
        <DatePickerInput
          id={`${datePickerId}-start`}
          placeholder={
            start ? start.toLocaleDateString() : translateWithId("start")
          }
          labelText={passthroughProps.titleText}
          autoComplete="off"
          disabled={disabled}
        />
        <DatePickerInput
          id={`${datePickerId}-end`}
          placeholder={end ? end.toLocaleDateString() : translateWithId("end")}
          labelText=""
          autoComplete="off"
          disabled={disabled}
        />
      </WrappedComponent>
    );
  };
};

const TableToolbarDateRangeSelect = hoc(DatePicker);

export default TableToolbarDateRangeSelect;
