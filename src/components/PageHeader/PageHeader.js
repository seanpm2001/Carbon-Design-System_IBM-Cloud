import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
// Components
import { Button, OverflowMenuItem, Link, Row, Column } from "@carbon/react";

//icons
import { ArrowLeft } from "@carbon/icons-react"
// Skeleton
import PageHeaderSkeleton from "./skeleton";

// Children
import ActionsPanel from "./children/ActionsPanel";
import Breadcrumbs from "./children/Breadcrumbs";
import SurfacedDetails from "./children/SurfacedDetails";

/**
 * The Page Header Component that can be used across IBM Cloud micro-services and pages built by service teams.
 * The Page Header Component can also be expanded upon to create connected components.
 */
const PageHeader = ({
  breadcrumbs,
  children,
  className,
  icon,
  isSticky,
  isProvisioning,
  linkComponent: LinkComponent,
  surfacedDetails,
  hasSurfacedDetailsList,
  title,
  truncatedTitle,
  wrappedDetails,
  selectorPrimaryFocus,
  actionButtons: actionButtonDefs,
  actionMenuItems: actionMenuItemDefs,
  experimental,
  isWorld,
  returnLink,
  returnLinkText,
  illustration,
  illustrationAlt,
  subtitle,
  tabs,
}) => {
  const { t } = useTranslation("PageHeader");
  const [actionButtons, setActionButtons] = useState();
  const [actionMenuItems, setActionMenuItems] = useState();


  const headerClasses = classNames(
    `pal--page-header`,
    {
      "pal--page-header--provisioning": isProvisioning,
      "pal--page-header--sticky": isSticky,
      "pal--page-header--wrapped-details": wrappedDetails,
      "pal--page-header--experimental": experimental,
      "pal--page-header--world": isWorld,
    },
    className
  );
  const titleClasses = classNames(`pal--page-header__title`, {
    [`pal--page-header__title--truncated`]: truncatedTitle,
  });


  const subtitleClasses = classNames(`pal--page-header__subtitle`);

  const titleContainerClasses = classNames(`pal--page-header__title-container`);


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
            linkComponent={LinkComponent}
          />
        )}
        {experimental && returnLink && (
          <LinkComponent className='pal--page-header__return-link' href={returnLink}><ArrowLeft/>{returnLinkText || t('returnLinkDefault')}</LinkComponent>
        )}
        <div className={titleContainerClasses}>
          <div title={title} className={titleClasses}>
            {!isProvisioning && icon && (
              <div className="pal--page-header__icon">{icon}</div>
            )}
            <h1 className="pal--page-header__title-text">{title}</h1>
          </div>
          {(surfacedDetails) && (
            <SurfacedDetails
              hasSurfacedDetailsList={hasSurfacedDetailsList}
              surfacedDetails={surfacedDetails}
            />
          )}
        </div>
        { tabs && (
              // to achieve the tab component to span the whole header width two tabs components are in play that depending on the screen size are hidden or shown
              <div className="pal--page-header__tabs"> {tabs}</div>
            )
          }
      </div>
      {(children || actionButtons || actionMenuItems) && (
        <div className="pal--page-header__actions">
          {children}
          {actionButtons}
          {actionMenuItems && (
            <ActionsPanel
              selectorPrimaryFocus={selectorPrimaryFocus}
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
      {isWorld && experimental ? (
        <Row>
          <Column lg={8} md={4} sm={4} xlg={8} max={8} className="pal--page-header__main-container">
          <div className="pal--page-header__main">
            <div lg={8} md={4} sm={4} xlg={8} max={8} className="pal--page-header__title-container">
                <div className={titleClasses}>
                  <h1 className="pal--page-header__title-text">{title}</h1>
                </div>
                <div className={subtitleClasses}>
                  <p className="pal--page-header__subtitle-text">{subtitle}</p>
                </div>
              </div>
            </div>
          </Column>
          {illustration && <Column className="pal--page-header__illustration-container" lg={8} md={4} sm={4} xlg={8} max={8} >
            <div className="pal--page-header__illustration" >
              <img src={illustration}  alt={illustrationAlt}/>
            </div>
            </Column>
}
      </Row>
      ) : isProvisioning && experimental ? (
        <>
        <Row>
          <Column lg={14} md={6} sm={2} xlg={14} max={14}  className="pal--page-header__main-container">{content}
          </Column>
          <Column lg={1} md={1} sm={1} xlg={1} max={1} className="pal--page-header__icon-container">
          {icon && <div className="pal--page-header__icon">{icon}</div>}
          </Column>
        </Row>
      </>
      ) : isProvisioning ? (
        <Row>
          <Column sm={1} md={2} lg={2} xlg={2} max={2} className="pal--page-header__icon-container">
            {icon && <div className="pal--page-header__icon">{icon}</div>}
          </Column>
          <div className="pal--page-header__main-container">{content}</div>
        </Row>
      ) :
      (
        content
      )}
      { tabs && (
              // to achieve the tab component to span the whole header width two tabs components are in play that depending on the screen size are hidden or shown
              <div className="pal--page-header__tabs--sm"> {tabs}</div>
            )
          }
    </header>
  );
};

PageHeader.defaultProps = {
  breadcrumbs: undefined,
  children: undefined,
  className: undefined,
  icon: undefined,
  isSticky: false,
  isProvisioning: false,
  linkComponent: Link,
  surfacedDetails: undefined,
  hasSurfacedDetailsList: false,
  truncatedTitle: false,
  wrappedDetails: false,
  actionButtons: undefined,
  actionMenuItems: undefined,
  experimental: false,
  returnLink: undefined,
  returnLinkText: undefined,
  isWorld: false,
  illustration: undefined,
  illustrationAlt: undefined,
  tabs: undefined,
};

PageHeader.propTypes = {
  /**
   * A custom class name to be applied to the page header's `header` element.
   */
  className: PropTypes.string,
  /**
  * A boolean to activate experimental design.
  */
  experimental: PropTypes.bool,
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
   *  A title describing the page the user is on.
   */
  title: PropTypes.string.isRequired,
  /**
   *  A subtitle describing the page the user is on. This prop is only visible when 'isWorld' is true.
   */
  subtitle: PropTypes.string,
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
   * Path of the products landing/home page. Using this prop adds a link back to the used path.
   * This prop should not be used in combination with breadcrumbs.
   */
  returnLink: PropTypes.string,
  /**
   * Text to be displayed in the return link.
   */
  returnLinkText: PropTypes.string,
  /**
   * Boolean to determine whether page header is supposed to be in world level design.
   */
  isWorld: PropTypes.bool,
  /**
   * An illustration that can be added to a world level page header. It is recommened to use an .svg with an transparent background.
   */
  illustration: PropTypes.element,
  /**
   * Text to describe the world level illustration.
   */
  illustrationAlt: PropTypes.string,
  /**
   * Tabs element group that can be used to control page content. It is advised to use carbons Tab component and controlt the selected index with the `onChange` prop.
   * See the code example in `Provisioning Page Header`
   */
   tabs: PropTypes.node,
};

// components should export a skeleton
PageHeader.skeleton = PageHeaderSkeleton;
// PageHeader.translations = translations;
PageHeader.actionsPanel = ActionsPanel;

export default PageHeader;
