import PropTypes from "prop-types";
import React, { useState } from "react";
import { FormGroup, Checkbox } from "@carbon/react";
import { useTranslation } from "react-i18next";
import TableSettingsOption from "./TableSettingsOption";

const TableSettingsColumns = React.forwardRef(
  (
    {
      headerOptions,
      initialCols,
      minCols,
      onChange: onChangeProp,
      handleMenuItemFocus,
      locale,
    },
    ref
  ) => {
    const { t } = useTranslation("EnhancedDataTable");

    const [selected, setSelected] = useState(initialCols);

    const onChange = (checked, id) => {
      const selectedSet = new Set(selected);
      if (checked) {
        selectedSet.add(id);
      } else {
        selectedSet.delete(id);
      }
      setSelected([...selectedSet]);
      onChangeProp([...selectedSet]);
    };

    return (
      <TableSettingsOption ref={ref}>
        <FormGroup legendText={t("settingsColumnsTitle")}>
          {headerOptions
            .filter((header) => header.header) // exclude columns without label
            .map((header) => {
              const checked = selected.includes(header.key);
              const disabled = selected.length === minCols && checked; // disable if this is the only selected option

              return (
                <Checkbox
                  key={header.key}
                  id={header.key}
                  labelText={header.header}
                  defaultChecked={checked}
                  disabled={disabled}
                  onChange={onChange}
                  onKeyDown={handleMenuItemFocus}
                  data-table-settings-item-focusable
                />
              );
            })}
        </FormGroup>
      </TableSettingsOption>
    );
  }
);

TableSettingsColumns.propTypes = {
  /**
   * Provide an array of header objects
   */
  headerOptions: PropTypes.arrayOf(PropTypes.object).isRequired,

  /**
   * Provide an optional array of initially selected columns
   */
  initialCols: PropTypes.arrayOf(PropTypes.string),

  /**
   * Provide an optional number of minimum selected columns
   */
  minCols: PropTypes.number,

  /**
   * Provide an optional hook that is called each time the selection is updated
   */
  onChange: PropTypes.func,

  /**
   * Provide an optional hook that is called each time a key is pressed
   */
  handleMenuItemFocus: PropTypes.func,

  /**
   * The locale used for translating the strings.
   */
  locale: PropTypes.string,
};

TableSettingsColumns.defaultProps = {
  initialCols: [],
  minCols: 1,
  onChange: () => {},
  handleMenuItemFocus: () => {},
  // locale: documentLanguage,
};

export default TableSettingsColumns;
