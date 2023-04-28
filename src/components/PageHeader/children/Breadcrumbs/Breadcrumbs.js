import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

// Carbon Components
import { Breadcrumb } from "@carbon/react";

/**
 * Checks the type of breadcrumb and returns the appropriate component
 * @param {object} breadcrumb props
 * @param {object} LinkComponent
 */
const getBreadcrumbValue = (breadcrumb, LinkComponent) => {
  const { href, onClick, value, asButton, asCustomComponent, ...rest } =
    breadcrumb;
  if (asCustomComponent) {
    return <div className="cds--link">{value}</div>;
  }
  if (asButton) {
    return (
      <button
        className="pal--page-header__breadcrumb-btn"
        type="button"
        onClick={onClick}
      >
        {value}
      </button>
    );
  }
  return (
    <LinkComponent
      className="cds--link"
      tabIndex={0}
      onClick={onClick}
      href={href}
      {...rest}
    >
      {value}
    </LinkComponent>
  );
};

const Breadcrumbs = ({
  breadcrumbs,
  className: breadCrumbClass,
  linkComponent: LinkComponent,
}) => {
  return (
    <Breadcrumb className="pal--page-header__breadcrumb">
      {breadcrumbs.map((breadcrumb) => {
        const { value } = breadcrumb;
        return (
          <li
            className={classNames("cds--breadcrumb-item", breadCrumbClass)}
            key={value}
          >
            {getBreadcrumbValue(breadcrumb, LinkComponent)}
          </li>
        );
      })}
    </Breadcrumb>
  );
};

Breadcrumbs.defaultProps = {
  className: undefined,
  linkComponent: "a",
};

Breadcrumbs.propTypes = {
  /**
   * A navigational aid to allow users to know what page they are on in relation to the site structure.
   */
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      onClick: PropTypes.func,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
        .isRequired,
      asButton: PropTypes.bool,
      asCustomComponent: PropTypes.bool,
    })
  ).isRequired,
  /**
   * The class name to apply to the nav item's li element.
   */
  className: PropTypes.string,
  /**
   * A component or element to use for the link element. If you're using something like React Router this can be a helpful backdoor to pass
   * in your own component, so the page doesn't re-render.
   */
  linkComponent: PropTypes.elementType,
};

export default Breadcrumbs;
