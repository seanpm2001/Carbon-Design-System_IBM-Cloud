import classnames from "classnames";
import PropTypes from "prop-types";
import React from "react";
import { Button, Link, SelectableTile, Tag } from "@carbon/react";
import FeaturedImage from "./children/FeaturedImage";
import HighlightText from "./children/HighlightText";
import { SoftwareResourceCluster } from "@carbon/react/icons";
import { useTranslation } from "react-i18next";

// Skeleton
import CatalogTileSkeleton from "./skeleton";

const windowObj =
  typeof window !== "undefined" ? window : { navigator: { language: "en" } };

const CatalogTile = ({
  consultingButtonLabel,
  createButtonLabel,
  description,
  featuredIcon,
  handleClick,
  href,
  icon,
  decorator,
  learnMoreHref,
  learnMoreLabel,
  learnMoreTitle,
  mode,
  offeringName,
  provider,
  providerName,
  selected,
  tag,
  headerTag,
  ...rest
}) => {
  const { t } = useTranslation("CatalogTile");

  const isSelectable = mode === "select";
  const isListMode = mode === "list";
  const isConsultingMode = mode === "consulting";
  const isHeaderTagAllowed = !isConsultingMode && headerTag;
  const isBaseMode = mode === "base";
  const isGridMode = !isListMode && !isConsultingMode;
  const tileUrl = (!isGridMode && learnMoreHref) || href;
  const className = classnames("pal--catalog-tile", {
    "pal--catalog-tile__list-view": isListMode,
    "pal--catalog-tile__consulting-view": isConsultingMode,
  });
  const props = {
    className,
    href: tileUrl,
    onClick: handleClick,
    ...rest,
  };

  // const defaultLocale = getLocale(windowObj.navigator.language);
  // const translate = translationUtils.getTranslateFunction(
  //   translationStrings,
  //   defaultLocale
  // );

  const decoratorNode = decorator ? (
    <span className="pal--catalog-tile__decorator">{decorator}</span>
  ) : null;
  const catalogTileHeaderClass = classnames("pal--catalog-tile__header", {
    "pal--catalog-tile__icon-with-label": isHeaderTagAllowed,
  });
  const tagClass = classnames("header-tag", {
    "header-tag-select": isSelectable,
  });
  const tagWithText = headerTag && (
    <Tag
      className={tagClass}
      type={headerTag.type || "blue"}
      size={headerTag.size || "md"}
    >
      <span className="pal--catalog-tile__fs-12-fw-400 header-tag__text">
        {headerTag.text}
      </span>
      {headerTag.icon || <SoftwareResourceCluster />}
    </Tag>
  );
  const tileName = (
    <div className={catalogTileHeaderClass}>
      <div>
        {Array.isArray(offeringName) ? (
          <HighlightText
            model={offeringName}
            customClass="pal--catalog-tile__header-name"
            decorator={decoratorNode}
          />
        ) : (
          <p className="pal--catalog-tile__header-name">
            {offeringName}
            {decoratorNode}
          </p>
        )}
        {!isConsultingMode && !providerName && provider.length > 0 && (
          <ul className="pal--catalog-tile__tag-container">
            {provider.map((providerTag) => {
              const key = Array.isArray(providerTag)
                ? providerTag.map((t) => t.text).join("")
                : providerTag;
              return Array.isArray(providerTag) ? (
                <li key={key}>
                  <HighlightText
                    model={providerTag}
                    customClass="pal--catalog-tile__tag"
                  />
                </li>
              ) : (
                <li key={key} className="pal--catalog-tile__tag">
                  {providerTag}
                </li>
              );
            })}
          </ul>
        )}
        {!isConsultingMode && providerName && (
          <ul className="pal--catalog-tile__tag-container">
            <li className="pal--catalog-tile__tag">
              {t("by", { name: providerName })}
            </li>
          </ul>
        )}
      </div>
      {isHeaderTagAllowed && isListMode && tagWithText}
    </div>
  );

  const descCustomClass = classnames("pal--catalog-tile__desc");

  const iconContainerClass = classnames("pal--catalog-tile__icon-container", {
    "pal--catalog-tile__icon-with-label": isHeaderTagAllowed && isGridMode,
    "pal--catalog-tile__icon-with-label-list":
      isHeaderTagAllowed && !isGridMode,
  });

  const iconNode = (
    <div className={iconContainerClass}>
      {icon}
      {isHeaderTagAllowed && !isListMode && !isConsultingMode && tagWithText}
    </div>
  );
  const descContainerClass = classnames("pal--catalog-tile__desc-container", {
    "w-90": isListMode,
  });
  const tileContent = (
    <div className="pal--catalog-tile__content-wrapper">
      <div className="pal--catalog-tile__header-container">
        {iconNode}
        {isGridMode && tileName}
      </div>
      <div className={descContainerClass}>
        {!isGridMode && tileName}
        {description && (
          <div className={descCustomClass}>
            <div className="pal--catalog-tile__desc-ellipsis">
              {Array.isArray(description) ? (
                <HighlightText
                  model={description}
                  customClass={descCustomClass}
                />
              ) : (
                <p className={descCustomClass}>{description}</p>
              )}
            </div>
          </div>
        )}
        {isConsultingMode ? (
          <div className="pal--catalog-tile__button-container">
            <Button kind="tertiary" href={href} onClick={handleClick}>
              {consultingButtonLabel}
            </Button>
          </div>
        ) : (
          tag.length > 0 && (
            <ul className="pal--catalog-tile__tag-container">
              {tag.map((theTag) => {
                const key = Array.isArray(theTag)
                  ? theTag.map((t) => t.text).join("")
                  : theTag;
                return (
                  <li key={key}>
                    {Array.isArray(theTag) ? (
                      <HighlightText
                        model={theTag}
                        customClass="pal--catalog-tile__tag"
                      />
                    ) : (
                      theTag
                    )}
                  </li>
                );
              })}
            </ul>
          )
        )}
      </div>
      {isListMode && (
        <div className="pal--catalog-tile__button-container">
          <Button kind="tertiary" href={href} onClick={handleClick}>
            {createButtonLabel}
          </Button>
          {learnMoreHref && (
            <Link
              href={learnMoreHref}
              title={learnMoreTitle}
              onClick={handleClick}
            >
              {learnMoreLabel}
            </Link>
          )}
        </div>
      )}
      {isConsultingMode && (
        <div className="pal--catalog-tile__featured-icon-container">
          {featuredIcon || <FeaturedImage />}
        </div>
      )}
    </div>
  );

  if (!isBaseMode) {
    if (isSelectable) {
      return (
        <SelectableTile
          className={className}
          value={href}
          selected={selected}
          onChange={handleClick}
        >
          {tileContent}
        </SelectableTile>
      );
    }

    if (isGridMode) {
      return <a {...props}>{tileContent}</a>;
    }
  }
  return <div {...props}>{tileContent}</div>;
};

