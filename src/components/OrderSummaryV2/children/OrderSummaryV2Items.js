import React from "react";
import propTypes from "prop-types";
import classnames from "classnames";
import { Accordion, AccordionItem } from "@carbon/react";
import separateByProp from "../utils/separateByProp";
import OrderSummaryItemText from "./OrderSummaryV2ItemText";
import { useTranslation } from "react-i18next";

const OrderSummaryItem = ({
  accordionText,
  name,
  value,
  quantity,
  details,
  items,
  indented,
}) => {
  const { t } = useTranslation("OrderSummaryV2");

  const [hiddenDetails, visibleDetails] = separateByProp(
    details,
    "isHidden",
    true
  );

  return (
    <li
      className={classnames(
        "pal--order-summary-v2__row",
        "pal--order-summary-v2__accordion",
        {
          "pal--order-summary-v2__row--nest": items,
        }
      )}
    >
      <OrderSummaryItemText postfix="name">
        <OrderSummaryItemText
          postfix="quantity"
          renderText={typeof quantity === "number" || !!quantity}
        >
          {quantity}
        </OrderSummaryItemText>
        {name}
      </OrderSummaryItemText>
      <OrderSummaryItemText postfix="value">{value}</OrderSummaryItemText>
      {visibleDetails.length > 0 ? (
        <OrderSummaryItems
          items={visibleDetails}
          type="details-list"
          leftPad={hiddenDetails.length > 0 || indented}
        />
      ) : null}
      {hiddenDetails.length > 0 ? (
        <Accordion align="end">
          <AccordionItem title={accordionText || t("showMore")}>
            <OrderSummaryItems items={hiddenDetails} type="details-list" />
          </AccordionItem>
        </Accordion>
      ) : null}
      {items ? <OrderSummaryItems items={items} /> : null}
    </li>
  );
};

const OrderSummaryItems = ({ items, indented, type }) => {
  const { t } = useTranslation("OrderSummaryV2");

  return items.length > 0 ? (
    <ul
      className={classnames(`pal--order-summary-v2__${type}`, {
        "pal--order-summary-v2__list--left-pad": indented,
      })}
      tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
    >
      {items.map(({ id, key, name, accordionText, ...props }) => (
        <OrderSummaryItem
          {...props}
          name={name}
          id={id}
          key={key || id || name} // TODO: remove name to reduce possible duplicates (e.g. when name is undefined)
          accordionText={accordionText}
        />
      ))}
    </ul>
  ) : null;
};

const detailsProps = {
  name: propTypes.string,
  value: propTypes.string,
  isHidden: propTypes.bool,
};

const itemProps = {
  id: propTypes.string,
  name: propTypes.string,
  value: propTypes.node,
  quantity: propTypes.oneOfType([propTypes.string, propTypes.number]),
  details: propTypes.arrayOf(propTypes.shape(detailsProps)),
};

const itemsProps = propTypes.arrayOf(
  propTypes.shape({
    ...itemProps,
    items: propTypes.arrayOf(propTypes.shape(itemProps)),
  })
);

OrderSummaryItem.defaultProps = {
  accordionText: "",
  indented: false,
};

OrderSummaryItem.propTypes = {
  /**
   * The text to place in the accordion.
   */
  accordionText: propTypes.string,
  /**
   * An array of nested items. Uses the same props as it's parent item.
   */
  items: itemsProps,
  /**
   * The name of the order summary item. Renders in the left hand column.
   */
  name: propTypes.string.isRequired,
  /**
   * The quantity of the order summary item.
   */
  quantity: propTypes.oneOfType([propTypes.string, propTypes.number]),
  /**
   * The value of the order summary item. Renders in the right hand column.
   */
  value: propTypes.node,
  /**
   * A list of details to render. If a detail includes an isHidden prop it will create an accordion below.
   */
  details: propTypes.arrayOf(propTypes.shape(detailsProps)),
  /**
   * Whether or not to add left hand side padding to order summary details.
   */
  indented: propTypes.bool,
  /**
   * Translation function that can be provided to an order summary item.
   */
  // translate: propTypes.func.isRequired,
};

OrderSummaryItems.defaultProps = {
  items: undefined,
  indented: false,
  type: "list",
};

OrderSummaryItems.propTypes = {
  /**
   * Whether to add left hand padding to the order summary list.
   */
  indented: propTypes.bool,
  /**
   * A set of items to render in the order summary list.
   */
  items: itemsProps,
  /**
   * The locale to use for translation strings.
   */
  // locale: propTypes.string,
  /**
   * The type of list to render. Appends a class on to the order summary.
   */
  type: propTypes.string,
};

export default OrderSummaryItems;
