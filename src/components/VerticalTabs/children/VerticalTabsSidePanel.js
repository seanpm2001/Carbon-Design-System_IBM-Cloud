import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const VerticalTabsSidePanel = props => {
  const { open, className, children, ...rest } = props;

  const classes = classnames(
    'pal--vertical-tab-list__sidepanel',
    { 'pal--vertical-tab-list__sidepanel--open': open },
    className
  );

  return <div className={classes}>{children}</div>;
};

VerticalTabsSidePanel.propTypes = {
  open: PropTypes.bool.isRequired,
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

VerticalTabsSidePanel.defaultProps = {
  open: false,
  className: undefined,
  children: undefined,
};

export default VerticalTabsSidePanel;
