import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";

import { SkeletonText } from "@carbon/react";

const Skeleton = ({ withGradient }) => {
  return (
    <div
      className={classnames("pal--banner", {
        "pal--banner--with-gradient": withGradient,
      })}
    >
      <SkeletonText />
    </div>
  );
};

Skeleton.propTypes = {
  withGradient: PropTypes.bool,
};

Skeleton.defaultProps = {
  withGradient: false,
};

export default Skeleton;
