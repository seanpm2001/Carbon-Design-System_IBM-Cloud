import React from "react";
import PropTypes from "prop-types";
import { Column } from "@carbon/react";

const CardLabeledItem = ({ label, value, lg, md, sm }) => (
  <Column lg={lg} md={md} sm={sm} key={label}>
    <div className="pal--card__stacked-labeled-rows-label">{label}</div>
    <div className="pal--card__stacked-labeled-rows-value">{value}</div>
  </Column>
);

CardLabeledItem.propTypes = {
  /**
   * The content to be rendered as a label.
   */
  label: PropTypes.node.isRequired,
  /**
   * The content to be rendered under the given label.
   */
  value: PropTypes.node.isRequired,
  /**
   * Specify column span for the `lg` breakpoint.
   */
  lg: PropTypes.number,
  /**
   * Specify column span for the `md` breakpoint.
   */
  md: PropTypes.number,
  /**
   * Specify column span for the `sm` breakpoint.
   */
  sm: PropTypes.number,
};

CardLabeledItem.defaultProps = {
  lg: 4,
  md: 4,
  sm: 4,
};

export default CardLabeledItem;
