import React from "react";
import PropTypes from "prop-types";
import { Close as Close16 } from "@carbon/react/icons";

const SidePanelCloseButton = ({
  activePanelId,
  closeButtonRef,
  focusOnLast,
  onTabToNext,
  iconDescription,
  onClose,
  onTabToPrev,
  panelId,
}) => (
  <button
    className="cds--btn cds--btn--icon-only cds--btn--ghost pal--side-panel__button-close"
    onClick={onClose}
    ref={closeButtonRef}
    disabled={panelId !== activePanelId}
    type="button"
    title={iconDescription}
    aria-label={iconDescription}
    onKeyDown={(e) => {
      if (focusOnLast) {
        onTabToPrev(e);
      }
      onTabToNext(e);
    }}
  >
    <Close16 aria-label={iconDescription} />
  </button>
);

SidePanelCloseButton.propTypes = {
  activePanelId: PropTypes.string.isRequired,
  closeButtonRef: PropTypes.shape({
    current: PropTypes.node,
  }),
  focusOnLast: PropTypes.bool.isRequired,
  iconDescription: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  onTabToNext: PropTypes.func.isRequired,
  onTabToPrev: PropTypes.func.isRequired,
  panelId: PropTypes.string.isRequired,
};

export default SidePanelCloseButton;
