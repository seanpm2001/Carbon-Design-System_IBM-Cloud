import classnames from 'classnames';
import React, { useContext, useEffect, useRef } from 'react';
import ResourceStatusIndicator from '../../ResourceStatusIndicator/ResourceStatusIndicator';
import { VerticalTabsContext } from '../VerticalTabs';
import PropTypes from 'prop-types';
import { useMergedRefs } from '../utils';

const VerticalTab = ({
  children,
  className,
  statusIndicator,
  disabled,
  index,
  secondaryLabel,
  ...rest
}) => {
  const { selectedIndex, open, setSelectedIndex } =
    useContext(VerticalTabsContext);
  const classes = classnames(
    'pal--vertical-tab',
    {
      [`pal--vertical-tab--selected`]: selectedIndex === index,
      [`pal--vertical-tab--disabled`]: disabled,
    },
    className
  );
  const tabId = `pal-tab-${index}`;
  const ref = useRef();

  useEffect(() => {
    if (index === selectedIndex || (open && index === selectedIndex)) {
      ref?.current?.scrollIntoView({
        block: 'nearest',
        inline: 'nearest',
      });
      ref?.current?.focus();
    }
  }, [selectedIndex, index, ref, open]);

  const handleClick = e => {
    setSelectedIndex(index);
  };

  const handleKeyDown = e => {
    e.preventDefault();
  };

  return (
    <button
      {...rest}
      type="button"
      id={tabId}
      tabIndex={selectedIndex === index ? '0' : '-1'}
      ref={ref}
      className={classes}
      onClick={handleClick}
      onKeyDown={handleKeyDown}>
      <div className="pal--vertical-tab-label-wrapper">
        <span className="pal--vertical-tab-label">
          {children}
          {statusIndicator && (
            <ResourceStatusIndicator statusIndicator={statusIndicator} />
          )}
        </span>
      </div>
      {secondaryLabel && (
        <div
          className="pal--vertical-tab-secondary-label"
          title={secondaryLabel}>
          {secondaryLabel}
        </div>
      )}
    </button>
  );
};

VerticalTab.propTypes = {
  statusIndicator: ResourceStatusIndicator.propTypes.statusIndicator,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  index: PropTypes.number.isRequired,
  secondaryLabel: PropTypes.node,
};

VerticalTab.defaultProps = {
  disabled: false,
  secondaryLabel: undefined,
  statusIndicator: undefined,
  className: undefined,
};

export default VerticalTab;
