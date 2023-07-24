import { Tab } from '@carbon/react';
import classnames from 'classnames';
import React, { useContext } from 'react';
import ResourceStatusIndicator from '../../ResourceStatusIndicator/ResourceStatusIndicator';
import { VerticalTabsContext } from '../VerticalTabs';

const VerticalTab = React.forwardRef((props, ref) => {
  const { children, className, statusIndicator, index, ...rest } = props;
  const { selectedIndex, isMobile, setTotalTabs } =
    useContext(VerticalTabsContext);
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
