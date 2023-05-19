import React, { Children } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useTranslation } from "react-i18next";
// Carbon Components
import { OverflowMenu } from "@carbon/react";
import { ChevronDown as ChevronDown16 } from "@carbon/react/icons";

/**
 * Renders the title for actions panel.
 * @param {string} text The language the user's browser is configured to use.
 */
const renderPanelButtonText = (text) => (
  <span className="pal--actions-panel__content">
    {text}
    <ChevronDown16 className="pal--actions-panel-icon" />
  </span>
);

/**
 * A wrapper around carbon's overflow used to render the actions panel menu.
 */
const ActionsPanel = ({
  children,
  className,
  id,
  selectorPrimaryFocus,
  ...rest
}) => {
  const { t } = useTranslation("PageHeader");
  return (
    <div
      className={classNames("pal--actions-panel-wrap", className)}
      data-floating-menu-container
      id={id}
    >
      <OverflowMenu
        className="pal--actions-panel"
        renderIcon={() => renderPanelButtonText(t("actionsButton"))}
        direction="bottom"
        flipped
        selectorPrimaryFocus={selectorPrimaryFocus}
        ariaLabel={t("actionsButton")}
        menuOptionsClass={classNames("pal--actions-panel-menu")}
        {...rest}
      >
        {Children.toArray(children).filter((child) => {
          if (child.props.visibleBreakpoint === "small") {
            return null;
          }
          return child;
        })}
      </OverflowMenu>
      <div className="pal--actions-panel-sm">
        <OverflowMenu
          direction="bottom"
          flipped
          selectorPrimaryFocus={selectorPrimaryFocus}
          ariaLabel={t("actionsButton")}
          menuOptionsClass={classNames("pal--actions-panel-menu")}
          iconDescription={`${t("actionsButton")} icon`}
          {...rest}
        >
          {children}
        </OverflowMenu>
      </div>
    </div>
  );
};

ActionsPanel.propTypes = {
  /**
   * The locale used for translating the strings.
   */
  // locale: PropTypes.string,
  /**
   * A set of OverflowMenuItem components to be passed into Carbon's Overflow Menu component.
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
  /**
   * A custom class name to be applied to the actions panel.
   */
  className: PropTypes.string,
  /**
   * An optional id
   */
  id: PropTypes.string,
  /**
   * Specify a CSS selector that matches the DOM element that should be focused on when OverflowMenu opens
   */
  selectorPrimaryFocus: PropTypes.string,
};

ActionsPanel.defaultProps = {
  children: undefined,
  className: undefined,
  // locale: documentLanguage,
};

ActionsPanel.displayName = "ActionsPanel";

export default ActionsPanel;
