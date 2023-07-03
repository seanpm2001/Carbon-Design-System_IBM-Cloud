/**
 * Determines whether an item is the current active item.
 */
const isActiveItem = ({ active, to, href }, activeHref) => {
  // An instance where they've manually set the active prop
  if (typeof active === 'boolean') {
    return active;
  }
  // They're expecting the component to control the active prop.
  if ((to || href) === activeHref) {
    return true;
  }
  return false;
};

/**
 * Find the first active nav item in an array of items.
 * @param {*} items The array of items to search.
 * @param {*} activeHref The currently active href.s
 */
const findActiveItem = (items, activeHref) => {
  return items.reduce((activeItem, item) => {
    const { items: nestedItems } = item;
    if (activeItem) {
      return activeItem;
    }
    // Check nested items first, as anything with nested items do not have active, to, or href props.
    if (nestedItems) {
      return findActiveItem(nestedItems, activeHref) || activeItem;
    }
    if (isActiveItem(item, activeHref)) {
      return item;
    }
    return activeItem;
  }, undefined);
};

export { isActiveItem };
export { findActiveItem };

export default {
  isActiveItem,
  findActiveItem,
};
