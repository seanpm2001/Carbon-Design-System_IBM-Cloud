import { Tab } from '@carbon/react';
import classnames from 'classnames';
import React, { useContext } from 'react';
import ResourceStatusIndicator from '../../ResourceStatusIndicator/ResourceStatusIndicator';
import { VerticalTabsContext } from '../VerticalTabs';
import PropTypes from 'prop-types';

const VerticalTab = React.forwardRef((props, ref) => {
  const { children, className, statusIndicator, index, ...rest } = props;
  const { setSelectedIndex } = useContext(VerticalTabsContext);
  const classes = classnames('pal--vertical-tab', className);

  const handleClick = e => {
    setSelectedIndex(index);
  };

  const handleKeyDown = e => {
    e.preventDefault();
  };

  return (
    <Tab
      {...rest}
      ref={ref}
      className={classes}
      onClick={handleClick}
      onKeyDown={handleKeyDown}>
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
