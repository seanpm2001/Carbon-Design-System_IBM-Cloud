import React from "react";
import PropTypes from "prop-types";
import Translate from "../../Translate";
import { useTranslation } from "react-i18next";

const OrderSummaryFooterText = ({
  termsText,
  loginLink,
  // locale
}) => {
  const { t } = useTranslation("OrderSummaryV2");

  return (
    <>
      {(termsText || loginLink) && (
        <div className="pal--order-summary-v2__footer-text pal--order-summary-v2__links">
          {termsText}
          {loginLink && (
            <Translate tagProps={[{ href: loginLink }]}>
              {t("loginText")}
            </Translate>
          )}
        </div>
      )}
    </>
  );
};

OrderSummaryFooterText.propTypes = {
  /**
   * The terms text to render in the order summary footer.
   */
  termsText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /**
   * The link to direct the user to log in if they are unauthenticated.
   */
  loginLink: PropTypes.string,
  /**
   * The locale to use for translation strings.
   */
  // locale: PropTypes.string,
};

export default OrderSummaryFooterText;
