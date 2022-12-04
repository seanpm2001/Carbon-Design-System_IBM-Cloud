import React from "react";
import PropTypes from "prop-types";
// Carbon Components
import { SkeletonText } from "@carbon/react";

const ResourceStatusIndicatorSkeleton = ({ label, width }) => {
  return (
    <div className="pal--resource-status-indicator--skeleton">
      <SkeletonText
        className="pal--resource-status-indicator--skeleton__progress"
        width={width}
      />
      {label && (
        <SkeletonText
          className="pal--resource-status-indicator--skeleton__label"
          width="6rem"
        />
      )}
    </div>
  );
};

ResourceStatusIndicatorSkeleton.defaultProps = {
  label: false,
  width: "3.5rem",
};

ResourceStatusIndicatorSkeleton.propTypes = {
  label: PropTypes.bool,
  width: PropTypes.string,
};

export default ResourceStatusIndicatorSkeleton;
