import React from 'react';
import PropTypes from 'prop-types';

const OrderSummaryFootnotes = ({ children }) => (
  <>
    {children && (
      <div className="pal--order-summary-v2__footnotes">{children}</div>
    )}
  </>
);

OrderSummaryFootnotes.propTypes = {
  /**
   * Child nodes that will be rendered within the component.
   */
  children: PropTypes.node,
};

export default OrderSummaryFootnotes;
