import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button, InlineLoading } from '@carbon/react';
import { ChevronUp as ChevronUp16 } from '@carbon/react/icons';
import {
  OrderSummaryV2Container,
  OrderSummaryV2Header,
  OrderSummaryV2Content,
  OrderSummaryV2Footer,
  OrderSummaryV2Items,
  OrderSummaryV2Details,
  OrderSummaryV2Totals,
  OrderSummaryV2Footnotes,
  OrderSummaryV2Terms,
  OrderSummaryV2FooterLinks,
} from '../../OrderSummaryV2';

const MiniOrderSummaryArrow = ({ className, ...props }) => (
  <ChevronUp16
    {...props}
    className={`pal--mini-order-summary__expand-arrow ${className}`}
  />
);

MiniOrderSummaryArrow.propTypes = {
  /**
   * A class name to provide to the order summary component.
   */
  className: PropTypes.string,
};

MiniOrderSummaryArrow.defaultProps = {
  className: '',
};

const MiniOrderSummaryV2 = ({
  expanded,
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
  locale,
  loginLink,
  notifications,
  subTotalItems,
  submitPromoCode,
  termsCheckbox,
  termsCheckboxInvalid,
  termsText,
  totalCost,
  totalCostText,
  onNotificationsClick,
  onExpandClick,
  collapseIconDescription,
  expandIconDescription,
}) => {
  // const translate = translationUtils.getTranslateFunction(
  //   translationStrings,
  //   getLocale(locale),
  // );

  const singleDetail = details ? [details] : [];
  const detailsArr = Array.isArray(details) ? details : singleDetail;
  const indentedItems = !!items.find(
    ({ quantity, items: nestedItems }) => quantity || nestedItems
  );

  const onEstimateClick = e => {
    if (
      typeof window !== 'undefined' &&
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

  const internalEstimateProps = {
    ...estimateButtonProps,
    onClick: onEstimateClick,
  };

  const expandHandler = () => onExpandClick(!expanded);

  const iconDescription = expanded
    ? collapseIconDescription || 'collapseSummary'
    : expandIconDescription || 'expandSummary';

  let summaryHeader;
  let summaryContent;
  let summarySubmitPromo;
  let summaryFootnotes;
  let summaryEstimateButton;
  let summaryLinks;
  const summaryNotifications =
    typeof onNotificationsClick === 'function' ? (
      <div
        aria-hidden="true"
        onClick={onNotificationsClick}
        className="pal--mini-order-summary__notifications">
        {notifications}
      </div>
    ) : (
      <div
        aria-hidden="true"
        className="pal--mini-order-summary__notifications">
        {notifications}
      </div>
    );
  if (expanded) {
    summaryHeader = (
      <OrderSummaryV2Header
        countrySwitcher={countrySwitcher}
        currencySwitcher={currencySwitcher}
        locale={locale}
      />
    );
    summaryContent = (
      <OrderSummaryV2Content>
        {detailsArr.map((detail, index) => (
          <OrderSummaryV2Details
            key={detail.key || detail.title}
            {...detail}
            isFree={isFree}
            locale={locale}
            estimateButtonProps={
              index === 0
                ? {
                    ...internalEstimateProps,
                  }
                : undefined
            }
          />
        ))}
        <OrderSummaryV2Items
          items={items}
          indented={!!indentedItems}
          locale={locale}
        />
        {summaryNotifications}
      </OrderSummaryV2Content>
    );
    summarySubmitPromo = submitPromoCode;
    summaryFootnotes = (
      <OrderSummaryV2Footnotes>{footnotes}</OrderSummaryV2Footnotes>
    );

    summaryEstimateButton = estimateButtonLoading ? (
      <div className="pal--order-summary-v2__inline-loading">
        <InlineLoading status="active" description={'loading'} />
      </div>
    ) : (
      <div className="pal--mini-order-summary__estimate">
        <Button {...internalEstimateProps} size="field" kind="tertiary">
          {'addToEstimate'}
        </Button>
      </div>
    );

    summaryLinks = (
      <OrderSummaryV2FooterLinks
        termsText={termsText}
        loginLink={loginLink}
        locale={locale}
      />
    );
  }

  return (
    <div
      className={classNames('pal--mini-order-summary', {
        'pal--mini-order-summary--expanded': expanded,
      })}>
      <OrderSummaryV2Container className={className}>
        {summaryHeader}
        {summaryContent}
        <OrderSummaryV2Footer
          noDivider={!expanded || !(details || items.length !== 0)}>
          {summarySubmitPromo}
          <OrderSummaryV2Totals
            subTotalItems={expanded ? subTotalItems : []}
            totalCost={totalCost}
            totalCostText={totalCostText}
            locale={locale}
          />
          {expanded ? null : summaryNotifications}
          {summaryFootnotes}
          {summaryEstimateButton}
          {summaryLinks}
          <OrderSummaryV2Terms>
            <div
              className={classNames('pal--mini-order-summary__terms', {
                'pal--mini-order-summary__terms--invalid': termsCheckboxInvalid,
              })}>
              {termsCheckbox}
            </div>
          </OrderSummaryV2Terms>
        </OrderSummaryV2Footer>
      </OrderSummaryV2Container>
      <Button
        className="pal--mini-order-summary__expand-button"
        size="small"
        kind="ghost"
        hasIconOnly
        onClick={expandHandler}
        renderIcon={MiniOrderSummaryArrow}
        iconDescription={iconDescription}
        tooltipPosition="top"
        tooltipAlignment="start"
      />
    </div>
  );
};

MiniOrderSummaryV2.propTypes = {
  /**
   * The locale to use for translation strings.
   */
  locale: PropTypes.string,

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
          value: PropTypes.string,
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
   * Text to show on the total cost line.
   */
  totalCostText: PropTypes.string,

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

  /**
   * If the mini order summary should display expanded or collapsed details
   */
  expanded: PropTypes.bool,

  /**
   * Handler to be called on expand button click
   */
  onExpandClick: PropTypes.func,

  /**
   * Handler to be called when notifications are clicked. Used by MiniOrderSummarySidePanel
   * to recalculate heights.
   */
  onNotificationsClick: PropTypes.func,

  /**
   * A flag to set the passed termsCheckbox as invalid
   */
  termsCheckboxInvalid: PropTypes.bool,

  /**
   * The description of the expand button when MiniOrderSummary is collapsed.
   */
  expandIconDescription: PropTypes.string,

  /**
   * The description of the expand button when MiniOrderSummary is expanded.
   */
  collapseIconDescription: PropTypes.string,
};

MiniOrderSummaryV2.defaultProps = {
  className: '',
  estimateButtonLoading: false,
  estimateButtonProps: {},
  isFree: false,
  items: [],
  // locale: documentLanguage,
  loginLink: '',
  termsText: '',
  totalCostText: '',
  // expandIconDescription: 'expand summary',
  // collapseIconDescription: 'collapse summary',
};

export default MiniOrderSummaryV2;
