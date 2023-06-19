import React, { useState } from "react";
import classnames from "classnames";
import { IconButton } from "@carbon/react";
import { CaretUp, CaretDown } from "@carbon/react/icons";
import PropTypes from "prop-types";

const VerticalPagination = (props) => {

  const {size, className, upwardText, downwardText, onChange, page: initialPage, pageSize: initialPageSize, totalItems, disabled, ...rest} = props;
 
  const classes  = classnames("pal--vertical-pagination", className)

  const [ page, setPage ] =  useState(initialPage)
  const [ pageSize, setPageSize ] =  useState(initialPageSize)


  const incrementPage = () => {
    const newPage = page + 1
    setPage(newPage)
    if (onChange) onChange({page: newPage, pageSize})
  };

  const decrementPage = () => {
    const newPage = page - 1
    setPage(newPage)
    if (onChange) onChange({ page: newPage, pageSize })
  };


  const totalPages =  Math.max(Math.ceil(totalItems / pageSize), 1);

  const startIndex = 1 + (page - 1) * pageSize
  const endIndex = page * pageSize > totalItems ? totalItems : page * pageSize

  const upDisabled = disabled || page === 1
  const downDisabled = disabled ||  totalPages === page


  return (
    <div className={classes} {...rest}>
      <div className="pal--vertical-pagination__text"> {startIndex}-{endIndex} of {totalItems} items</div>
      <div className="pal--vertical-pagination__control-buttons">
        <IconButton 
          size={size}
          kind='ghost'
          hasIconOnly 
          disabled={upDisabled}
          // tooltipAlignment="center"
          // tooltipPosition="right"
          onClick={decrementPage}
          iconDescription={upwardText}
        > 
          <CaretUp />
        </IconButton>
        <IconButton 
          size={size}
          kind='ghost'
          hasIconOnly 
          disabled={downDisabled}
          // tooltipAlignment="center"
          // tooltipPosition="right"
          onClick={incrementPage}
          iconDescription={downwardText}
        > 
          <CaretDown />
        </IconButton>
      </div>
    </div>
  );
}

VerticalPagination.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  upwardText: PropTypes.string.isRequired,
  downwardText: PropTypes.string.isRequired,
  /**
     * The choices for `pageSize`.
     */
  pageSize: PropTypes.number.isRequired,
  /**
     * The callback function called when the current page changes.
     */
  onChange: PropTypes.func,
  /**
     * The total number of items.
     */
  totalItems: PropTypes.number,
  /**
     * The current page.
     */
  page: PropTypes.number,
  /**
   * Boolean to disable whole pagination component
   */
  disabled: PropTypes.bool

};

VerticalPagination.defaultProps = {
  className: undefined,
  size: 'md',
  upwardText: 'Previous page',
  downwardText: 'Next page',
  pageSize: 10,
  totalItems: undefined,
  page: 1,
  onChange: undefined,
  disabled: false,
};

export default VerticalPagination;
