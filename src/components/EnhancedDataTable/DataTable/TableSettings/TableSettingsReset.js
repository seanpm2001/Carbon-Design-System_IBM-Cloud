import PropTypes from "prop-types";
import React from "react";
import { Restart as Restart16 } from "@carbon/react/icons";
import { Button } from "@carbon/react";

// Translations
// import translations from '../translations';
// import getLocale, { documentLanguage } from '../../../utils/getLocale';
// import translationUtils from '../../../utils/translate';

const TableSettingsReset = React.forwardRef(
  (
    {
      defaultSettings,
      handleMenuItemFocus,
      onClick: onClickProp,
      closeMenu,
      locale,
    },
    ref
  ) => {
    // const defaultLocale = getLocale(locale);
    const translate = (str) => str;

    const onClick = () => {
      onClickProp(defaultSettings);
      closeMenu();
    };

    return (
      <Button
        ref={ref}
        data-table-settings-item-focusable
        renderIcon={Restart16}
        iconDescription={translate("settingsReset")}
        disabled={false}
        onClick={onClick}
        onKeyDown={handleMenuItemFocus}
      >
        {translate("settingsReset")}
      </Button>
    );
  }
);

const createDefaultSettingsPropType = () => {
  return (props, propName, componentName) => {
    const prop = props[propName]; // eslint-disable-line react/destructuring-assignment

    if (prop) {
      if (prop.defaultSize || prop.defaultCols) {
        return null;
      }
      return new Error(
        `Invalid prop ${propName} supplied to ${componentName}.  It must contain at least one of: defaultSize, defaultCols`
      );
    }

    return new Error(`Required prop ${propName} is missing.`);
  };
};

const defaultSettingsPropType = {};
defaultSettingsPropType.isRequired = createDefaultSettingsPropType();

TableSettingsReset.propTypes = {
  /**
   * Provide default settings to reset to
   */
  defaultSettings: defaultSettingsPropType.isRequired,

  /**
   * Provide an optional hook that is called each time the selection is updated
   */
  onClick: PropTypes.func,

  /**
   * Provide an optional hook to close menu that is called each time the reset button is clicked
   */
  closeMenu: PropTypes.func,

  /**
   * Provide an optional hook that is called each time a key is pressed
   */
  handleMenuItemFocus: PropTypes.func,

  /**
   * The locale used for translating the strings.
   */
  locale: PropTypes.string,
};

TableSettingsReset.defaultProps = {
  onClick: () => {},
  closeMenu: () => {},
  handleMenuItemFocus: () => {},
  // locale: documentLanguage,
};

export default TableSettingsReset;
