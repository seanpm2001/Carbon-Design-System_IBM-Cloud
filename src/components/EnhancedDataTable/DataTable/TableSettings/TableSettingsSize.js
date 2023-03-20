import PropTypes from "prop-types";
import React, { useState, forwardRef } from "react";
import { RadioButtonGroup, RadioButton } from "@carbon/react";
import TableSettingsOption from "./TableSettingsOption";
import { useTranslation } from "react-i18next";

const TableSettingsSize = forwardRef(
  (
    { size, sizeOptions, handleMenuItemFocus, onChange: onChangeProp, locale },
    ref
  ) => {
    const { t } = useTranslation("EnhancedDataTable");
    const [selected, setSelected] = useState(size);

    const onChange = (id) => {
      setSelected(id);
      onChangeProp(id);
    };

    return (
      <TableSettingsOption ref={ref}>
        <RadioButtonGroup
          labelPosition="right"
          name="row-height-radio-button-group"
          legendText={t("settingsSizeTitle")}
          onChange={onChange}
          orientation="vertical"
          valueSelected={selected}
        >
          {sizeOptions.map((option) => (
            <RadioButton
              key={option}
              id={option}
              labelText={t(`settingsSize.${option}`)}
              value={option}
              onKeyDown={handleMenuItemFocus}
              data-table-settings-item-focusable
            />
          ))}
        </RadioButtonGroup>
      </TableSettingsOption>
    );
  }
);

TableSettingsSize.propTypes = {
  /**
   * Provide initially selected size
   */
  size: PropTypes.string.isRequired,

  /**
   * Provide an array of size options
   */
  sizeOptions: PropTypes.arrayOf(
    PropTypes.oneOf(["compact", "short", "normal", "tall"])
  ).isRequired,

  /**
   * Provide an optional hook that is called each time a key is pressed
   */
  handleMenuItemFocus: PropTypes.func,

  /**
   * Provide an optional hook that is called each time the selection is updated
   */
  onChange: PropTypes.func,

  /**
   * The locale used for translating the strings.
   */
  locale: PropTypes.string,
};

TableSettingsSize.defaultProps = {
  handleMenuItemFocus: () => {},
  onChange: () => {},
  // locale: documentLanguage,
};

export default TableSettingsSize;
