import React from "react";
import classnames from "classnames";
import PropTypes from "prop-types";
// import translationStrings from '../translations';
// import getLocale from '../../../utils/getLocale';
// import translationUtils from '../../../utils/translate';

const OrderSummaryHeader = ({
  countrySwitcher,
  currencySwitcher,
  // locale
}) => {
  // const translate = translationUtils.getTranslateFunction(
  //   translationStrings,
  //   getLocale(locale),
  // );

  return (
    <div
      className={classnames(
        "pal--order-summary-v2__header",
        "pal--order-summary-v2__g-90",
        {
          "pal--order-summary-v2__header--wrap":
            countrySwitcher && currencySwitcher,
        }
      )}
    >
      <h2 className="pal--order-summary-v2__heading">{"summaryHeader"}</h2>
      <div className="pal--order-summary-v2__switchers">
        {countrySwitcher && (
          <div className="pal--order-summary-v2__dropdown pal--order-summary-v2__country-switcher">
            {countrySwitcher}
          </div>
        )}
        {currencySwitcher && (
          <div className="pal--order-summary-v2__dropdown pal--order-summary-v2__currency-switcher">
            {currencySwitcher}
          </div>
        )}
      </div>
    </div>
  );
};

OrderSummaryHeader.propTypes = {
  /**
   * The locale to use for translation strings.
   */
  // locale: PropTypes.string,
  /**
   * A dropdown element for the country switcher that can be passed into the Order Summary
   */
  countrySwitcher: PropTypes.element,
  /**
   * A dropdown element for the currency switcher that can be passed into the Order Summary
   */
  currencySwitcher: PropTypes.element,
};

export default OrderSummaryHeader;
