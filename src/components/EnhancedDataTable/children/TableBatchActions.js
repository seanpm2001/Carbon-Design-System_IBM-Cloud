import cx from "classnames";
import PropTypes from "prop-types";
import React from "react";
import {
  Button,
  TableActionList,
  TableBatchActions as UpstreamComponent,
} from "@carbon/react";

const prefix = "cds";

const TableBatchActions = ({
  className,
  children,
  shouldShowBatchActions,
  totalSelected,
  totalRowCount,
  onCancel,
  onSelectAll,
  hideSelectAll,
  translateWithId: t,
  ...rest
}) => {
  const batchActionsClasses = cx(
    {
      [`${prefix}--batch-actions`]: true,
      [`${prefix}--batch-actions--active`]: shouldShowBatchActions,
    },
    className
  );
  const hasSelectAllButton =
    !hideSelectAll && onSelectAll && totalRowCount > totalSelected;

  return (
    <div
      {...rest}
      className={batchActionsClasses}
      aria-hidden={!shouldShowBatchActions}
    >
      <div className={`cds--batch-summary`}>
        <p className={`cds--batch-summary__para`}>
          <span>
            {totalSelected > 1
              ? t("carbon.table.batch.items.selected", { totalSelected })
              : t("carbon.table.batch.item.selected", { totalSelected })}
          </span>
        </p>
        {hasSelectAllButton && (
          <Button
            className={`cds--batch-summary__cancel`}
            tabIndex={shouldShowBatchActions ? 0 : -1}
            onClick={onSelectAll}
          >
            {t("selectAllRows", { totalRowCount })}
          </Button>
        )}
      </div>
      <TableActionList>
        {children}
        <Button
          className={`cds--batch-summary__cancel`}
          tabIndex={shouldShowBatchActions ? 0 : -1}
          onClick={onCancel}
        >
          {t("carbon.table.batch.cancel")}
        </Button>
      </TableActionList>
    </div>
  );
};

TableBatchActions.propTypes = {
  onSelectAll: PropTypes.func,
  totalRowCount: PropTypes.number,
  ...UpstreamComponent.propTypes,
  hideSelectAll: PropTypes.bool,
};

TableBatchActions.defaultProps = {
  onSelectAll: undefined,
  totalRowCount: 0,
  ...UpstreamComponent.defaultProps,
  hideSelectAll: false,
};

export default TableBatchActions;
