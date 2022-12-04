import React from 'react';
import PropTypes from 'prop-types';

const OrderSummaryTerms = ({ children }) => (
  <>
    {children && <div className="pal--order-summary-v2__terms">{children}</div>}
  </>
);

OrderSummaryTerms.propTypes = {
  /**
   * Child nodes that will be rendered within the component.
   */
  children: PropTypes.node,
};

export default OrderSummaryTerms;
