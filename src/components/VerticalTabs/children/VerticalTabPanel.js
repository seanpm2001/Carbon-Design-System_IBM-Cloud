import classnames from 'classnames';
import PropTypes from 'prop-types';
import React, { useContext, useRef } from 'react';
import { VerticalTabsContext } from '../VerticalTabs';
import { VerticalTabPanelContext } from './VerticalTabPanels';

const VerticalTabPanel = ({ children, className, ...rest }) => {
  const { selectedIndex } = useContext(VerticalTabsContext);
  const index = useContext(VerticalTabPanelContext);
  const classes = classnames(
    'pal--vertical-tab--panel',
    'cds--tab-content',
    className
  );
  const ref = useRef();
  const id = `pal-tabpanel-${index}`;
  const tabId = `pal-tab-${index}`;

  return (
    <div
      {...rest}
      aria-labelledby={tabId}
      id={id}
      className={classes}
      ref={ref}
      role="tabpanel"
      tabIndex={-1}
      hidden={selectedIndex !== index}>
      {children}
    </div>
  );
};

VerticalTabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

VerticalTabPanel.defaultProps = {
  className: undefined,
};

export default VerticalTabPanel;
