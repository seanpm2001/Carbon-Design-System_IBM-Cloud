import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const LayoutWrapper = ({ children, className }) => {
  const LayoutClass = classNames('pal--layout cds--grid', className);
  return <div className={LayoutClass}>{children}</div>;
};

LayoutWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string,
};

LayoutWrapper.defaultProps = {
  className: '',
};

export default LayoutWrapper;
