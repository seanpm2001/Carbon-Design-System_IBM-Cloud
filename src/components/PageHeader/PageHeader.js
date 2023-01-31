import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

// Components
import { Button, OverflowMenuItem } from "@carbon/react";
// Skeleton
import PageHeaderSkeleton from "./skeleton";
// Translations
// import translations from './translations';
// Children
import ActionsPanel from "./children/ActionsPanel";
import Breadcrumbs from "./children/Breadcrumbs";
import SurfacedDetails from "./children/SurfacedDetails";
// utils
// import { documentLanguage } from '../../utils/getLocale';

/**
 * The Page Header Component that can be used across IBM Cloud micro-services and pages built by service teams.
 * The Page Header Component can also be expanded upon to create connected components.
 */
const PageHeader = ({
  // locale,
  breadcrumbs,
  children,
  className,
  icon,
  isSticky,
  isProvisioning,
  isV2,
  linkComponent,
  surfacedDetails,
  hasSurfacedDetailsList,
  title,
  truncatedTitle,
  wrappedDetails,
  selectorPrimaryFocus,
  crn,
  mock,
  actionButtons: actionButtonDefs,
  actionMenuItems: actionMenuItemDefs,
}) => {
  const [actionButtons, setActionButtons] = useState();
  const [actionMenuItems, setActionMenuItems] = useState();

  const isProvisioningV2 = isV2 && isProvisioning;

  const headerClasses = classNames(
    `pal--page-header`,
    {
      "pal--page-header--v2": isProvisioningV2,
      "pal--page-header--provisioning": isProvisioning,
      "pal--page-header--sticky": isSticky,
      "pal--page-header--wrapped-details": wrappedDetails,
    },
    className
  );
  const titleClasses = classNames(`pal--page-header__title`, {
    [`pal--page-header__title--truncated`]: truncatedTitle,
  });

  useEffect(() => {
    if (actionButtonDefs && actionButtonDefs.length > 0) {
      setActionButtons(
        actionButtonDefs.map((btn) => (
          <Button key={btn.label} size="field" kind="primary" {...btn}>
            {btn.label}
          </Button>
        ))
      );
    } else {
      setActionButtons(undefined);
    }
  }, [actionButtonDefs]);

  useEffect(() => {
    if (actionMenuItemDefs && actionMenuItemDefs.length > 0) {
      setActionMenuItems(
        actionMenuItemDefs.map((item) => (
          <OverflowMenuItem key={item.itemText} requireTitle {...item} />
        ))
      );
    } else {
      setActionMenuItems(undefined);
    }
  }, [actionMenuItemDefs]);

  const content = (
    <React.Fragment>
      <div className="pal--page-header__main">
        {/* Only render breadcrumbs if the array provided contains them. */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumbs
            breadcrumbs={breadcrumbs}
            className={className}
            linkComponent={linkComponent}
          />
        )}
        <div className="pal--page-header__title-container">
          <div title={title} className={titleClasses}>
            {!isProvisioningV2 && icon && (
              <div className="pal--page-header__icon">{icon}</div>
            )}
            <h1 className="pal--page-header__title-text">{title}</h1>
          </div>
          {(surfacedDetails || crn) && (
            <SurfacedDetails
              mock={mock}
              hasSurfacedDetailsList={hasSurfacedDetailsList}
              surfacedDetails={surfacedDetails}
              crn={crn}
            />
          )}
        </div>
      </div>
      {(children || actionButtons || actionMenuItems) && (
        <div className="pal--page-header__actions">
          {children}
          {actionButtons}
          {actionMenuItems && (
            <ActionsPanel
              selectorPrimaryFocus={selectorPrimaryFocus}
              // locale={locale}
            >
              {actionMenuItems}
            </ActionsPanel>
          )}
        </div>
      )}
    </React.Fragment>
  );

  return (
    <header className={headerClasses}>
      {isProvisioningV2 ? (
        <div className="cds--row">
          <div className="pal--page-header__icon-container cds--col-md-2 cds--col-lg-2">
            {icon && <div className="pal--page-header__icon">{icon}</div>}
          </div>
          <div className="pal--page-header__main-container">{content}</div>
        </div>
      ) : (
        content
      )}
    </header>
  );
};

PageHeader.defaultProps = {
  // locale: documentLanguage,
  breadcrumbs: undefined,
  children: undefined,
  className: undefined,
  icon: undefined,
  isSticky: false,
  isProvisioning: false,
  linkComponent: "a",
  surfacedDetails: undefined,
  hasSurfacedDetailsList: false,
  truncatedTitle: false,
  wrappedDetails: false,
  crn: "",
  actionButtons: undefined,
  actionMenuItems: undefined,
  mock: false,
  isV2: false,
};

PageHeader.propTypes = {
  /**
   * The locale used for translating the strings.
   */
  // locale: PropTypes.string,
  /**
   * A custom class name to be applied to the page header's `header` element.
   */
  className: PropTypes.string,
  /**
   * An image or SVG to use in the page header.
   */
  icon: PropTypes.element,
  /**
   * Whether or not the page header should stick on top of the page after scrolling.
   */
  isSticky: PropTypes.bool,
  /**
   * Whether or not the provisioning page header should be used here.
   */
  isProvisioning: PropTypes.bool,
  /**
   * `True` to use V2 styles. Only applicable when `isProvisioning` is `True`.
   */
  isV2: PropTypes.bool,
  /**
   *  A title describing the page the user is on.
   */
  title: PropTypes.string.isRequired,
  /**
   * Whether or not the title should apply truncation. This is useful for headers with dynamic titles.
   */
  truncatedTitle: PropTypes.bool,
  /**
   * An array of breadcrumbs to aid navigation by showing users what page they are on in relation to the site structure.
   * Each item in the array should have at minimum a value property, then either an href property or an asButton property
   * set to true and an onClick function. See the Page header with breadcrumbs code example below
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
  ),
  /**
   * A component or element to use for the link element. If you're using something like React Router this can be a helpful backdoor to pass
   * in your own component, so the page doesn't re-render.
   */
  linkComponent: PropTypes.elementType,
  /**
   * The single or set of components to rendered on the right hand side of the header that a user may interact with.
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
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
   * Whether or not the surfaced details should be wrapped.
   */
  wrappedDetails: PropTypes.bool,
  /**
   * Provide a CRN to automatically show resource tags and allow editing them.
   */
  crn: PropTypes.string,
  /**
   * Button property objects that define the action buttons to show in the header. Each object must contain a `label` property for the button label.
   */
  actionButtons: PropTypes.arrayOf(
    PropTypes.shape({
      ...Button.propTypes,
      label: PropTypes.string.isRequired,
    })
  ),
  /**
   * OverflowMenuItem property objects that define the menu items to show in the Actions menu.
   */
  actionMenuItems: PropTypes.arrayOf(
    PropTypes.shape(OverflowMenuItem.propTypes)
  ),
  /**
   * Specify a CSS selector that matches the DOM element that should be focused on when OverflowMenu opens
   */
  selectorPrimaryFocus: PropTypes.string,
  /**
   * Whether or not we should use mock data.
   */
  mock: PropTypes.bool,
};

// components should export a skeleton
PageHeader.skeleton = PageHeaderSkeleton;
// PageHeader.translations = translations;
PageHeader.actionsPanel = ActionsPanel;

export default PageHeader;
