import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const VerticalTabsSidePanel = React.forwardRef((props, ref) => {
  const { isOpen, hasOverlay, className, children, ...rest } = props;

  const classes = classnames(
    'pal--vertical-tab-list__sidepanel',
    { 'pal--vertical-tab-list__sidepanel--open': isOpen },
    { 'pal--vertical-tab-list__sidepanel--overlay': hasOverlay },
    className
  );

  return <div className={classes}>{children}</div>;
});

VerticalTabsSidePanel.propTypes = {
  hasOverlay: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

VerticalTabsSidePanel.defaultProps = {
  hasOverlay: true,
  isOpen: false,
  className: undefined,
  children: undefined,
};

export default VerticalTabsSidePanel;
