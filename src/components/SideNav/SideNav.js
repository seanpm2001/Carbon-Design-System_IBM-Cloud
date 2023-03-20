import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { useTranslation } from "react-i18next";

// Child Components
import NavItems from "./children/NavItems";
import NavHeader from "./children/NavHeader";
import NavCollapseButton from "./children/NavCollapseButton";
import { findActiveItem, isActiveItem } from "./utils/findActiveItem";

const selectionKeys = ["Enter", " ", "Spacebar"];

/**
 * Checks whether the event type was a click event or the user seleted with enter or space.
 * @param {Object} evt An event object.
 */
const isSelectEvent = (evt) =>
  evt.type === "click" || selectionKeys.includes(evt.key);

/**
 * Returns the current pathname, so long as there is a window.
 */
const getWindowPath = () =>
  /* istanbul ignore next */
  typeof window !== "undefined" ? window?.location?.pathname : "";

/**
 * Returns the initial href to set as active.
 */
const getInitialActiveHref = (active) => active || getWindowPath();

const SideNav = ({
  activeHref: activeOverride,
  showMenuItems,
  className,
  collapseButtonLocation,
  inverse,
  icon,
  items,
  linkComponent: LinkComponent,
  locale,
  onToggle,
  open: initialOpen,
  showDropdown,
  showHeader,
  title,
  titleHref,
  onTitleClick,
  ...rest
}) => {
  const { t } = useTranslation("SideNav");
  const initialActive = getInitialActiveHref(activeOverride);

  // Component state
  const [open, setOpen] = useState(initialOpen);
  const [activeHref, setActiveHref] = useState(initialActive);

  const collapseButtonLabel = open ? t("navCloseLabel") : t("navOpenLabel");

  const activeItem = findActiveItem(items, activeHref);

  // Update the active href if this changes at all.
  useEffect(() => {
    if (activeOverride) {
      setActiveHref(activeOverride);
    }
  }, [activeOverride]);
  useEffect(() => setOpen(initialOpen), [initialOpen]);

  // Keyboard events
  const onSelect = (evt, href, callBack) => {
    const selectEvent = isSelectEvent(evt);
    // Only set the active href in the event that an override is not provided.
    if (selectEvent && !activeOverride && href !== activeHref) {
      setActiveHref(href);
    }

    if (callBack) {
      callBack(evt, href);
    }
  };

  const collapseButton = (
    <NavCollapseButton
      activeLabel={
        activeItem && collapseButtonLocation === "top"
          ? activeItem.label
          : undefined
      }
      collapseButtonLocation={collapseButtonLocation}
      onClick={(e) => {
        const nextOpen = !open;
        onToggle(e, nextOpen);
        setOpen(nextOpen);
      }}
      label={collapseButtonLabel}
      open={open}
    />
  );

  return (
    <nav
      aria-label={t("navLabel")}
      className={classnames(
        "pal--side-nav",
        {
          "pal--side-nav--collapsed": !open,
          "pal--side-nav--inverse": inverse,
        },
        className
      )}
      {...rest}
    >
      {collapseButtonLocation === "top" && collapseButton}
      <NavHeader
        active={isActiveItem({ href: titleHref }, activeHref)}
        href={titleHref}
        title={title}
        icon={icon}
        linkComponent={LinkComponent}
        onClick={(evt) => onSelect(evt, titleHref, onTitleClick)}
        onKeyDown={(evt) => onSelect(evt, titleHref)}
        showHeader={showHeader}
      />
      <NavItems
        activeHref={activeHref}
        showMenuItems={showMenuItems}
        items={items}
        linkComponent={LinkComponent}
        onSelect={onSelect}
      />
      {collapseButtonLocation === "right" && collapseButton}
    </nav>
  );
};

SideNav.propTypes = {
  /**
   * The href for the page the user is currently visiting. If this is not provided it will
   * attempt to get the location off of the windows pathname. Passing this prop in makes the component's
   * active state fully controlled by the prop.
   */
  activeHref: PropTypes.string,
  /**
   * A custom class name to be applied to the Nav's `nav` element.
   */
  className: PropTypes.string,
  /**
   * Whether or not the side nav should be collapsible.
   */
  collapseButtonLocation: PropTypes.oneOf(["top", "right"]),
  /**
   * The icon to render when using the nav header is visible.
   */
  icon: PropTypes.node,
  /**
   * Whether or not the side nav should render the inverse color theme (g90).
   */
  inverse: PropTypes.bool,
  /**
   * The nav items to render in the side nav.
   */
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  /**
   * A component or element to use for the link element. If you're using something like React Router this can be a helpful backdoor to pass
   * in your own component, so the page doesn't re-render.
   */
  linkComponent: PropTypes.elementType,
  /**
   * The locale used for translating the strings.
   */
  locale: PropTypes.string,
  /**
   * A callback function to call when the Side Nav toggle button is clicked.
   */
  onToggle: PropTypes.func,
  /**
   * If side nav should be open or not.
   */
  open: PropTypes.bool,
  /**
   * Whether or not the dropdown should be shown on small viewports.
   */
  showDropdown: PropTypes.bool,
  /**
   * Whether or not the header should be shown in the side nav.
   */
  showHeader: PropTypes.bool,
  /**
   * Whether or not menu items are allowed in the side nav.
   */
  showMenuItems: PropTypes.bool,
  /**
   * The title to be rendered at the top of the side nav component.
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * The location that clicking on the title element should link to.
   */
  titleHref: PropTypes.string,
  /**
   * An optional event handler that we'll run when the title is clicked
   */
  onTitleClick: PropTypes.func,
};

SideNav.defaultProps = {
  activeHref: "",
  showMenuItems: true,
  className: "",
  collapseButtonLocation: "top",
  icon: undefined,
  inverse: false,
  linkComponent: "a",
  // locale: documentLanguage,
  onToggle: () => {},
  open: true,
  showDropdown: false,
  showHeader: false,
  title: "",
  titleHref: "",
  onTitleClick: () => {},
};

// SideNav.translations = translationStrings;

export default SideNav;
