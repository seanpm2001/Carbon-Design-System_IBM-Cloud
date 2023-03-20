import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Button } from "@carbon/react";
import { useTranslation } from "react-i18next";

const OrderSummaryDetails = ({
  attributes,
  estimateButtonProps,
  isFree,
  // locale,
  title,
}) => {
  const { t } = useTranslation("OrderSummaryV2");

  return (
    <div className="pal--order-summary-v2__meta-details">
      <div className="pal--order-summary-v2__row">
        <h3 className="pal--order-summary-v2__heading">{title}</h3>
        {isFree && (
          <span className="pal--order-summary-v2__item-value">{t("free")}</span>
        )}
        {estimateButtonProps && !isFree && (
          <div className="pal--order-summary-v2__item-value">
            <Button
              {...estimateButtonProps}
              className={classnames(
                "pal--order-summary-v2__estimate-button",
                estimateButtonProps.className
              )}
              kind="ghost"
              size="small"
            >
              {t("estimateCosts")}
            </Button>
          </div>
        )}
      </div>
      <ul className="pal--order-summary-v2__meta-details-list">
        {attributes &&
          attributes.length > 0 &&
          attributes.map(({ label, value, key }) => (
            <li
              className="pal--order-summary-v2__meta-details-item"
              key={key || `${label}:${value}`}
            >
              {label}:{" "}
              <span className="pal--order-summary-v2__meta-details-item-value">
                {value}
              </span>
            </li>
          ))}
      </ul>
    </div>
  );
};

OrderSummaryDetails.propTypes = {
  /**
   * The set of details to render within the details summary.
   */
  attributes: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      key: PropTypes.string,
    })
  ),
  /**
   * Props to forward to the add to the estimate button.
   */
  estimateButtonProps: PropTypes.shape({
    className: PropTypes.oneOfType([PropTypes.string, PropTypes.shape({})]),
    onClick: PropTypes.func,
  }),
  /**
   * Whether or not the service is free.
   */
  isFree: PropTypes.bool,
  /**
   * The locale used for translating the strings.
   */
  // locale: PropTypes.string,
  /**
   * The title of the section. Usually the offering it's associated with.
   */
  title: PropTypes.string,
};

OrderSummaryDetails.defaultProps = {
  // locale: documentLanguage,
  attributes: [],
  title: "",
  isFree: false,
};

export default OrderSummaryDetails;
