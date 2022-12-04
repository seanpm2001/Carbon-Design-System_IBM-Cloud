import React from "react";
import PropTypes from "prop-types";

// Carbon Components
import { SkeletonText } from "@carbon/react";

const ProgressBarSkeleton = ({ label, width }) => {
  return (
    <div className="pal--progress-bar--skeleton">
      <SkeletonText
        className="pal--progress-bar--skeleton__progress"
        width={width}
      />
      {label && (
        <SkeletonText
          className="pal--progress-bar--skeleton__label"
          width="6rem"
        />
      )}
    </div>
  );
};

ProgressBarSkeleton.defaultProps = {
  label: false,
  width: "3.5rem",
};

ProgressBarSkeleton.propTypes = {
  label: PropTypes.bool,
  width: PropTypes.string,
};

export default ProgressBarSkeleton;
