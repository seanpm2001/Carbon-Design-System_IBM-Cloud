import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const OrderSummaryFooter = ({ noDivider, children }) => (
  <div
    className={classnames(
      'pal--order-summary-v2__footer',
      'pal--order-summary-v2__g-90-accordion',
      {
        'pal--order-summary-v2__footer--no-divider': noDivider,
      },
    )}
  >
    {children}
  </div>
);

OrderSummaryFooter.defaultProps = {
  noDivider: false,
};

OrderSummaryFooter.propTypes = {
  /**
   * Whether or not a divider should be rendered above the footer.
   */
  noDivider: PropTypes.bool,
  /**
   * The nodes to render within the footer component.
   */
  children: PropTypes.node,
};

export default OrderSummaryFooter;
