import React from 'react';
import propTypes from 'prop-types';

const OrderSummaryItemText = ({ postfix, renderText, children }) => {
  return renderText && children ? (
    <span className={`pal--order-summary-v2__item-${postfix}`}>{children}</span>
  ) : null;
};

OrderSummaryItemText.defaultProps = {
  renderText: true,
  children: undefined,
};

OrderSummaryItemText.propTypes = {
  /**
   * A postfix to add to the order summary item class.
   */
  postfix: propTypes.string.isRequired,
  /**
   * Whether or not the text should be rendered.
   */
  renderText: propTypes.bool,
  /**
   * Children to render within the text.
   */
  children: propTypes.node,
};

export default OrderSummaryItemText;
