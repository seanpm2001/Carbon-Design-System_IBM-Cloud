import React from "react";
import PropTypes from "prop-types";

import OrderSummaryContainer from "./children/OrderSummaryV2Container";
import OrderSummaryHeader from "./children/OrderSummaryV2Header";
import OrderSummaryContent from "./children/OrderSummaryV2Content";
import OrderSummaryFooter from "./children/OrderSummaryV2Footer";
import OrderSummaryItems from "./children/OrderSummaryV2Items";
import OrderSummaryDetails from "./children/OrderSummaryV2Details";
import OrderSummaryTotals from "./children/OrderSummaryV2Totals";
import OrderSummaryFootnotes from "./children/OrderSummaryV2Footnotes";
import OrderSummaryTerms from "./children/OrderSummaryV2Terms";
import OrderSummaryButtons from "./children/OrderSummaryV2Buttons";
import OrderSummaryFooterLinks from "./children/OrderSummaryV2FooterLinks";

const OrderSummaryV2 = ({
  className,
  countrySwitcher,
  currencySwitcher,
  details,
  estimateButtonLoading,
  estimateButtonProps,
  estimateData,
  footnotes,
  isFree,
  items,
  // locale,
  loginLink,
  notifications,
  primaryButtonLoading,
  primaryButtonProps,
  primaryButtonText,
  primaryButtonLoadingText,
  secondaryButtonLoading,
  secondaryButtonProps,
  secondaryButtonText,
  secondaryButtonLoadingText,
  subTotalItems,
  submitPromoCode,
  termsCheckbox,
  termsText,
  totalCost,
  totalCostSuffix,
  totalCostText,
  totalCostTooltipText,
}) => {
  const singleDetail = details ? [details] : [];
  const detailsArr = Array.isArray(details) ? details : singleDetail;
  const indentedItems = !!items.find(
    ({ quantity, items: nestedItems }) => quantity || nestedItems
  );

  const onEstimateClick = (e) => {
    if (
      typeof window !== "undefined" &&
      window.header &&
      window.header.loadEstimatorJS &&
      estimateData
    ) {
      setTimeout(() => {
        window.header.loadEstimatorJS(estimateData);
      });
    }
    if (estimateButtonProps.onClick) {
      estimateButtonProps.onClick(e);
    }
  };

  return (
    <OrderSummaryContainer className={className}>
      <OrderSummaryHeader
        countrySwitcher={countrySwitcher}
        currencySwitcher={currencySwitcher}
        // locale={locale}
      />
      <OrderSummaryContent>
        {detailsArr.map((detail, index) => (
          <OrderSummaryDetails
            key={detail.key || detail.title}
            {...detail}
            isFree={isFree}
            // locale={locale}
            estimateButtonProps={
              index === 0 && !estimateButtonProps.disabled
                ? {
                    ...estimateButtonProps,
                    onClick: onEstimateClick,
                  }
                : undefined
            }
          />
        ))}
        <OrderSummaryItems
          items={items}
          indented={!!indentedItems}
          // locale={locale}
        />
        {notifications}
      </OrderSummaryContent>
      <OrderSummaryFooter noDivider={!(details || items.length !== 0)}>
        {submitPromoCode}
        <OrderSummaryTotals
          subTotalItems={subTotalItems}
          totalCost={totalCost}
          totalCostSuffix={totalCostSuffix}
          totalCostText={totalCostText}
          tooltipText={totalCostTooltipText}
          // locale={locale}
        />
        <OrderSummaryFootnotes>{footnotes}</OrderSummaryFootnotes>
        <OrderSummaryTerms>{termsCheckbox}</OrderSummaryTerms>
        <OrderSummaryButtons
          primaryButtonLoading={primaryButtonLoading}
          primaryButtonLoadingText={primaryButtonLoadingText}
          primaryButtonProps={primaryButtonProps}
          primaryButtonText={primaryButtonText}
          secondaryButtonLoading={secondaryButtonLoading}
          secondaryButtonLoadingText={secondaryButtonLoadingText}
          secondaryButtonText={secondaryButtonText}
          secondaryButtonProps={secondaryButtonProps}
          estimateButtonLoading={estimateButtonLoading}
          estimateButtonProps={{
            ...estimateButtonProps,
            onClick: onEstimateClick,
          }}
          // locale={locale}
        />
        <OrderSummaryFooterLinks
          termsText={termsText}
          loginLink={loginLink}
          // locale={locale}
        />
      </OrderSummaryFooter>
    </OrderSummaryContainer>
  );
};

