import React from 'react';
import { getPanelDetails, getPanelId } from '../utils/getPanelDetails';
import callIf from '../utils/callIf';

/**
 * Builds breadcrumbs for a nested panel by iterating over a set of panels and adds a panel
 * to breadcrumbs if it comes before the current panel.
 */
const buildBreadCrumbs = (
  panels,
  panelIndex,
  parentBreadcrumbText,
  parentPanelId,
) => {
  return panels.reduce(
    (arr, panel, breadCrumbIndex) => {
      const value = panel?.props?.breadCrumbText;
      const breadcrumbId = getPanelId(panel, breadCrumbIndex, true);
      return breadCrumbIndex > panelIndex && value && breadcrumbId
        ? arr
        : [...arr, { value, id: breadcrumbId }];
    },
    // Set the initial breadcrumb to the parent panel.
    [{ value: parentBreadcrumbText, id: parentPanelId }],
  );
};

/**
 * Nested panels require that the onDoneClick function be overridden, as clicking done
 * should trigger opening the previous panel.
 */
const nestedPanelOnDoneClick = (
  nestedPanel,
  setActivePanelById,
  previousNestedId,
  parentPanelId,
  event,
) => {
  if (nestedPanel.props.onDoneClick) {
    callIf(nestedPanel.props.onDoneClick, () => {
      setActivePanelById(previousNestedId || parentPanelId);
    })(event);
  }
  return false;
};

const SidePanelNestedPanels = ({
  activePanelId,
  isOpen,
  parentBreadcrumbText,
  locale,
  panelSize,
  closePanel,
  childCloseRef,
  containerPanelProps,
  nestedPanels,
  onPageSelect,
  hasOverlay,
  setActivePanelById,
  parentPanelId,
}) => {
  return nestedPanels.map((nestedPanel, index, panels) => {
    const {
      id: nestedId,
      isNextActive,
      previousId: previousNestedId,
    } = getPanelDetails(nestedPanel, index, panels, activePanelId, true);

    const nestedBreadCrumbs = buildBreadCrumbs(
      panels,
      index,
      parentBreadcrumbText,
      parentPanelId,
    );

    // onBackClick and backText should be deprecated in a future major release.
    const onPreviousClick =
      nestedPanel.props.onBackClick ||
      nestedPanel.props.onPreviousClick ||
      containerPanelProps.onPreviousClick;

    return React.cloneElement(nestedPanel, {
      ...containerPanelProps,
      ...nestedPanel.props,
      id: nestedId,
      key: nestedId,
      onDoneClick: event =>
        nestedPanelOnDoneClick(
          nestedPanel,
          setActivePanelById,
          previousNestedId,
          parentPanelId,
          event,
        ),
      onPreviousClick,
      internal: {
        isOpen: (isNextActive || nestedId === activePanelId) && isOpen,
        breadcrumbs: [...nestedBreadCrumbs],
        containerPanelProps,
        activePanelId,
        panelSize,
        setActivePanelById,
        locale,
        closePanel,
        childCloseRef,
        onPageSelect,
        nextId: null,
        hasOverlay,
        renderPrimary: !!nestedPanel.props.onDoneClick,
        previousId: previousNestedId || parentPanelId,
      },
    });
  });
};

export default SidePanelNestedPanels;
