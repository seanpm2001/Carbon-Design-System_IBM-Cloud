import React, { useEffect, useState } from 'react';
import { TABLE_SORT_DIRECTION } from '../misc/constants';
import { useCollator } from './useCollator';

const collationFactors = {
  [TABLE_SORT_DIRECTION.ASCENDING]: 1,
  [TABLE_SORT_DIRECTION.DESCENDING]: -1,
};

/**
 * @param {object[]} rows The table rows.
 * @param {object} sortInfo The table sort info.
 * @param {Intl.Collator} collator The g11n collator.
 * @returns {Array} The sorted table rows.
 */
export const useSortedRows = (
  rows,
  sortInfo = { header: undefined, direction: undefined },
  collator
) => {
  const [sortedRows, setSortedRows] = useState(rows);
  const compare = useCollator(collator);

  useEffect(() => {
    if (rows) {
      const { header: sortColumnId, direction: sortDirection } = sortInfo;
      const comparedRows =
        !sortDirection || sortDirection === TABLE_SORT_DIRECTION.NONE
          ? rows
          : rows
              .slice()
              .sort(
                (lhs, rhs) =>
                  collationFactors[sortDirection] *
                  compare(lhs[sortColumnId], rhs[sortColumnId])
              );

      setSortedRows(comparedRows);
    } else setSortedRows(null);
  }, [compare, rows, sortInfo]);
  return [sortedRows];
};
