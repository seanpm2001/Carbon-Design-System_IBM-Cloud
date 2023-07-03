import React from 'react';
import PropTypes from 'prop-types';

import NavItem from './NavItem';
import NavMenu from './NavMenu';
import { findActiveItem, isActiveItem } from '../utils/findActiveItem';

const NavItems = ({
  items,
  showMenuItems,
  activeHref,
  linkComponent: LinkComponent,
  onSelect,
}) => (
  <ul className="pal--side-nav-experimental__items">
    {items.map(item => {
      const {
        items: subItems,
        onClick,
        onKeyDown,
        href,
        to,
        label,
        ...itemProps
      } = item;
      return subItems && showMenuItems ? (
        <NavMenu
          key={`${label}-${href}`}
          active={!!findActiveItem(subItems, activeHref)}
          {...itemProps}
          onClick={onClick}
          label={label}
          activeHref={activeHref}
          items={subItems}
          linkComponent={LinkComponent}
          onItemSelect={onSelect}
        />
      ) : (
        <NavItem
          key={href ? `${label}-${href}` : `${label}-${to}`}
          active={isActiveItem(item, activeHref)}
          {...itemProps}
          linkComponent={href ? 'a' : LinkComponent}
          label={label}
          href={href}
          to={to}
          onClick={evt => onSelect(evt, to || href, onClick)}
          onKeyDown={evt => onSelect(evt, to || href, onKeyDown)}
        />
      );
    })}
  </ul>
);

NavItems.defaultProps = {
  showMenuItems: true,
  linkComponent: 'a',
};

NavItems.propTypes = {
  /**
   * The href for the current page the user is on.
   */
  activeHref: PropTypes.string.isRequired,
  /**
   * Whether or not the sub menu of items should be shown.
   */
  showMenuItems: PropTypes.bool,
  /**
   * A list of items to render in the nav.
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string,
      href: PropTypes.string,
      icon: PropTypes.node,
      label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
      items: PropTypes.arrayOf(
        PropTypes.shape({
          to: PropTypes.string,
          href: PropTypes.string,
          label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
          flyoutItems: PropTypes.arrayOf(
            PropTypes.shape({
              to: PropTypes.string,
              href: PropTypes.string,
              label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
            }),
          ),
        }),
      ),
    }),
  ).isRequired,
  /**
   * The component to use for navigation links.
   */
  linkComponent: PropTypes.elementType,
  /**
   * An event to fire off upon selecting the
   */
  onSelect: PropTypes.func.isRequired,
};

export default NavItems;
