import React, { useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { Tag as CarbonTag } from "@carbon/react";
import { useTranslation } from "react-i18next";

const TYPES = {
  functional: "Functional",
  red: "Red",
  magenta: "Magenta",
  purple: "Purple",
  blue: "Blue",
  cyan: "Cyan",
  teal: "Teal",
  green: "Green",
  gray: "Gray",
  "cool-gray": "Cool-Gray",
  "warm-gray": "Warm-Gray",
};

const Tag = ({
  // locale,
  children,
  className,
  type,
  isRemovable,
  maxCharacters,
  onRemove,
  onClick,
  title,
  ...other
}) => {
  const { t } = useTranslation("Tag");

  const [removed, setRemoved] = useState(false);
  const tagClasses = classNames("pal--tag", {
    "pal--tag__removed": removed,
    "pal--tag--removable": !!onRemove,
    "pal--tag--clickable": onClick && !isRemovable,
    [className]: className,
  });
  let tagContentsClass = "";

  const carbonType = type === "functional" ? "blue" : type;

  const getInnerTextLength = (child) => {
    if (child === null) {
      return 0;
    }
    if (typeof child === "string") {
      return child.length;
    }
    return child.props && child.props.children
      ? getInnerTextLength(child.props.children)
      : 0;
  };

  if (maxCharacters) {
    let childrenTextLength = 0;
    if (typeof children === "string") {
      childrenTextLength = getInnerTextLength(children);
    } else {
      children.forEach((child) => {
        childrenTextLength += getInnerTextLength(child);
      });
    }
    tagContentsClass =
      childrenTextLength > maxCharacters ? "pal--tag-truncate" : "";
  }

  const detachDescription = `${t("detachDescription")} ${children}`;

  const onClose = () => {
    setRemoved(true);

    if (onRemove) {
      onRemove(children);
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") onClick(event);
  };

  let tagProps = {
    className: tagClasses,
    type: carbonType,
    tabIndex: -1,
    filter: isRemovable,
    onClick,
    onClose,
  };

  if (onClick) {
    tagProps = {
      ...tagProps,
      role: "button",
      tabIndex: 0,
      onKeyDown: (event) => handleKeyDown(event),
    };
  }
  const detachTitle = isRemovable ? detachDescription : null;
  const truncateTag = tagContentsClass === "pal--tag-truncate";

  // Use maxCharacter value for ch width unit. This is not 100% accurate but should be sufficient as ch is the width of the glyph "0" in the element font
  const inlineWidth = truncateTag ? { maxWidth: `${maxCharacters}ch` } : {};
  const tagTooltip = typeof children === "string" ? children : title;

  return (
    <CarbonTag
      {...tagProps}
      aria-label={detachTitle}
      {...other}
      title={detachTitle}
    >
      <span
        title={tagTooltip || null}
        style={truncateTag ? inlineWidth : null}
        className={truncateTag ? tagContentsClass : null}
      >
        {children}
      </span>
    </CarbonTag>
  );
};

Tag.propTypes = {
  /**
   * The locale to get translation strings with (e.g. 'en').
   */
  // locale: PropTypes.string, // If using translated strings include the locale prop
  /**
   * The content to render in the tag.
   */
  children: PropTypes.node,
  /**
   * Any class names to be applied to carbon tag component.
   */
  className: PropTypes.string,
  /*
   * The color or the type of tag to render.
   */
  type: PropTypes.oneOf(Object.keys(TYPES)),
  /**
   * Whether or not the tag is removable or not.
   */
  isRemovable: PropTypes.bool,
  /**
   * The function to fire of upon removing the tag.
   */
  onRemove: PropTypes.func,
  /**
   * The function to fire off when click the tag.
   */
  onClick: PropTypes.func,
  /**
   * The maximum number of characters a tag can render. This is an approximation as it is applied using ch units.
   */
  maxCharacters: PropTypes.number,
  /**
   * The text to display as the tag tooltip, only used if typeof children !== 'string'.
   */
  title: PropTypes.string,
};

Tag.defaultProps = {
  // locale: documentLanguage,
  children: "",
  className: "",
  type: "functional",
  isRemovable: false,
  onRemove: undefined,
  onClick: undefined,
  maxCharacters: 0,
};

// components should export a skeleton
Tag.skeleton = CarbonTag.Skeleton;

export default Tag;
