import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "@carbon/react";
import { useTranslation } from "react-i18next";

const OrderSummaryTotals = ({
  subTotalItems,
  totalCost,
  totalCostSuffix,
  totalCostText,
  tooltipText,
}) => {
  const { t } = useTranslation("OrderSummaryV2");

  const defaultSuffix = totalCostText ? "" : `/${t("monthShort")}`; // for backward compatibility
  const suffix =
    totalCostSuffix === undefined ? defaultSuffix : totalCostSuffix;
  const totalCostWithSuffix = `${totalCost}${suffix}`;

  return (
    <>
      {(subTotalItems.length || totalCost) && (
        <ul className="pal--order-summary-v2__totals">
          {subTotalItems.map(({ label, value, key }) => (
            <li key={key} className="pal--order-summary-v2__row">
              <span className="pal--order-summary-v2__item-name">{label}</span>
              <span className="pal--order-summary-v2__item-value">{value}</span>
            </li>
          ))}
          {totalCost && (
            <li className="pal--order-summary-v2__row pal--order-summary-v2__total-cost">
              <div>
                <span className="pal--order-summary-v2__heading">
                  {totalCostText || t("totalEstimated")}
                </span>
                {tooltipText && (
                  <Tooltip
                    triggerText=""
                    direction="bottom"
                    iconDescription="Info"
                  >
                    <p>{tooltipText}</p>
                  </Tooltip>
                )}
              </div>

              {typeof totalCost === "string" ? (
                <span className="pal--order-summary-v2__item-value">
                  {totalCostWithSuffix}
                </span>
              ) : (
                totalCost
              )}
            </li>
          )}
        </ul>
      )}
    </>
  );
};

OrderSummaryTotals.propTypes = {
  /**
   * Sub total items to render above the total cost.
   */
  subTotalItems: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.string,
      key: PropTypes.string,
    })
  ),
  /**
   * The total cost of the order summary items.
   */
  totalCost: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  /**
   * The total cost text to render.
   */
  totalCostText: PropTypes.string,
  /**
   * The locale used for translating the strings.
   */
  // locale: PropTypes.string,
  /**
   * The content of the tooltip appearing next to the total cost text.
   */
  tooltipText: PropTypes.string,
  /**
   * Text appearing after the total cost. Can be used to indicate billing cycle (/month, /year)
   */
  totalCostSuffix: PropTypes.string,
};

OrderSummaryTotals.defaultProps = {
  // locale: documentLanguage,
  subTotalItems: [],
};

export default OrderSummaryTotals;
