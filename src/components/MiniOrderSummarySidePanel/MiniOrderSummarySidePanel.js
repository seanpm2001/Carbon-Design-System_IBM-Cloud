import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import SidePanel from '../SidePanel';

const MiniOrderSummarySidePanel = ({
  className,
  onExpandClick,
  onNotificationsClick,
  miniOrderSummary,
  id,
  children,
  ...otherProps
}) => {
  const summaryElRef = useRef();
  const contentElRef = useRef();
  const [isExpanded, setExpanded] = useState(false);
  const [triggerHeightCalculation, recalculateHeights] = useState(false);

  useEffect(() => {
    if (summaryElRef.current && contentElRef.current && miniOrderSummary) {
      const orderSummaryEl = summaryElRef.current.firstChild.firstChild;
      let desiredSummaryHeight = 0;
      // if (isExpanded) {
      // Header when expanded, footer when collapsed
      const headerHeight = orderSummaryEl.children.item(0)?.scrollHeight || 0;
      // Content height is dynamic so find the height of its children
      const contentHeight = orderSummaryEl.children.item(1)
        ? Array.from(orderSummaryEl.children.item(1).children).reduce(
            (height, childElement) => height + childElement.scrollHeight,
            0,
          ) +
          32 /* Content's padding */ +
          1.5 /* Margin for top border */
        : 0;

      // When expanded footer will be third child
      const footerHeight = orderSummaryEl.children.item(2)?.scrollHeight || 0;

      desiredSummaryHeight = headerHeight + contentHeight + footerHeight;
      // } else {
      //   // Only footer present when not expanded
      //   desiredSummaryHeight = orderSummaryEl.firstChild.scrollHeight;
      // }

      const sidePanelTitleHeight = contentElRef.current.parentElement.offsetTop;
      const sidePanelContentEl =
        contentElRef.current.parentElement.parentElement;
      const sidePanelFullHeight = sidePanelContentEl.parentElement.offsetHeight;

      const remainingContentSpace =
        sidePanelFullHeight - desiredSummaryHeight - 68;

      let nextPanelContentHeight = remainingContentSpace;
      let nextSummaryHeight = desiredSummaryHeight;
      if (remainingContentSpace < sidePanelTitleHeight) {
        nextPanelContentHeight = sidePanelTitleHeight;
        nextSummaryHeight = sidePanelFullHeight - sidePanelTitleHeight - 68;
      }

      sidePanelContentEl.style.height = `${nextPanelContentHeight}px`;
      orderSummaryEl.style.height = `${nextSummaryHeight}px`;
    }
  }, [isExpanded, triggerHeightCalculation, miniOrderSummary]);

  const orderSummaryProps = {
    onNotificationsClick: () => {
      recalculateHeights(!triggerHeightCalculation);
      if (typeof onNotificationsClick === 'function') onNotificationsClick();
    },
    onExpandClick: val => {
      setExpanded(val);
      if (typeof onExpandClick === 'function') onExpandClick(val);
    },
    expanded: isExpanded,
  };
  const orderSummary = React.isValidElement(miniOrderSummary)
    ? React.cloneElement(miniOrderSummary, orderSummaryProps)
    : null;

  return (
    <SidePanel
      id={id}
      className={classNames(
        'pal--mini-order-summary-side-panel',
        {
          'pal--mini-order-summary-side-panel--expanded': isExpanded,
        },
        className,
      )}
      {...otherProps}
    >
      <div
        ref={contentElRef}
        className="pal--mini-order-summary-side-panel__content"
      >
        {children}
      </div>
      <div
        ref={summaryElRef}
        className="pal--mini-order-summary-side-panel__summary"
      >
        {orderSummary}
      </div>
    </SidePanel>
  );
};

