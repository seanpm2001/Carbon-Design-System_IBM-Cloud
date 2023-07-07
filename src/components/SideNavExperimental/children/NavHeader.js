import React from 'react';
import PropTypes from 'prop-types';
import NavItem from './NavItem';

const NavHeader = ({
  active,
  href,
  linkComponent: LinkComponent,
  onClick,
  onKeyDown,
  showHeader,
  title,
}) =>
  showHeader ? (
    <NavItem
      className="cpx--side-nav__header"
      itemComponent="h2"
      href={LinkComponent !== 'a' ? undefined : href}
      to={LinkComponent !== 'a' ? href : undefined}
      active={active}
      onClick={evt => onClick(evt, href)}
      onKeyDown={evt => onKeyDown(evt, href)}
      label={
        <>
          {title}
        </>
      }
    />
  ) : null;

NavHeader.propTypes = {
  /**
   * Whether or not the main page is currently selected.
   */
  active: PropTypes.bool,
  /**
   * The URL for the headers main page.
   */
  href: PropTypes.string,
  /**
   * The title of the currently selected page.
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * The component to use as the link component.
   */
  linkComponent: PropTypes.elementType,
  /**
   * A function to fire off upon clicking the header.
   */
  onClick: PropTypes.func.isRequired,
  /**
   * A function to fire off upon pressing a key down on the header element.
   */
  onKeyDown: PropTypes.func.isRequired,
  /**
   * Whether or not to display the header in the nav.
   */
  showHeader: PropTypes.bool,
};

NavHeader.defaultProps = {
  active: false,
  title: undefined,
  linkComponent: undefined,
  href: undefined,
  showHeader: false,
};

export default NavHeader;
