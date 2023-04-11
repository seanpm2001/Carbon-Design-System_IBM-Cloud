import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Button } from "@carbon/react";

// Icons
import HIERARCHY from "./icons/Hierarchy";
import MONEY from "./icons/Money";
import USAGE from "./icons/Usage";

import IsometricIcon from "../IsometricIcon";

const iconMap = new Map([
  ["EMPTY", IsometricIcon],
  ["ERROR", IsometricIcon],
  ["HIERARCHY", HIERARCHY],
  ["MONEY", MONEY],
  ["NORESULTS", IsometricIcon],
  ["NOTIFICATION", IsometricIcon],
  ["TAG", IsometricIcon],
  ["UNAUTHORIZED", IsometricIcon],
  ["USAGE", USAGE],
]);

const getIcon = (iconNameOrElement, id, isLarge) => {
  const iconProps = {
    id,
    className: classnames("pal--message__icon", {
      "pal--message__icon--large": isLarge,
    }),
  };

  if (typeof iconNameOrElement === "string") {
    const Icon = iconMap.get(iconNameOrElement);

    return Icon && <Icon icon={iconNameOrElement} {...iconProps} />;
  }

  if (React.isValidElement(iconNameOrElement)) {
    return React.cloneElement(iconNameOrElement, iconProps);
  }

  return null;
};

const Message = ({
  id,
  icon: iconProp,
  text,
  caption,
  isTileWrapped,
  isLarge,
  fullPage,
  className,
  children,
  button,
}) => {
  const icon = getIcon(iconProp, id, isLarge);

  return (
    <div
      className={classnames(className, {
        "pal--message": true,
        "pal--message--tile": isTileWrapped,
        "pal--message--large": isLarge,
        "pal--message--full-page": fullPage,
      })}
    >
      {icon}
      <div className="pal--message__text-container">
        <div
          role={typeof text === "string" ? "heading" : null}
          className={classnames("pal--message__text", {
            "pal--message__text--large": isLarge,
          })}
          aria-level={typeof text === "string" ? "2" : null}
        >
          {text}
        </div>
        <div
          className={classnames("pal--message__caption", {
            "pal--message__caption--large": isLarge,
          })}
        >
          {caption}
        </div>
      </div>
      {button && (
        <div className="pal--message__button-container">
          <Button kind="tertiary" size="small" {...button}>
            {button.text}
          </Button>
        </div>
      )}
      {children && (
        <div className="pal--message__child-container">{children}</div>
      )}
    </div>
  );
};

Message.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.oneOf([
      "EMPTY",
      "ERROR",
      "HIERARCHY",
      "MONEY",
      "NORESULTS",
      "NOTIFICATION",
      "TAG",
      "UNAUTHORIZED",
      "USAGE",
    ]),
    PropTypes.node,
  ]),
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  caption: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  isLarge: PropTypes.bool,
  isTileWrapped: PropTypes.bool,
  fullPage: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.node,
  button: PropTypes.shape({
    text: PropTypes.string,
    role: PropTypes.string,
    href: PropTypes.string,
    onClick: PropTypes.func,
    classname: PropTypes.string,
    renderIcon: PropTypes.node,
    iconDescription: PropTypes.string,
  }),
};

Message.defaultProps = {
  icon: "EMPTY",
  isLarge: false,
  isTileWrapped: false,
  fullPage: false,
  className: "",
  button: undefined,
};

export default Message;