OrderSummaryV2.propTypes = {
  /**
   * The locale to use for translation strings.
   */
  // locale: PropTypes.string,
  /**
   * The link to direct the user to log in if they are unauthenticated.
   */
  loginLink: PropTypes.string,
  /**
   * A class name to provide to the order summary component.
   */
  className: PropTypes.string,
  /**
   * A dropdown element for the country switcher that can be passed into the Order Summary
   */
  countrySwitcher: PropTypes.element,
  /**
   * A dropdown element for the currency switcher that can be passed into the Order Summary
   */
  currencySwitcher: PropTypes.element,
  /**
   * A checkbox to render in the order summary. Can be used for agreeing to third party terms and conditions.
   */
  termsCheckbox: PropTypes.element,
  /**
   * The meta details for the offering. This can include things like region, plan, service name, resource group, etc.
   */
  details: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        attributes: PropTypes.arrayOf(
          PropTypes.shape({
            name: PropTypes.string,
            value: PropTypes.string,
          })
        ),
      })
    ),
    PropTypes.shape({
      title: PropTypes.string,
      attributes: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          value: PropTypes.string,
        })
      ),
    }),
  ]),
  /**
   * Whether or not to show the loader for the estimate button.
   */
  estimateButtonLoading: PropTypes.bool,
  /**
   * The data to pass to the estimator. This can be found here: https://github.ibm.com/ibmcloud/estimator/wiki/Core-Examples
   */
  estimateData: PropTypes.shape({}),
  /**
   * Text to display in the secondary button if shown.
   */
  secondaryButtonText: PropTypes.string,
  /**
   * Props to pass forward to the secondary button.
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
   * If the tier of the offering the user has selected is free.
   */
  isFree: PropTypes.bool,
  /**
   * The items to be displayed in the details of the Order Summary.
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      accordionText: PropTypes.string,
      id: PropTypes.string,
      key: PropTypes.string,
      name: PropTypes.string,
      value: PropTypes.string,
      quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      items: PropTypes.arrayOf(
        PropTypes.shape({
          accordionText: PropTypes.string,
          name: PropTypes.string,
          value: PropTypes.node,
          quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        })
      ),
    })
  ),
  /**
   * Carbon's inline notification component. This prop will only accept instances of Carbon notification component.
   */
  notifications: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  /**
   * Props to pass to the add to estimate button.
   */
  estimateButtonProps: PropTypes.shape({
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
  }),
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
   * Footnotes that need to be added to the component for the user to read before creating.
   */
  footnotes: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /**
   * A node to render submit the promo codes with.
   */
  submitPromoCode: PropTypes.node,
  /**
   * The terms text to render in the order summary footer.
   */
  termsText: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /**
   * The total cost of the provided order.
   */
  totalCost: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /**
   * Text appearing after the total cost. Can be used to indicate billing cycle (/month, /year)
   */
  totalCostSuffix: PropTypes.string,
  /**
   * Text to show on the total cost line.
   */
  totalCostText: PropTypes.string,
  /**
   * The content of the tooltip appearing next to the total cost text.
   */
  totalCostTooltipText: PropTypes.string,
  /**
   * Subtotal array to show discounts.
   */
  subTotalItems: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      label: PropTypes.node,
      value: PropTypes.string,
    })
  ),
};

OrderSummaryV2.defaultProps = {
  className: "",
  secondaryButtonText: "",
  estimateButtonLoading: false,
  secondaryButtonProps: {},
  secondaryButtonLoading: false,
  secondaryButtonLoadingText: "",
  estimateButtonProps: {},
  isFree: false,
  items: [],
  // locale: documentLanguage,
  loginLink: "",
  primaryButtonProps: {},
  primaryButtonText: "",
  primaryButtonLoading: false,
  primaryButtonLoadingText: "",
  termsText: "",
  totalCostText: "",
  totalCostTooltipText: "",
};

export default OrderSummaryV2;
