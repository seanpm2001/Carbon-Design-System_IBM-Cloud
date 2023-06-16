import React, { useState } from "react";
// import { Link } from "react-router-dom";
import {
  Layer,
  Tabs
} from "@carbon/react";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";


/**
 * 
 * TODO:
 * - scroll behavior on overflow
 * - pagination
 * - panel styles
 * - search bar
 * - mobile view
 */
const VerticalTabs = props => {

  const { children, className, fullHeight, ...rest } = props;

  const classes = classNames(
  "pal--vertical-tabs",
  { 'pal--vertical-tabs--full-height': fullHeight },
  className );
  const { t } = useTranslation();
  const [pageId, setPageId] = useState(0);

  const onPageChange = id => {
    setPageId(id);
  };

  const onTabClick = () => {
    setPageId(0);
  };

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