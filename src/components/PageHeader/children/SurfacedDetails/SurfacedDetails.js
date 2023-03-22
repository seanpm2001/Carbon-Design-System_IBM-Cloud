import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const SurfacedDetails = ({
  mock,
  // locale,
  surfacedDetails,
  hasSurfacedDetailsList,
  // crn,
}) => {
  const [reloadTags, setReloadTags] = useState(false);
  const [tagModalOpen, setTagModalOpen] = useState(false);
  const classes = classNames("pal--page-header__surfaced-details", {
    "pal--page-header__surfaced-details--list": hasSurfacedDetailsList,
  });

  return <div className={classes}>{surfacedDetails}</div>;
};

SurfacedDetails.defaultProps = {
  // locale: documentLanguage,
  surfacedDetails: undefined,
  hasSurfacedDetailsList: false,
  // crn: undefined,
  mock: false,
};

SurfacedDetails.propTypes = {
  /**
   * The locale used for translating the strings.
   */
  // locale: PropTypes.string,
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
  /**
   * Provide a CRN to automatically show resource tags and allow editing them.
   */
  // crn: PropTypes.string,
  /**
   * Whether or not we should use mock data.
   */
  mock: PropTypes.bool,
};

export default SurfacedDetails;