CatalogTile.propTypes = {
  /**
   * Button label of the tile in Consulting mode
   */
  consultingButtonLabel: PropTypes.string,
  /**
   * Button label of the tile in List mode
   */
  createButtonLabel: PropTypes.string,
  /**
   * Icon element to decorate next to the `offeringName` in the tile
   */
  decorator: PropTypes.element,
  /**
   * Description of the offering. Limited to 3 lines
   */
  description: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        highlight: PropTypes.bool,
        text: PropTypes.string,
      })
    ),
    PropTypes.string,
  ]),
  /**
   * Link to where the tile redirects the user
   */
  href: PropTypes.string,
  /**
   * SVG JSX icon for the offering
   */
  icon: PropTypes.node,
  /**
   * SVG JSX featured icon for the offering
   */
  featuredIcon: PropTypes.node,
  /**
   * Deprecated - Use headerTag
   *
   * The label to show next to the icon in solution view.
   */
  label: PropTypes.string,
  /**
   * handleClick function
   */
  handleClick: PropTypes.func,
  /**
   * Link to where the Learn More button redirects the user
   */
  learnMoreHref: PropTypes.string,
  /**
   * Learn more button label of the tile in List mode
   */
  learnMoreLabel: PropTypes.string,
  /**
   * Learn more button title of the tile in List mode
   */
  learnMoreTitle: PropTypes.string,
  /**
   * The view mode of the tile. Can be base, grid, list or consulting
   */
  mode: PropTypes.oneOf(["consulting", "list", "select", "grid", "base"]),
  /**
   * Deprecated - Use headerTag
   *
   * The variant of the tile. Can be normal or solution.
   */
  variant: PropTypes.oneOf(["normal", "solution"]),
  /**
   * Name of the offering
   */
  offeringName: PropTypes.oneOfType([
    PropTypes.arrayOf(
      PropTypes.shape({
        highlight: PropTypes.bool,
        text: PropTypes.string,
      })
    ),
    PropTypes.string,
  ]),
  /**
   * Deprecated - Use providerName
   *
   * Provider of the offering
   */
  provider: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          highlight: PropTypes.bool,
          text: PropTypes.string,
        })
      ),
      PropTypes.string,
    ])
  ),
  /**
   * Provider Name of the offering
   */
  providerName: PropTypes.string,
  /**
   * The `selected` state of the tile in `radio` and `multiselect` mode
   */
  selected: PropTypes.bool,
  /**
   * Type of the offering
   */
  tag: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.arrayOf(
        PropTypes.shape({
          highlight: PropTypes.bool,
          text: PropTypes.string,
        })
      ),
      PropTypes.string,
    ])
  ),
  /**
   * Header tag options - pass as object to overwrite. Only visible with solution variant
   */
  headerTag: PropTypes.shape({
    text: PropTypes.string,
    icon: PropTypes.node,
    size: PropTypes.string,
    type: PropTypes.string,
  }),
};

CatalogTile.defaultProps = {
  consultingButtonLabel: "Schedule a consultation",
  createButtonLabel: "Create",
  handleClick: () => {},
  learnMoreLabel: "Learn more",
  mode: "grid",
  provider: [],
  tag: [],
};

CatalogTile.skeleton = CatalogTileSkeleton;

export default CatalogTile;
