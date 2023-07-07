import React from "react";
import PropTypes from "prop-types";
import {
  ChevronDown as ChevronDown16,
  ChevronLeft as ChevronLeft16,
} from "@carbon/react/icons";

const NavCollapseButton = ({
  onClick,
  label,
  activeLabel,
  collapseButtonLocation,
  open,
}) => {
  const CollapseIcon =
    collapseButtonLocation === "top" ? ChevronDown16 : ChevronLeft16;
  return (
    <button
      aria-haspopup="true"
      aria-expanded={open}
      className={`cpx--side-nav__collapse-button ${
        activeLabel ? "cpx--side-nav__collapse-button--active" : ""
      }`}
      type="button"
      onClick={onClick}
    >
      <span className="cds--assistive-text">{label}</span>
      {activeLabel && (
        <span className="cpx--side-nav__collapse-button-active-item">
          {activeLabel}
        </span>
      )}
      <CollapseIcon className="cpx--side-nav__collapse-button-icon" />
    </button>
  );
};

NavCollapseButton.defaultProps = {
  activeLabel: undefined,
};

NavCollapseButton.propTypes = {
  /**
   * The item that is currently active on the navigation
   */
  activeLabel: PropTypes.string,
  /**
   * The location of the collapseButton
   */
  collapseButtonLocation: PropTypes.string.isRequired,
  /**
   * A function to call when the collapse button is clicked.
   */
  onClick: PropTypes.func.isRequired,
  /**
   * The aria label to apply to the svg on the button.
   */
  label: PropTypes.string.isRequired,
  /**
   * Whether to menu is open or not
   */
  open: PropTypes.bool.isRequired,
};

export default NavCollapseButton;
