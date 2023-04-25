import React, { useState } from 'react';
import { ComboBox } from '@carbon/react';
import { useTranslation } from "react-i18next";

/* eslint-disable react/prop-types */

const hoc = WrappedComponent => {
  return ({
    columnKey,
    locale,
    initialSelectedItem,
    onChange,
    items,
    mode = 'live',
    light = true,
    allowInputAsItem = false,
    ...passthroughProps
  }) => {
    const [input, setInput] = useState();
    const { t } = useTranslation("EnhancedDataTable");
    const onInputChange = inputValue => {
      setInput(inputValue);
    };

    const augmentedOnChange = args => {
      onChange({ ...args, columnKey, mode });
    };

    const shouldFilterItem = (e) => {
      if (!e.inputValue) {
        return true;
      }
      return e.item.label.toLowerCase().includes(e.inputValue.toLowerCase());
    }

    const defaultLocale = getLocale(locale);
    const translate = translationUtils.getTranslateFunction(
      translations,
      defaultLocale
    );
    // Adapter for Carbon's translation ids with our translation ids
    const translateWithId = id => {
      const translationId = `carbon.combobox.${id}`;
      return t(translationId);
    };

    const augmentedInitialSelectedItem = initialSelectedItem?.[0]?.label;

    const augmentedItems = !allowInputAsItem || !input
      ? items
      : [
          {
            id: input,
            label: input,
          },
          ...items
        ];

    return (
      <WrappedComponent
        {...passthroughProps}
        columnKey={columnKey}
        translateWithId={translateWithId}
        initialSelectedItem={augmentedInitialSelectedItem}
        items={augmentedItems}
        light={light}
        onChange={augmentedOnChange}
        shouldFilterItem={shouldFilterItem}
        onInputChange={onInputChange}
      />
    );
  };
};

const TableToolbarComboBox = hoc(ComboBox);

export default TableToolbarComboBox;
