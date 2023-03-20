import React from "react";
import PropTypes from "prop-types";
import { Button, InlineLoading } from "@carbon/react";
import { useTranslation } from "react-i18next";

const OrderSummaryButtons = ({
  primaryButtonLoading,
  primaryButtonLoadingText,
  primaryButtonProps,
  primaryButtonText,
  secondaryButtonLoading,
  secondaryButtonLoadingText,
  secondaryButtonText,
  secondaryButtonProps,
  estimateButtonLoading,
  estimateButtonProps,
  // locale,
}) => {
  const { t } = useTranslation("OrderSummaryV2");

  return (
    <div className="pal--order-summary-v2__button-group">
      {primaryButtonLoading ? (
        <div className="pal--order-summary-v2__inline-loading">
          <InlineLoading
            status="active"
            description={primaryButtonLoadingText || t("creating")}
          />
        </div>
      ) : (
        <Button kind="primary" {...primaryButtonProps}>
          {primaryButtonText}
        </Button>
      )}
      {secondaryButtonLoading && (
        <div className="pal--order-summary-v2__inline-loading">
          <InlineLoading
            status="active"
            description={secondaryButtonLoadingText || t("loading")}
          />
        </div>
      )}
      {secondaryButtonText && !secondaryButtonLoading ? (
        <Button kind="secondary" {...secondaryButtonProps}>
          {secondaryButtonText}
        </Button>
      ) : null}
      {estimateButtonLoading ? (
        <div className="pal--order-summary-v2__inline-loading">
          <InlineLoading status="active" description={t("loading")} />
        </div>
      ) : (
        <Button {...estimateButtonProps} kind="tertiary">
          {t("addToEstimate")}
        </Button>
      )}
    </div>
  );
};

OrderSummaryButtons.propTypes = {
  /**
   * Props to pass to the add to estimate button.
   */
  estimateButtonProps: PropTypes.shape({
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
  }),
  /**
   * The locale to use for translation strings.
   */
  // locale: PropTypes.string,
  /**
   * Whether or not the primary button should show the inline loader.
   */
  primaryButtonLoading: PropTypes.bool,
  /**
   * Props to forward to the primary button.
   */
  primaryButtonProps: PropTypes.shape({}),
  /**
   * The primary button text to display.
   */
  primaryButtonText: PropTypes.string,
  /**
   * The loading text to show for the primary button.
   */
  primaryButtonLoadingText: PropTypes.string,
  /**
   * Text to display in the secondary button if shown.
   */
  secondaryButtonText: PropTypes.string,
  /**
   * Props to pass forward to the secondary button
   */
  secondaryButtonProps: PropTypes.shape({}),
  /**
   * Whether or not to show the loader for the secondary button.
   */
  secondaryButtonLoading: PropTypes.bool,
  /**
   * The loading text to show for the secondary button.
   */
  secondaryButtonLoadingText: PropTypes.string,
  /**
   * Whether or not to show the loader for the estimate button.
   */
  estimateButtonLoading: PropTypes.bool,
};

export default OrderSummaryButtons;
