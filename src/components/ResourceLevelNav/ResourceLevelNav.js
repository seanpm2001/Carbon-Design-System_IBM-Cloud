import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import SideNav from "../SideNav";
// Skeleton
import ResourceLevelNavSkeleton from "./skeleton";
// import { documentLanguage } from '../../utils/getLocale';

const ResourceLevelNav = ({ className, ...props }) => (
  <SideNav
    {...props}
    className={classNames("cpx--resource-level-nav", className)}
    collapseButtonLocation="top"
    inverse={false}
    open={false}
    showDropdown
    showHeader={false}
  />
);

ResourceLevelNav.propTypes = {
  /**
   * The href for the page the user is currently visiting. If this is not provided it will
   * attempt to get the location off of the windows pathname.
   */
  activeHref: PropTypes.string,
  /**
   * A custom class name to be applied to the Nav's `nav` element.
   */
  className: PropTypes.string,
  /**
   * The nav items for the navigation to render. Additional props may be passed that will be applied to the link element.
   * If you're using React router you may also provide the to prop to the provided LinkComponent in place of the href.
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      to: PropTypes.string,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      // for now do not allow subitems
      // items: PropTypes.arrayOf(
      //   PropTypes.shape({
      //     href: PropTypes.string,
      //     to: PropTypes.string,
      //     label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      //   })
      // ),
    })
  ).isRequired,
  /**
   * A component or element to use for the link element. If you're using something like React Router this can be a helpful backdoor to pass
   * in your own component, so the page doesn't re-render.
   */
  linkComponent: PropTypes.elementType,
  /**
   * The locale used for translating the strings.
   */
  // locale: PropTypes.string,
};

ResourceLevelNav.defaultProps = {
  activeHref: "",
  className: "",
  linkComponent: "a",
  // locale: documentLanguage,
};

ResourceLevelNav.skeleton = ResourceLevelNavSkeleton;

export default ResourceLevelNav;
