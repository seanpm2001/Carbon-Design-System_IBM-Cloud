import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const SurfacedDetails = ({
  surfacedDetails,
  hasSurfacedDetailsList,
}) => {
  const classes = classNames("pal--page-header__surfaced-details", {
    "pal--page-header__surfaced-details--list": hasSurfacedDetailsList,
  });

  return <div className={classes}>{surfacedDetails}</div>;
};

SurfacedDetails.defaultProps = {
  surfacedDetails: undefined,
  hasSurfacedDetailsList: false,
};

SurfacedDetails.propTypes = {
  /**
   * Details that are surfaced to the end user. These are appended to the end of the title.
   */
  surfacedDetails: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  /**
   * Flag to indicate that the Surfaced Details have a list that should use the common design.
   */
  hasSurfacedDetailsList: PropTypes.bool,
};

export default SurfacedDetails;
