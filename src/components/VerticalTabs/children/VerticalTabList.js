import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { TabList } from "@carbon/react";


const VerticalTabList = React.forwardRef((props, ref) => {

  const {children, className, ...rest} = props;
 
  const classes  = classnames("pal--vertical-tab-list", className)

  return (
    <TabList ref={ref} className={classes} {...rest}>{children}</TabList>
  );
});

VerticalTabList.propTypes = {
  ...TabList.propTypes
};

VerticalTabList.defaultProps = {
  ...TabList.defaultProps
};

export default VerticalTabList;
