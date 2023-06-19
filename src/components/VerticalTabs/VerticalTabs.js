import React from "react";
import {
  Tabs
} from "@carbon/react";
import classNames from "classnames";
import PropTypes from "prop-types";


/**
 * 
 * TODO:
 * - pagination button tooltips
 * - panel styles
 * - search bar
 * - mobile view
 * - resource status indicator
 */
const VerticalTabs = props => {

  const { children, className, fullHeight, ...rest } = props;

  const classes = classNames(
  "pal--vertical-tabs",
  { 'pal--vertical-tabs--full-height': fullHeight },
  className );

  return (
    <Tabs className={classes} {...rest}>
      <div className={classes} >
        {children}
      </div>
    </Tabs>
  );
};

VerticalTabs.defaultProps = {
  fullHeight: false,
  ...Tabs.defaultProps
};

VerticalTabs.propTypes = {
  /**
   * Determines whether Tabs span whole height or not.
   */
  fullHeight: PropTypes.bool,
  ...Tabs.propTypes
};
export default VerticalTabs;