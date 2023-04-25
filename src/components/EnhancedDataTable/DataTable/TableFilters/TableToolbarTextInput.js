import React from 'react';
import { TextInput } from '@carbon/react';
import debounce from '../../../../utils/debounce';

/* eslint-disable react/prop-types */

const hoc = WrappedComponent => {
  return ({
    columnKey,
    mode = 'live',
    onChange,
    debounceTime = 300,
    light = true,
    ...passthroughProps
  }) => {
    const delay = mode === 'live' ? debounceTime : 0;
    const augmentedOnChange = debounce((value) => {
      onChange({ value, columnKey, mode });
    }, delay);

    return (
      <WrappedComponent
        {...passthroughProps}
        light={light}
        onChange={e => augmentedOnChange(e.target.value)}
      />
    );
  };
};

const TableToolbarTextInput = hoc(TextInput);

export default TableToolbarTextInput;
