import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const OrderSummaryContainer = ({ className, children }) => (
  <section className={classnames('pal--order-summary-v2', className)}>
    {children}
  </section>
);

OrderSummaryContainer.propTypes = {
  /**
   * A className to identify the root element for the component.
   */
  className: PropTypes.string,
  /**
   * Child nodes that will be rendered within the component.
   */
  children: PropTypes.node,
};

export default OrderSummaryContainer;
