import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Grid, Row } from "@carbon/react";

const CardStackedLabeledRows = ({ children, className, ...rest }) => (
  <div {...rest} className={cx("pal--card__stacked-labeled-rows", className)}>
    <Grid className="cds--no-gutter">
      <Row>{children}</Row>
    </Grid>
  </div>
);

CardStackedLabeledRows.propTypes = {
  /**
   * A className to apply to the CardStackedLabeledRows component.
   */
  className: PropTypes.string,
  /**
   * The children to render in the CardStackedLabeledRows component.
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

CardStackedLabeledRows.defaultProps = {
  className: "",
};

export default CardStackedLabeledRows;
