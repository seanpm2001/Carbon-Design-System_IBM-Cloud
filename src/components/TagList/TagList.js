// terrible component... needs rewriting

/* eslint-disable no-debugger */
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { Tooltip } from "@carbon/react";
import { Edit as Edit16 } from "@carbon/react/icons";
import Tag from "../Tag";
import { useTranslation } from "react-i18next";

const TagList = ({
  /* Declare any props that this pattern can use */
  // locale,
  numTagsDisplayed,
  tags,
  className,
  iconDescription,
  showAddLabelText,
  isEditable,
  onIconClick,
  counterTagClassName,
  maxCharacters,
  maxCharactersTooltip,
  maxTagsTooltip,
  wrap,
  ...rest
}) => {
  const { t } = useTranslation("TagList");

  const overflowNode = () => {
    const counterTagClassNames = classNames(
      "pal--tag-list--tag-counter",
      counterTagClassName
    );
    const tooltipTagClassName = "pal--tag-list--tag-tooltip";

    const overflowCount = tags.length - numTagsDisplayed;

    let overflowCountNode = null;

    if (numTagsDisplayed > 0 && numTagsDisplayed < tags.length) {
      overflowCountNode = (
        <Tag type="functional" className={counterTagClassNames}>
          {`+${overflowCount}`}
        </Tag>
      );
    }

    if (numTagsDisplayed === 0) {
      overflowCountNode = (
        <Tag type="functional" className={counterTagClassNames}>
          {String(tags.length)}
        </Tag>
      );
    }

    if (overflowCountNode !== null) {
      const overflowTags = tags.slice(
        numTagsDisplayed,
        numTagsDisplayed + maxTagsTooltip
      );
      const overflowTagsNode = overflowTags.map((tag) => {
        const { name } = tag;
        const tagValue =
          name.length > maxCharactersTooltip
            ? `${name.substring(0, maxCharactersTooltip).trim()}...`
            : name;
        return (
          <div key={name} title={name} className={tooltipTagClassName}>
            {tagValue}
            {tag.isAccessTag ? ` (${t("accessTagPrefix")})` : null}
          </div>
        );
      });
      const totalTagsDisplayed = Math.min(
        maxTagsTooltip + numTagsDisplayed,
        tags.length
      );
      const tooltipOverflowCount = tags.length - totalTagsDisplayed;
      overflowCountNode = (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        <Tooltip
          triggerClassName="pal--cell--tooltip"
          showIcon={false}
          triggerText={overflowCountNode}
        >
          {overflowTagsNode}
          {tooltipOverflowCount === 0 ? undefined : (
            <div
              title={`${tooltipOverflowCount} ${t("more")} ${
                tooltipOverflowCount === 1 ? t("tag") : t("tags")
              }`}
            >
              {`(+${tooltipOverflowCount})`}
            </div>
          )}
        </Tooltip>
      );
    }

    return overflowCountNode;
  };
  const limit = numTagsDisplayed > tags.length ? tags.length : numTagsDisplayed;

  const displayList = tags.slice(0, limit);

  const tagListClassNames = classNames(
    {
      "pal--tag-list": true,
      "pal--tag-list--wrap": wrap,
      "pal--tag-list-editable": isEditable !== "never",
      "pal--tag-list--is-empty": !tags.length && showAddLabelText,
    },
    className
  );

  const editButtonClasses = classNames({
    "pal--tag-list--edit--button": true,
    "always-editable": isEditable === "always",
    "never-editable": isEditable === "never",
  });

  const iconText = tags.length
    ? iconDescription || t("editIconInformation")
    : t("addIconInformation");

  return (
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div className={tagListClassNames} {...rest}>
      {displayList.map((tag) => (
        <Tag
          key={tag.name}
          className="pal--tag-list--tag"
          type={tag.type || "functional"}
          title={
            tag.isAccessTag ? `${t("accessTagPrefix")} | ${tag.name}` : tag.name
          }
          onClick={onIconClick}
          maxCharacters={maxCharacters}
          {...tag.otherProps}
        >
          {tag.isAccessTag ? `${t("accessTagPrefix")} | ` : null}
          {tag.name}
        </Tag>
      ))}
      {overflowNode()}
      {
        <button
          className={editButtonClasses}
          tabIndex={onIconClick ? 0 : -1}
          type="button"
          onClick={onIconClick}
          title={
            !tags.length && showAddLabelText ? "" : iconDescription || iconText
          }
          aria-label={
            !tags.length && showAddLabelText ? "" : iconDescription || iconText
          }
        >
          {showAddLabelText && displayList.length === 0 ? (
            <span className="pal--tag-list--label-empty">{iconText}</span>
          ) : null}
          <Edit16 className="pal--tag-list--edit--icon" />
        </button>
      }
    </div>
  );
};

TagList.propTypes = {
  /**
   * The locale to render the translated strings in (e.g. 'en').
   */
  // locale: PropTypes.string,
  /**
   * The number of tags that should be displayed in the list.
   */
  numTagsDisplayed: PropTypes.number,
  /**
   * An array of objects representing tags.
   */
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.string,
      isAccessTag: PropTypes.bool,
      otherProps: PropTypes.objectOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.bool,
          PropTypes.node,
          PropTypes.func,
        ]).isRequired
      ),
    })
  ).isRequired,
  /**
   * Any class names that should be applied to the tag list component.
   */
  className: PropTypes.string,
  /**
   * The description to provide to the edit tags icon. Used for a11y purposes.
   */
  iconDescription: PropTypes.string,
  /**
   * By default, an empy TagList displays nothing. If this prop is set, an icon and label will be visible
   * when there are no tags in the list.
   */
  showAddLabelText: PropTypes.bool,
  /**
   * Whether or not the tag list is editable.
   */
  isEditable: PropTypes.oneOf(["always", "never", "on-hover"]),
  /**
   * An event to fire off upon clicking the edit icon.
   */
  onIconClick: PropTypes.func,
  /**
   * A class name to provided to the element the renders the number of additional tags not seen in the initial list.
   */
  counterTagClassName: PropTypes.string,
  /**
   * The maximum number of characters to display for each tag.
   */
  maxCharacters: PropTypes.number,
  /**
   * The maximum number of characters to display in the tool tip for each tag.
   */
  maxCharactersTooltip: PropTypes.number,
  /**
   * The maximum number of tags to display in the tool tip.
   */
  maxTagsTooltip: PropTypes.number,
  /**
   * Whether the tags in the list should wrap when they reach the end of their container.
   */
  wrap: PropTypes.bool,
};

TagList.defaultProps = {
  // locale: documentLanguage,
  className: "",
  numTagsDisplayed: 3,
  showAddLabelText: false,
  isEditable: "never",
  onIconClick: undefined,
  counterTagClassName: "",
  maxCharacters: 0,
  maxCharactersTooltip: 15,
  maxTagsTooltip: 8,
  wrap: false,
};

export default TagList;
