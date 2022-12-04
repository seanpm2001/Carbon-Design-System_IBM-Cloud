import React from "react";
import PropTypes from "prop-types";
import { Button, InlineLoading } from "@carbon/react";

const SidePanelControls = ({
  cancelText,
  doneText,
  nextId,
  nextText,
  onCancel,
  onNext,
  onDone,
  onPrevious,
  previousText,
  primaryButtonDisabled,
  primaryButtonDanger,
  renderPrimaryButton,
  secondaryButtonDisabled,
  previousId,
  doneIsLoading,
  doneIsLoadingText,
}) => (
  <div className="cds--btn-set pal--side-panel__btn-set">
    <Button
      disabled={secondaryButtonDisabled || doneIsLoading}
      kind="secondary"
      onClick={previousId ? (e) => onPrevious(e, previousId) : onCancel}
      className="pal--side-panel__button"
    >
      {previousId ? previousText : cancelText}
    </Button>
    {renderPrimaryButton && !doneIsLoading && (
      <Button
        disabled={primaryButtonDisabled}
        kind={primaryButtonDanger ? "danger" : "primary"}
        onClick={nextId ? (e) => onNext(e, nextId) : onDone}
        className="pal--side-panel__button"
      >
        {nextId ? nextText : doneText}
      </Button>
    )}
    {doneIsLoading && <InlineLoading description={doneIsLoadingText} />}
  </div>
);

SidePanelControls.propTypes = {
  cancelText: PropTypes.string.isRequired,
  doneText: PropTypes.string.isRequired,
  nextId: PropTypes.string,
  nextText: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onNext: PropTypes.func.isRequired,
  onDone: PropTypes.func.isRequired,
  onPrevious: PropTypes.func.isRequired,
  previousText: PropTypes.string.isRequired,
  primaryButtonDisabled: PropTypes.bool.isRequired,
  primaryButtonDanger: PropTypes.bool,
  renderPrimaryButton: PropTypes.bool.isRequired,
  secondaryButtonDisabled: PropTypes.bool.isRequired,
  previousId: PropTypes.string,
  doneIsLoading: PropTypes.bool.isRequired,
  doneIsLoadingText: PropTypes.string.isRequired,
};

export default SidePanelControls;
