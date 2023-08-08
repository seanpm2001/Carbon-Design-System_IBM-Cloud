import { Tab } from '@carbon/react';
import classnames from 'classnames';
import React, { useContext, useEffect, useRef } from 'react';
import ResourceStatusIndicator from '../../ResourceStatusIndicator/ResourceStatusIndicator';
import { VerticalTabsContext } from '../VerticalTabs';
import PropTypes from 'prop-types';

const VerticalTab = React.forwardRef((props, ref) => {
  const { children, className, statusIndicator, index, ...rest } = props;
  const { selectedIndex, open, setSelectedIndex } =
    useContext(VerticalTabsContext);
  const classes = classnames('pal--vertical-tab', className);
  const divRef = useRef();

  useEffect(() => {
    if (index === selectedIndex && open) {
      divRef?.current?.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
      });
    }
  }, [selectedIndex, index, open]);

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
      <div ref={divRef}>
        {children}
        {statusIndicator && (
          <ResourceStatusIndicator statusIndicator={statusIndicator} />
        )}
      </div>
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
