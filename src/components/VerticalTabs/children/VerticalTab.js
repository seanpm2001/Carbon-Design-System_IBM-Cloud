import React from 'react';
import classnames from 'classnames';
import { Tab } from '@carbon/react';
import ResourceStatusIndicator from '../../ResourceStatusIndicator/ResourceStatusIndicator';

const VerticalTab = React.forwardRef((props, ref) => {
  const { children, className, statusIndicator, ...rest } = props;

  const classes = classnames('pal--vertical-tab', className);

  return (
    <Tab ref={ref} className={classes} {...rest}>
      {children}
      {statusIndicator && (
        <ResourceStatusIndicator statusIndicator={statusIndicator} />
      )}
    </Tab>
  );
});

VerticalTab.propTypes = {
  statusIndicator: ResourceStatusIndicator.propTypes.statusIndicator,
  ...Tab.propTypes,
};

VerticalTab.defaultProps = {
  disabled: false,
  secondaryLabel: undefined,
  statusIndicator: undefined,
  ...Tab.defaultProps,
};

export default VerticalTab;