MiniOrderSummarySidePanel.propTypes = {
  /**
   * A custom class name to provide to the side panel component.
   */
  className: PropTypes.string,

  /**
   * A MiniOrderSummary component. It should always be present in the panel.
   */
  miniOrderSummary: PropTypes.node,

  /**
   * An optional handler function triggered when the passed MiniOrderSummary expands.
   * onExpandClick will not work if passed directly to MiniOrderSummary as this component overrides the prop.
   */
  onExpandClick: PropTypes.func,

  /**
   * An optional handler function triggered when notifications are clicked within the MiniOrderSummary.
   * onNotificationsClick will not work if passed directly to MiniOrderSummary as this component overrides the prop.
   */
  onNotificationsClick: PropTypes.func,

  // ~~~~~~~~~~~~~~~~~~~~~~~ Side Panel Props ~~~~~~~~~~~~~~~~~~~~~~~~~
  /**
   * A unique identifier for a sidePanel component. This is used for pagination purposes and can be useful for setting
   * which SidePanel to currently be viewing.
   */
  id: PropTypes.string.isRequired,

  /**
   * The breadcrumb text for this panel. It should be assigned if this is or has a nested panel.
   */
  breadCrumbText: PropTypes.string,

  /**
   * Whether navigational props should be cloned onto the side panels children. This provides props like
   * setActivePanelById, previousPanelId, nextPanelId, and activePanelId to the Side Nav's child.
   */
  cloneNavProps: PropTypes.bool,

  /**
   * The text for the close icon's tooltip in the right hand corner of the side panel.
   */
  closePanelText: PropTypes.string,

  /**
   * The text for the "done" button, used when on the last panel or a panel in a set of nested panels.
   * If not provided, this will be inherited from the parent sidePanelContainer.
   */
  doneText: PropTypes.string,

  /**
   * If the SidePanel has scroll content. If not provided, then its default is false.
   */
  hasScrollContent: PropTypes.bool,

  /**
   * The text for the "next" button for side panels. If not provided, this will be inherited
   * from the parent sidePanelContainer.
   */
  nextText: PropTypes.string,

  /**
   * Prop from container that determines all sidepanels will be Multi Step.
   */
  isMultiStep: PropTypes.bool,

  /**
   * The title of a side panel. Only needed if the panel is or will have a nested panel, or if
   * the title of one of a sequence of panels is different from its SidePanelContainer. Elements or strings can be rendered inside of the title prop.
   */
  title: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),

  /**
   * Custom function that will be called when the "cancel" button is clicked. If the function does not return a truthy value,
   * the default action of the "cancel" button will be cancelled. The function may also return a promise whose value is resolved later.
   * If a function is not provided here, an equivalent function assigned in the parent SidePanelContainer will be inherited.
   */
  onCancelClick: PropTypes.func,

  /**
   * Function that will be called when a "breadcrumb"  is clicked. If the function does not return a truthy value,
   * the default action of the breadcrumb will be cancelled. The function may also return a promise whose value is resolved later.
   * If a function is not provided here, an equivalent function assigned in the parent SidePanelContainer will be inherited.
   */
  onBreadCrumbClick: PropTypes.func,

  /**
   * Custom function that will be called when the "close" button (x) is clicked. The return value is disregarded.
   * The function may also return a promise whose value is resolved later. If a function is not provided here,
   * an equivalent function assigned in the parent SidePanelContainer will be inherited.
   */
  onCloseClick: PropTypes.func,

  /**
   * Custom function that will be called when the "done" button is clicked. If the function does not return a truthy value,
   * the default action of the "done" button will be cancelled. When in a nested panel this will take the panel to the previous page.
   * When in a side panel that is not nested this will trigger the panel to close. The function may also return a promise whose value is resolved later.
   * If a function is not provided here, an equivalent function assigned in the parent SidePanelContainer will be inherited, except
   * in the case of a nested side panel
   */
  onDoneClick: PropTypes.func,

  /**
   * Custom function that will be called when the "next" button is clicked. If the function does not return a truthy value,
   * the default action of the "next" button will be cancelled. The function may also return a promise whose value is resolved later.
   * If a function is not provided here, an equivalent function assigned in the parent SidePanelContainer will be inherited.
   */
  onNextClick: PropTypes.func,

  /**
   * Custom function that will be called when the "previous" button is clicked. If the
   * function does not return a truthy value, the default action of the "previous" button
   * will be cancelled. The function may also return a promise whose value is resolved later.
   * If a function is not provided here, an equivalent function assigned in the parent SidePanelContainer will be inherited.
   */
  onPreviousClick: PropTypes.func,

  /**
   * Specify a CSS selector that matches the DOM element that should be focused on when SidePanel opens
   */
  selectorPrimaryFocus: PropTypes.string,

  /**
   * Whether or not the primary button should be disabled.
   */
  primaryButtonDisabled: PropTypes.bool,

  /**
   * Whether or not the primary button should be danger type
   */
  primaryButtonDanger: PropTypes.bool,

  /**
   * Whether or not the secondary button should be disabled.
   */
  secondaryButtonDisabled: PropTypes.bool,

  /**
   * The content of the SidePanel. If a component is passed in, a few internal props will be cloned onto the component
   * to help manage pagination. These are setActivePanelID,  previousId, activePanelId, and nextId.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,

  /**
   * An array of nested panels that can be displayed if activated. To active call the setNestedPanel prop that
   * is cloned into the child's content.
   */
  nestedPanels: PropTypes.arrayOf(PropTypes.node),

  /**
   * If this property is true, the bottom nav will not be rendered.
   */
  hideBottomNav: PropTypes.bool,

  /**
   * If this property is true, the this sidePanel will slide closed to prepare to be removed. If you are removing
   * a nested panel from the array of nestedPanels this should be removed 400ms before removal. If you are using
   * the setActivePanelById render prop this can be ignored.
   */
  willClose: PropTypes.bool,

  /**
   * If this property is true, the primary button will be replaced with a loading state until the prop is set back to false.
   */
  doneIsLoading: PropTypes.bool,

  /**
   * This optional prop allows customization of the text shown while the primary button is in a loading state.
   */
  doneIsLoadingText: PropTypes.string,

  /**
   * Internal props for managing state within the component. These should not be set outside of the component
   * and will be ignored if attempted to be set.
   */
  internal: PropTypes.shape({
    panelSize: PropTypes.string,
    containerPanelProps: PropTypes.shape({}),
    setActivePanelById: PropTypes.func,
    activePanelId: PropTypes.string,
    nextId: PropTypes.string,
    previousId: PropTypes.string,
    breadcrumbs: PropTypes.arrayOf(
      PropTypes.shape({
        value: PropTypes.string,
        id: PropTypes.string,
      }),
    ),
    isOpen: PropTypes.bool,
    isActive: PropTypes.bool,
    closePanel: PropTypes.func,
    setActivePanel: PropTypes.func,
    hasOverlay: PropTypes.bool,
    locale: PropTypes.string,
    renderPrimary: PropTypes.bool,
    childCloseRef: PropTypes.shape({
      current: PropTypes.func,
    }),
  }),
};

export default MiniOrderSummarySidePanel;
