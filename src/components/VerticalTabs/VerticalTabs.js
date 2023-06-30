import React, { useState } from "react";
import {
  Layer,
  Tabs
} from "@carbon/react";
import classNames from "classnames";
import PropTypes from "prop-types";


/**
 * 
 * TODO:
 * - pagination button tooltips (workaround -> hide tooltips)
 * - panel styles
 * - mobile view
 * - resource status indicator
 * - always show selected item
 */
const VerticalTabs = props => {

  const { children, className, fullHeight, selectedIndex: controlledSelectedIndex, defaultSelectedIndex,  ...rest } = props;

  const [selectedIndex, setSelectedIndex]  = useState(controlledSelectedIndex || defaultSelectedIndex)
  const classes = classNames(
  "pal--vertical-tabs",
  { 'pal--vertical-tabs--full-height': fullHeight },
  className );

  const handleTabSelect  = ({selectedIndex}) => {
    setSelectedIndex(selectedIndex)
  }


  return (
    <Tabs selectedIndex={selectedIndex} onSelectionChange={handleTabSelect} className={classes} {...rest}>
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