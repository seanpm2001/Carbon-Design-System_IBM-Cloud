import React from "react";
import PropTypes from "prop-types";
// Carbon Components
import { ChevronRight as ChevronRight16 } from "@carbon/react/icons";
// cpx Components
import NavItem from "./NavItem";
import { isActiveItem } from "../utils/findActiveItem";

const NavFlyout = ({
  activeHref,
  id,
  items,
  label: menuButtonLabel,
  menuButtonComponent: MenuButtonComponent,
  onItemSelect,
  linkComponent: LinkComponent,
  icon: Icon,
}) => {
  const flyoutButtonRef = React.useRef(null);
  const flyoutContentRef = React.useRef(null);
  const [position, setPosition] = React.useState(0);
  const [boxPosition, setBoxPosition] = React.useState(0);
  const [hover, setHover] = React.useState(false);
  React.useLayoutEffect(() => {
    if (flyoutButtonRef.current) {
      const findNavItemsComponents = (element) => {
        if (element?.className === "cpx--side-nav__items") {
          return element;
        }
        if (element.parentElement && element.parentElement.nodeName !== "NAV") {
          return findNavItemsComponents(element.parentElement);
        }
        return undefined;
      };
      const parent = findNavItemsComponents(flyoutButtonRef.current);
      const parentScroll = parent ? parent.scrollTop : 0;
      // We need to manually position the flyout since it is absolutely positioned relative to the whole Nav element (versus button)
      // Due to how we need to preserve the overflow.
      // First we get the height offset of the flyout menu (the button). Then we substract the scroll position of the container if there is any.
      // The resulting position would position the flyout's top to be aligned with the button's top. However if the flyout is large this might
      // not look as good, so we go a step further and we move the flyout up so that its center is lined up with the menu instead, by
      // adding half of the flyout height, and half of the flyout menu button height.
      const centeredPosition =
        flyoutButtonRef.current.offsetTop -
        parentScroll
      setPosition(centeredPosition);
      setBoxPosition(flyoutButtonRef.current.offsetTop - parentScroll);
    }
  }, [position, hover]);

  const iconItem = !Icon ? null : (
    <Icon
      aria-label="icon"
      className="cpx--side-nav__item-icon"
      aria-hidden="true"
    />
  );

  return (
    <li
      className="cpx--side-nav__item"
    >
      <MenuButtonComponent
        aria-haspopup="true"
        ref={flyoutButtonRef}
        onMouseOver={() => setHover(true)}
        onMouseOut={() => setHover(false)}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        type="button"
        className="cpx--side-nav__menu-button cpx--side-nav__menu-flyout"
        id={id}
      > 
        <div className="cpx--side-nav__menu-button__label">
          {iconItem}
          {menuButtonLabel}
        </div>
        <ChevronRight16 className="cpx--side-nav__menu-icon" />
        <span
          className="cpx--side-nav__flyout-box"
          style={{ top: boxPosition }}
        />
        <ul
          ref={flyoutContentRef}
          className="cpx--side-nav__flyout"
          style={{ top: position }}
        >
          {items.map((item) => {
            const {
              onClick: onItemClick,
              onKeyDown: onItemKeyDown,
              href,
              to,
              label,
              ...props
            } = item;
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
      </MenuButtonComponent>
    </li>
  );
};

NavFlyout.propTypes = {
  /**
   * The href of the nav item that should be active.
   */
  activeHref: PropTypes.string.isRequired,
  /**
   * A unique identifier to apply to the nav flyout element.
   */
  id: PropTypes.string,
  /**
   * The label to assign to the nav flyout element.
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
   * The event to fire off when selecting a navigation item.
   */
  onItemSelect: PropTypes.func.isRequired,
  /**
   * The flyout nested items to pass in for the flyout to render.
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string,
      label: PropTypes.string,
    })
  ).isRequired,
  /**
   * Icon of the item
   */
  icon: NavItem.propTypes.icon
};

NavFlyout.defaultProps = {
  id: undefined,
  linkComponent: "a",
  menuButtonComponent: "button",
  icon: undefined,
};

export default NavFlyout;
