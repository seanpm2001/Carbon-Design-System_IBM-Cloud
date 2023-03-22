import { useState, useCallback } from 'react';
import { TABLE_SORT_CYCLE, TABLE_SORT_CYCLES } from '../misc/constants';

const getNextSort = ({
  sortCycle = TABLE_SORT_CYCLE.FROM_ASCENDING,
  oldDirection,
}) => {
  const directions = TABLE_SORT_CYCLES[sortCycle];
  const index = directions.indexOf(oldDirection);
  return directions[(index + 1) % directions.length];
};

/**
 * @param {object} initialSortInfo The initial table sort info.
 * @returns {Array} The current table sort info and the setter for the table
 * sort info.
 */

export const useSortInfo = initialSortInfo => {
  const [sortInfo, setSortInfo] = useState(initialSortInfo);
  const invokeSetSortInfo = useCallback(
    ({ header, sortCycle, oldDirection }) => {
      const direction = getNextSort({ sortCycle, oldDirection });
      // Sets the sorting as user desires
      setSortInfo({
        header,
        direction,
      });
    },
    [setSortInfo]
  );
  return [sortInfo, invokeSetSortInfo];
};
