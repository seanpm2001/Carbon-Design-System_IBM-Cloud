export const TABLE_SORT_DIRECTION = {
  /**
   * Not sorted.
   */
  NONE: 'NONE',

  /**
   * Sorted in ascending order.
   */
  ASCENDING: 'ASC',

  /**
   * Sorted in descending order.
   */
  DESCENDING: 'DESC',
};

/**
 * Table sort cycle.
 */
export const TABLE_SORT_CYCLE = {
  FROM_ASCENDING: 'from-ascending',
  FROM_DESCENDING: 'from-descending',
};

/**
 * Mapping of table sort cycles to table sort states.
 */
export const TABLE_SORT_CYCLES = {
  [TABLE_SORT_CYCLE.FROM_ASCENDING]: [
    TABLE_SORT_DIRECTION.NONE,
    TABLE_SORT_DIRECTION.ASCENDING,
    TABLE_SORT_DIRECTION.DESCENDING,
  ],
  [TABLE_SORT_CYCLE.FROM_DESCENDING]: [
    TABLE_SORT_DIRECTION.NONE,
    TABLE_SORT_DIRECTION.DESCENDING,
    TABLE_SORT_DIRECTION.ASCENDING,
  ],
};
