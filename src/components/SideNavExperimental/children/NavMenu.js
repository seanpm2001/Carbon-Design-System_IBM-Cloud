import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// Carbon Components
import { ChevronDown, ChevronUp } from "@carbon/react/icons";
// cpx Components
import NavItem from "./NavItem";
import { findActiveItem, isActiveItem } from "../utils/findActiveItem";
import NavFlyout from "./NavFlyout";

const NavMenu = ({
  active: navMenuActive,
  activeHref,
  className,
  id,
  items,
  label: menuButtonLabel,
  menuButtonComponent: MenuButtonComponent,
  onClick,
  onItemSelect,
  open: controlledOpen,
  linkComponent: LinkComponent,
  icon: Icon,
  ...rest
}) => {
  // Component State
  const [open, setOpen] = useState(controlledOpen || navMenuActive);

  const iconItem = !Icon ? null : (
    <Icon
      aria-label="icon"
      className="cpx--side-nav__item-icon"
      aria-hidden="true"
    />
  );

  // Event Handlers
  const toggleOpen = (...args) => {
    setOpen(!open);
    onClick(!open, ...args);
  };

  useEffect(() => {
    setOpen(controlledOpen);
  }, [controlledOpen]);

  return (
    <li
      className={classnames(
        "cpx--side-nav__item",
        "cpx--side-nav__item--with-menu",
        { "cpx--side-nav__item--active": navMenuActive && !open },
        className
      )}
      {...rest}
    >
      <MenuButtonComponent
        aria-haspopup="true"
        aria-expanded={open}
        type="button"
        className="cpx--side-nav__menu-button"
        id={id}
        onClick={toggleOpen}
      >
        <div className="cpx--side-nav__menu-button__label">
          {iconItem}
          {menuButtonLabel}
        </div>
        <ChevronDown className="cpx--side-nav__menu-icon" />
      </MenuButtonComponent>
      <ul className="cpx--side-nav__menu">
        {items.map((item) => {
          const {
            onClick: onItemClick,
            onKeyDown: onItemKeyDown,
            href,
            to,
            label,
            flyoutItems,
            ...props
          } = item;
          if (flyoutItems) {
            return (
              <NavFlyout
                key={`${label}-${href}`}
                active={!!findActiveItem(flyoutItems, activeHref)}
                {...props}
                label={label}
                activeHref={activeHref}
                items={flyoutItems}
                onItemSelect={onItemSelect}
                linkComponent={LinkComponent}
              />
            );
          }
          return (
            <NavItem
              key={`${href}-${label}`}
              active={isActiveItem(item, activeHref)}
              {...props}
              linkComponent={href ? "a" : LinkComponent}
              label={label}
              to={to}
              href={href}
              onClick={(evt) => onItemSelect(evt, to || href, onItemClick)}
              onKeyDown={(evt) => onItemSelect(evt, to || href, onItemKeyDown)}
            />
          );
        })}
      </ul>
    </li>
  );
};

NavMenu.propTypes = {
  /**
   * Whether the nav menu is active or not.
   */
  active: PropTypes.bool.isRequired,
  /**
   * The href of the nav item that should be active.
   */
  activeHref: PropTypes.string.isRequired,
  /**
   * Any class names to apply to the nav list element.
   */
  className: PropTypes.string,
  /**
   * A unique identifier to apply to the nav list element.
   */
  id: PropTypes.string,
  /**
   * Whether or not the NavList is open by default.
   */
  open: PropTypes.bool,
  /**
   * The label to assign to the nav list.
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * The component to use for link elements. Useful for when using React Router.
   */
  linkComponent: PropTypes.elementType,
  /**
   * A menu button component to render instead of the button. Useful if teams need to intercept
   * the menu button to render a separate component in its place, such as when nesting including
   * interactive content within the menu.
   */
  menuButtonComponent: PropTypes.elementType,
  /**
   * The onClick event listener to bind to the nav button.
   */
  onClick: PropTypes.func,
  /**
   * The event to fire off when selecting a navigation item.
   */
  onItemSelect: PropTypes.func.isRequired,
  /**
   * The items to pass in for the nav list to render.
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          href: PropTypes.string,
          label: PropTypes.string,
        })
      ),
    })
  ).isRequired,
  /**
   * Icon of the item
   */
  icon: NavItem.propTypes.icon
};

NavMenu.defaultProps = {
  className: "",
  id: undefined,
  linkComponent: "a",
  menuButtonComponent: "button",
  open: false,
  onClick: () => {},
  icon: undefined,
};

export default NavMenu;
