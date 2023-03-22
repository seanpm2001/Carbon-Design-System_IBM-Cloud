import React from "react";
import PropTypes from "prop-types";
import { OverflowMenu, OverflowMenuItem } from "@carbon/react";
import { ChevronDown as ChevronDown16 } from "@carbon/react/icons";

const ActionsDropdown = ({
  label: dropdownLabel,
  kind: dropdownKind = "primary",
  actions,
}) => (
  <OverflowMenu
    flipped
    className="pal--data-table--actions-dropdown cds--btn"
    menuOptionsClass="pal--data-table--actions-dropdown-list"
    ariaLabel={dropdownLabel}
    renderIcon={() => (
      <span className={`cds--btn cds--btn--${dropdownKind}`}>
        {dropdownLabel}
        <ChevronDown16 className="cds--btn__icon" />
      </span>
    )}
  >
    {actions.map((action) => (
      <OverflowMenuItem
        key={action.label}
        itemText={action.label}
        {...action}
        requireTitle
      />
    ))}
  </OverflowMenu>
);

ActionsDropdown.propTypes = {
  label: PropTypes.node.isRequired,
  kind: PropTypes.string,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.node.isRequired,
      onClick: PropTypes.func,
      href: PropTypes.string,
    })
  ),
};

export default ActionsDropdown;
