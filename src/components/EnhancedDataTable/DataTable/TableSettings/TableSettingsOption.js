import PropTypes from "prop-types";
import React from "react";

const TableSettingsOption = React.forwardRef(({ children }, ref) => (
  <li ref={ref} className="cds--table-settings-menu__option" role="menuitem">
    {children}
  </li>
));

TableSettingsOption.propTypes = {
  /**
   * Specify the contents of the ToolbarOption
   */
  children: PropTypes.node.isRequired,
};

export default TableSettingsOption;
