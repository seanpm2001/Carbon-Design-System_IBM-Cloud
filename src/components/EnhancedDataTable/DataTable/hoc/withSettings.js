import React, { useState } from 'react';

/* eslint-disable react/prop-types */

/*
 * Higer Order Component that wraps DataTable,
 * returning a new coWrappedDataTable settings support
 */
const withSettings = WrappedDataTable => {
  return ({
    render,
    headers,
    initialSize,
    initialCols,
    ...passthroughProps
  }) => {
    const [selectedSize, setSelectedSize] = useState(initialSize);
    const [selectedCols, setSelectedCols] = useState(initialCols);
    const augmentedRender = renderProps => {
      const augmentedRenderProps = {
        ...renderProps,
        size: selectedSize,
        onSizeChange: value => setSelectedSize(value),
        cols: selectedCols,
        onColumnsChange: value => setSelectedCols([...value]),
        onReset: value => {
          if (value && value.defaultSize) {
            setSelectedSize(value.defaultSize);
          }
          if (value && value.defaultCols) {
            setSelectedCols([...value.defaultCols]);
          }
        },
      };
      return render(augmentedRenderProps);
    };

    // selectedCols may not exist as initialCols is an optional prop
    const selectedHeaders = headers.filter(
      h => !selectedCols || selectedCols.includes(h.key),
    );

    return (
      <WrappedDataTable
        {...passthroughProps}
        render={augmentedRender}
        size={selectedSize}
        headers={selectedHeaders}
      />
    );
  };
};

export default withSettings;
