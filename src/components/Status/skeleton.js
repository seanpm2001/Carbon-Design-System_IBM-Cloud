import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { SkeletonText } from "@carbon/react";

function StatusSkeleton({ width }) {
  const unknownStatusClasses = classnames(
    "pal--status__circle",
    "pal--status__circle--gray"
  );
  return (
    <div className="pal--status">
      <div className={unknownStatusClasses} />
      {width && (
        <div className="pal--status__label">
          <SkeletonText width={width} />
        </div>
      )}
    </div>
  );
}

StatusSkeleton.propTypes = {
  width: PropTypes.string,
};

StatusSkeleton.defaultProps = {
  width: "",
};

export default StatusSkeleton;
