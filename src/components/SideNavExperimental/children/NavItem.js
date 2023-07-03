import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

const NavItem = ({
  active,
  className,
  href,
  icon: Icon,
  itemComponent: ItemComponent,
  label,
  linkComponent: LinkComponent,
  onClick,
  onKeyDown,
  to,
  ...rest
}) => {
  const ref = useRef()
  const iconItem = !Icon ? null : (
    <Icon
      aria-label="icon"
      className="pal--side-nav-experimental__item-icon pal--side-nav__menu-icon"
      aria-hidden="true"
    />
  );

  const trackCursorGradient = (e) => {
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left - rect.width/2
    let y = e.clientY - rect.top + rect.y/2 - rect.height/2

    ref.current.style.setProperty('--x', x + 'px');
    ref.current.style.setProperty('--y', y + 'px');
  }

  return (
    <ItemComponent
      ref={ref}
      className={classnames(
        'pal--side-nav-experimental__item',
        { 'pal--side-nav-experimental__item--active': active },
        className,
      )}
      onMouseMove={trackCursorGradient}

    >
      <LinkComponent
        
        href={href}
        to={href ? undefined : to}
        className="pal--side-nav-experimental__link"
        {...rest}
        onClick={evt => onClick(evt, href || to)}
        onKeyDown={evt => onKeyDown(evt, href || to)}
        aria-current={active ? 'page' : undefined}
      >
        {label}
        {iconItem}
      </LinkComponent>
    </ItemComponent>
  );
};

NavItem.propTypes = {
  /**
   * Whether or not the page the user is representative of the currently selected nav item.
   */
  active: PropTypes.bool,
  /**
   * The class name to apply to the nav item's li element.
   */
  className: PropTypes.string,
  /**
   * The location to link the nav item to.
   */
  href: PropTypes.string,
  /**
   * Icon of the item
   */
  icon: PropTypes.node,
  /**
   * A component or element to use for the item element.
   */
  itemComponent: PropTypes.elementType,
  /**
   * The value of the nav item to be rendered.
   */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * A component or element to use for the link element. If you're using something like React Router this can be a helpful backdoor to pass
   * in your own component, so the page doesn't re-render.
   */
  linkComponent: PropTypes.elementType,
  /**
   * A call back function to fire upon clicking the nav item.
   */
  onClick: PropTypes.func.isRequired,
  /**
   * A call back function to fire upon pressing a key on the nav item.
   */
  onKeyDown: PropTypes.func.isRequired,
  /**
   * The location to link the nav item to if using a Link Component.
   */
  to: PropTypes.string,
};

NavItem.defaultProps = {
  className: '',
  href: '',
  active: false,
  itemComponent: 'li',
  label: '',
  linkComponent: 'a',
  to: undefined,
};

export default NavItem;
