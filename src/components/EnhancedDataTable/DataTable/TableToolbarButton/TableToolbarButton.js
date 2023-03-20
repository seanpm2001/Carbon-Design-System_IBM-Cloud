import PropTypes from "prop-types";
import React from "react";
import classNames from "classnames";
import {
  Filter as Filter16,
  Download as Download16,
  Renew as Renew16,
} from "@carbon/react/icons";
import { Button } from "@carbon/react";
import { useTranslation } from "react-i18next";

const TableToolbarButton = ({
  type,
  locale,
  disabled,
  toggleState,
  onClick,
  iconData,
  className,
  ...others
}) => {
  const { t } = useTranslation("EnhancedDataTable");

  const metadata = {
    filter: {
      css: classNames("cds--table-toolbar-filter-button", {
        "panel-open": toggleState,
      }),
      description: "filtersLabel",
      icon: Filter16,
    },
    download: {
      description: "download",
      icon: Download16,
    },
    refresh: {
      description: "refresh",
      icon: Renew16,
    },
    ...iconData,
  };

  if (metadata[type]) {
    const { css, description, icon } = metadata[type];
    return (
      <Button
        iconDescription={description && t(description)}
        title={description && t(description)}
        kind="ghost"
        size="field"
        className={classNames("cds--table-toolbar-button", css, className)}
        tabIndex={0}
        disabled={disabled}
        tooltipAlignment="center"
        tooltipPosition="top"
        type="button"
        hasIconOnly
        renderIcon={icon}
        onClick={onClick}
        {...others}
      />
    );
  }
  return null;
};

const createIconDataPropType = () => {
  return (props, propName, componentName) => {
    const prop = props[propName]; // eslint-disable-line react/destructuring-assignment

    if (
      Object.keys(prop).some((key) => !prop[key].icon || !prop[key].description)
    ) {
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}. Each item in ${propName} must have both icon and description.`
      );
    }

    return null;
  };
};

const iconDataPropType = createIconDataPropType();

TableToolbarButton.propTypes = {
  /**
   * Provide type to use built-in button types, e.g. `filter`
   */
  type: PropTypes.string.isRequired,

  /**
   * A custom class name to be applied to the order summary total element.
   */
  className: PropTypes.string,

  /**
   * Provide custom icon data if button is not a built-in type
   * Refer to `filter` built-in type for expected format
   */
  iconData: iconDataPropType,

  /**
   * Provide a flag to specify if button is disabled
   */
  disabled: PropTypes.bool,

  /**
   * Provide a onClick handler
   */
  onClick: PropTypes.func.isRequired,

  /**
   * Provide a toggle state if button is a toggle and toggle state is needed
   * e.g. `filter` built-in type uses toggleState to differentiate filter panel open/close state
   */
  toggleState: PropTypes.bool,

  /**
   * The locale used for translating the strings.
   */
  locale: PropTypes.string,
};

TableToolbarButton.defaultProps = {
  className: undefined,
  disabled: false,
  toggleState: null,
  iconData: {},
  // locale: documentLanguage,
};

export default TableToolbarButton;
