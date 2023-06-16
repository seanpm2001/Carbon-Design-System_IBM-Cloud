import React from "react";
import classnames from "classnames";
import { Tab } from "@carbon/react";


const VerticalTab = React.forwardRef((props, ref) => {

  const {children, className, renderIcon: Icon, ...rest} = props;
 
  const classes  = classnames("pal--vertical-tab", className)

  return (
    <Tab ref={ref} className={classes} {...rest}>
      {Icon && (
        <div className="pal--vertical-tab__icon">
          <Icon />
        </div>
      )}
      {children}
      </Tab>
  );
});

VerticalTab.propTypes = {
  ...Tab.propTypes
};

VerticalTab.defaultProps = {
  disabled: false,
  ...Tab.defaultProps
};

export default VerticalTab;
