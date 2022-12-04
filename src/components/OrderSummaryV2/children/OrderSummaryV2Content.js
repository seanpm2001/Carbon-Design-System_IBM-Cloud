import React from 'react';
import PropTypes from 'prop-types';

const OrderSummaryContent = ({ children }) => (
  <div className="pal--order-summary-v2__content pal--order-summary-v2__g-90-accordion">
    {children}
  </div>
);

OrderSummaryContent.propTypes = {
  /**
   * Child nodes that will be rendered within the component.
   */
  children: PropTypes.node,
};

export default OrderSummaryContent;
