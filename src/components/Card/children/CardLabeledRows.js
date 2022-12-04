import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const CardLabeledRows = ({ children, className, ...rest }) => (
  <div {...rest} className={cx('pal--card__labeled-rows', className)}>
    {children}
  </div>
);

CardLabeledRows.propTypes = {
  /**
   * A className to apply to the CardLabeledRows component.
   */
  className: PropTypes.string,
  /**
   * The children to render in the CardLabeledRows component. Any element whose index is odd will
   * be rendered as a label. Any element whose index is even will be rendered as a value for that
   * label.
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

CardLabeledRows.defaultProps = {
  className: '',
};

export default CardLabeledRows;
