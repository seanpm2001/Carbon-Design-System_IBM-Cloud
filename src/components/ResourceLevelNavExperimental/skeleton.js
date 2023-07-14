import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
import { SkeletonText } from "@carbon/react";

const ResourceLevelNavSkeleton = ({ classNames }) => (
  <nav
    className={classnames(
      "pal--side-nav",
      "pal--resource-level-nav",
      "pal--resource-level-nav--skeleton",
      classNames
    )}
  >
    <ul className="pal--side-nav__items">
      <li className="pal--side-nav__item">
        <span className="pal--side-nav__link">
          <SkeletonText width="208px" />
        </span>
      </li>
      <li className="pal--side-nav__item">
        <span className="pal--side-nav__link">
          <SkeletonText width="208px" />
        </span>
      </li>
      <li className="pal--side-nav__item">
        <span className="pal--side-nav__link">
          <SkeletonText width="208px" />
        </span>
      </li>
    </ul>
  </nav>
);

ResourceLevelNavSkeleton.defaultProps = {
  classNames: "",
};

ResourceLevelNavSkeleton.propTypes = {
  classNames: PropTypes.string,
};

export default ResourceLevelNavSkeleton;
