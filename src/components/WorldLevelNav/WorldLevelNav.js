import React, { useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import SideNav from "../SideNavExperimental";
import debounce from "../../utils/debounce";

const WorldLevelNav = ({ className, open, onToggle, ...props }) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    setIsOpen(!!window && !!document && window.innerWidth >= 672 && open);
    if (!!window && !!document && window.innerWidth < 672) {
      onToggle();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resizeEventListener = useCallback(
    (e) => {
      if (isOpen && window.innerWidth < 672) {
        setIsOpen(false);
        onToggle(e, false);
      } else if (!isOpen && window.innerWidth >= 672) {
        setIsOpen(true);
        onToggle(e, true);
      }
    },
    [isOpen, onToggle]
  );

  useEffect(() => {
    const debouncedResizeEventListener = debounce(resizeEventListener, 500);
    if (typeof window !== "undefined" && typeof document !== "undefined") {
      window.addEventListener("resize", debouncedResizeEventListener);
    }

    return () =>
      window.removeEventListener("resize", debouncedResizeEventListener);
  }, [resizeEventListener]);

  return (
    <SideNav
      {...props}
      onToggle={onToggle}
      className={classNames("pal--world-level-nav", className)}
      collapseButtonLocation="right"
      showMenuItems
      showDropdown={false}
      showHeader
      inverse
      open={isOpen}
    />
  );
};

WorldLevelNav.propTypes = {
  /**
   * The href for the page the user is currently visiting. If this is not provided it will
   * attempt to get the location off of the window's pathname. This can be useful for worlds
   * that do not use React Router and re-render on every page load or if the activeHref
   * needs to be set manually.
   */
  activeHref: PropTypes.string,
  /**
   * A custom class name to be applied to the Nav's `nav` element.
   */
  className: PropTypes.string,
  /**
   * The icon to render above the World Level Nav title.
   */
  icon: PropTypes.node.isRequired,
  /**
   * The items for the navigation to render. If nested items are provided a sub menu will be created instead
   * with the label as the title of the menu and the href for the menu will be ignored. If you're using
   * React router you may also provide the to prop to the provided LinkComponent in place of the href. To
   * add an icon to the navigation Link, you must pass an 16px icon component as prop.
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      icon: PropTypes.elementType,
      to: PropTypes.string,
      menuButtonComponent: PropTypes.elementType,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      items: PropTypes.arrayOf(
        PropTypes.shape({
          href: PropTypes.string,
          to: PropTypes.string,
          label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
        })
      ),
    })
  ).isRequired,
  /**
   * A component or element to use for the link element. If you're using something like React Router
   * this can be a helpful backdoor to pass in your own component, so the page doesn't re-render.
   * Currently only the `to` and href props are supported to be passed into the link component.
   * If the nav item includes an href prop the link component will default to using an a tag.
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
   * The title to be rendered at the top of the side nav component.
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /**
   * The location that clicking on the title element should link to.
   */
  titleHref: PropTypes.string.isRequired,
  /**
   * An optional event handler that we'll run when the title is clicked
   */
  onTitleClick: PropTypes.func,
};

WorldLevelNav.defaultProps = {
  activeHref: "",
  className: "",
  linkComponent: "a",
  // locale: documentLanguage,
  onToggle: () => {},
  open: true,
  onTitleClick: () => {},
};

export default WorldLevelNav;
