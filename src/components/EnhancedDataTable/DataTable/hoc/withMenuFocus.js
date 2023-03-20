import React, { useState, useEffect } from "react";
import { match, ArrowDown, ArrowUp } from "../../../../utils/keyboard";

// import translations from '../translations';
// import getLocale from '../../../utils/getLocale';
// import translationUtils from '../../../utils/translate';

/* eslint-disable react/prop-types */

/*
 * Higer Order Component that wraps TableToolbarMenu,
 * returning a new component with keyboard navigation menu focus support
 * Note: For menu focus to work, each item to receive focus must include the "data-table-settings-item-focusable" attribute
 *       Refer to TableSettings/TableSettingsColumns and TableSettings/TableSettingsSize for examples.
 */
const withMenuFocus = (WrappedToolbarMenu) => {
  return ({ children, locale, ...props }) => {
    const [focused, setFocus] = useState(0);

    const updateMenuFocus = () => {
      const nodes = [
        ...document.querySelectorAll("[data-table-settings-item-focusable]"),
      ];
      if (nodes && focused >= 0 && nodes[focused]) {
        nodes[focused].focus();
      }
    };

    useEffect(() => {
      updateMenuFocus();
    });

    const handleMenuItemFocus = (evt) => {
      const nodes = [
        ...document.querySelectorAll("[data-table-settings-item-focusable]"),
      ];
      const len = nodes.length;
      if (len > 0 && match(evt, ArrowDown)) {
        setFocus((focused + 1) % len);
      } else if (len > 0 && match(evt, ArrowUp)) {
        setFocus((focused - 1 + len) % len);
      }
    };

    const childrenWithProps = React.Children.toArray(children).map((child) =>
      React.cloneElement(child, {
        handleMenuItemFocus,
      })
    );

    // const defaultLocale = getLocale(locale);
    const translate = (str) => str;

    return (
      <WrappedToolbarMenu
        {...props}
        onOpen={updateMenuFocus}
        menuOptionsClass="cds--table-settings-menu__body"
        iconDescription={translate("settingsLabel")}
      >
        {childrenWithProps}
      </WrappedToolbarMenu>
    );
  };
};

export default withMenuFocus;
