/**
 * Generates an ID for the panel. Defaults to a provided ID, but if none
 * is provided falls back to a combination of the title and the index.
 * @param {*} panel The side panel to generate an ID for.
 * @param {*} index The index for the side panel.
 */
const getPanelId = (panel, index, nested) => {
  if (panel) {
    return (
      panel.props?.id || `pal-side-panel-${index}${nested ? `--is-nested` : ''}`
    );
  }
  return null;
};

/**
 * Generates pagination details about a side panel by using information about its surrounding components.
 * @param {*} panel
 * @param {*} index
 * @param {*} panels
 * @param {*} activeId
 * @param {*} isNested
 */
const getPanelDetails = (
  panel,
  index,
  panels = [],
  activeId,
  isNested = false,
) => {
  const previousIndex = index - 1;
  const nextIndex = index + 1;
  const id = getPanelId(panel, index, isNested);
  const nextId = getPanelId(panels[nextIndex], nextIndex, isNested);
  const previousId = getPanelId(panels[previousIndex], previousIndex, isNested);

  return {
    id,
    nextId,
    previousId,
    isActive: id === activeId,
    isNextActive: nextId === activeId,
    isPreviousActive: previousId === activeId,
    isNestedActive: panel?.props?.nestedPanels?.find(nestedPanel => {
      return getPanelId(nestedPanel, id, true) === activeId;
    }),
  };
};

export { getPanelId };
export { getPanelDetails };

export default {
  getPanelId,
  getPanelDetails,
};
