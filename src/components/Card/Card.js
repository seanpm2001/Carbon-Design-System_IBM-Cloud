import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";

// Card Components
import CardHeader from "./children/CardHeader";
import CardBody from "./children/CardBody";
import CardImage from "./children/CardImage";
import CardLabeledRows from "./children/CardLabeledRows";
import CardStackedLabeledRows from "./children/CardStackedLabeledRows";
import CardLabeledItem from "./children/CardLabeledItem";

const Card = ({ children, className, callOut, fadeIn, ...rest }) => (
  <div
    {...rest}
    className={cx(
      {
        "pal--card": true,
        "pal--card--call-out": callOut,
        "pal--card--fade-in": fadeIn,
      },
      className
    )}
  >
    {children}
  </div>
);

Card.propTypes = {
  /**
   * Whether or not the card should be called out. If this value is true the card will render with a gray 90 background and white.
   */
  callOut: PropTypes.bool,
  /**
   * Whether or not the card should animate in on render. If true, the card will vertically tranform and change opacity on render.
   */
  fadeIn: PropTypes.bool,
  /**
   * Any component's, elements, or strings to be rendered inside of the card component.
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  /**
   * A class name that will be applied to the card component.
   */
  className: PropTypes.string,
};

Card.defaultProps = {
  callOut: false,
  className: "",
  fadeIn: false,
};

// TODO: Remove when bumping to V2.
Card.header = CardHeader;
Card.body = CardBody;
Card.image = CardImage;
Card.labeledRows = CardLabeledRows;
Card.stackedLabeledRows = CardStackedLabeledRows;
Card.labeledItem = CardLabeledItem;

Card.Header = CardHeader;
Card.Body = CardBody;

export default Card;
