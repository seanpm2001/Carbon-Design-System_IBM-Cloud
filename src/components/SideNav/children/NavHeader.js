import React from 'react';
import PropTypes from 'prop-types';
import NavItem from './NavItem';

const NavHeader = ({
  showHeader,
  title,
}) =>
  showHeader ? (
    <h2 className="cpx--side-nav__header">
      {title}
    </h2>
  ) : null;

NavHeader.propTypes = {
  /**
   * The title of the currently selected page.
   */
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * Whether or not to display the header in the nav.
   */
  showHeader: PropTypes.bool,
};

NavHeader.defaultProps = {
  title: undefined,
  showHeader: false,
};

export default NavHeader;
