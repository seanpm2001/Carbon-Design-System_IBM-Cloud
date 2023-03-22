import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
  Children,
  createRef,
} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { useTranslation } from "react-i18next";

import { ProgressIndicator, ProgressStep } from "@carbon/react";
import SidePanelContainer from "./SidePanelContainer";
import SidePanelBreadcrumbs from "./children/SidePanelBreadcrumbs";
import SidePanelCloseButton from "./children/SidePanelCloseButton";
import SidePanelContent from "./children/SidePanelContent";
import SidePanelControls from "./children/SidePanelControls";
import SidePanelNestedPanels from "./children/SidePanelNestedPanels";
import SidePanelMultiStep from "./children/SidePanelMultiStep";
// import getLocale from "../../utils/getLocale";
// import translationStrings from "./translations";
// import getTranslations from "../../utils/getTranslations";
import { getPanelId } from "./utils/getPanelDetails";
import callIf from "./utils/callIf";
import cloneWithDefaults from "./utils/cloneWithDefaults";
// import translationUtils from "../../utils/translate";
// import trackComponentEvent from "../../utils/analytics";
import getAllTabElements from "./utils/getAllTabElements";
import SidePanelFocusTrap from "./children/SidePanelFocusTrap";

/**
 * A custom hook to return the previous state.
 */
const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

const SidePanel = (props) => {
  const {
    breadCrumbText,
    cancelText,
    children,
    className,
    closePanelText,
    cloneNavProps,
    doneText,
    hideBottomNav,
    hasScrollContent,
    id,
    isMultiStep,
    setStep,
    getCurrentStepInfo,
    nestedPanels,
    nextText,
    onBreadCrumbClick,
    onCancelClick,
    onCloseClick,
    onCloseWithModalHandler,
    onDoneClick,
    onNextClick,
    onPreviousClick,
    previousText,
    primaryButtonDisabled,
    primaryButtonDanger,
    secondaryButtonDisabled,
    selectorPrimaryFocus,
    title,
    willClose,
    doneIsLoading,
    doneIsLoadingText,
    internal: {
      panelSize,
      containerPanelProps,
      setActivePanelById,
      locale,
      activePanelId,
      closePanel,
      childCloseRef,
      nextId,
      previousId,
      renderPrimary,
      breadcrumbs,
      isOpen,
      isActive,
      hasOverlay,
      modalOnDismiss,
    },
    ...rest
  } = props;
  const thisPanel = useRef();
  // MultiStep logic
  let steps = Children.toArray(children);
  // If MiniOrderSummary and MultiStep
  let miniOrderContent;
  let miniOrderSummary;
  const hasMiniOrderSummary = isMultiStep
    ? steps[steps.length - 1].props.className ===
      "pal--mini-order-summary-side-panel__summary"
    : null;
  if (hasMiniOrderSummary && isMultiStep) {
    // eslint-disable-next-line prefer-destructuring
    [miniOrderContent, miniOrderSummary] = steps;
    steps = miniOrderContent.props.children;
  }
  const [currentStep, setCurrentStep] = useState(0);
  const stepRefs = useRef(isMultiStep ? steps.map(() => createRef()) : null);

  // Translation strings
  // const defaultLocale = getLocale(locale);
  const passedStrings = {
    breadCrumbText,
    cancelText,
    closePanelText,
    doneText,
    nextText,
    previousText,
    title,
    doneIsLoadingText,
  };
  const { t } = useTranslation("SidePanel");
  // const defaultStrings = getTranslations(translationStrings, defaultLocale);
  // let translations = {};
  // translations = JSON.parse(JSON.stringify(translationStrings));
  // translations[defaultLocale] = cloneWithDefaults(
  //   passedStrings,
  //   defaultStrings
  // );
  // const translate = translationUtils.getTranslateFunction(
  //   translations,
  //   defaultLocale
  // );
  const prevNestedLength = usePrevious(nestedPanels.length);
  const prevIsActive = usePrevious(isActive);
  const prevIsOpen = usePrevious(isOpen);

  const focusOnLast = () => {
    const tabElements = getAllTabElements(thisPanel.current);
    /* istanbul ignore next */
    if (tabElements.length > 0) {
      tabElements[tabElements.length - 1].focus();
    }
  };

  const focusOnFirst = () => {
    const tabElements = getAllTabElements(thisPanel.current);
    /* istanbul ignore next */
    if (tabElements.length > 0) {
      tabElements[0].focus();
    }
  };

  const onTabToLast = (event) => {
    if (
      hasOverlay &&
      event.key === "Tab" &&
      event.shiftKey &&
      thisPanel.current
    ) {
      event.preventDefault();
      focusOnLast();
    }
  };

  // Focus on either the first breadcrumb or the close button.
  const onTabToFirst = (event) => {
    if (
      hasOverlay &&
      event.key === "Tab" &&
      !event.shiftKey &&
      thisPanel.current
    ) {
      event.preventDefault();
      focusOnFirst();
    }
  };

  // const trackEvent = useCallback(
  //   (action) =>
  //     trackComponentEvent("User Form", {
  //       action: action || "SidePanel action",
  //       title: typeof title === "string" ? title : "", // TODO: include a prop for analytics title for node titles?
  //       palComponent: "SidePanel",
  //       category: "Offering Interface",
  //     }),
  //   [title]
  // );

  // Focus on the pages first element or the previous / done button.
  useEffect(() => {
    if (id === activePanelId && isOpen) {
      // Set a timeout here to allow the side panels visibility to be set
      setTimeout(() => {
        if (thisPanel.current) {
          const firstFocus = thisPanel.current.querySelector(
            selectorPrimaryFocus || "[data-focus-first]"
          );
          const tabElements = getAllTabElements(
            thisPanel.current.querySelector(".pal--side-panel__body-content")
          );
          // If specified focus on the first focusable element.
          if (firstFocus) {
            firstFocus.focus();
            return;
          }
          // Focus on the first element in the content.
          if (tabElements.length > 0) {
            tabElements[0].focus();
            return;
          }
          // If we're not hiding the bottom nav, focus on the last button.
          if (!hideBottomNav) {
            focusOnLast();
            return;
          }
          // Otherwise focus on the first focusable element.
          focusOnFirst();
        }
      }, 100);
    }
  }, [activePanelId, hideBottomNav, id, isOpen, selectorPrimaryFocus]);

  // TODO: Deprecate this way of working with the SidePanel in the future.
  useEffect(() => {
    const currentLength = nestedPanels.length;
    const lastIndex = currentLength - 1;
    if (prevNestedLength < currentLength) {
      setActivePanelById(getPanelId(nestedPanels[lastIndex], lastIndex));
    }

    if (nestedPanels.length > 0) {
      nestedPanels.reduce((hasSetActive, panel, index, panels) => {
        if (hasSetActive) {
          return hasSetActive;
        }

        if (panel.props.willClose) {
          const previousPanel = panels[index - 1];
          const previousNestedOrParentId = previousPanel
            ? getPanelId(previousPanel, index)
            : id;
          setActivePanelById(previousNestedOrParentId);
          return true;
        }
        return false;
      }, false);
    }
  }, [
    id,
    nestedPanels,
    nextId,
    prevNestedLength,
    previousId,
    setActivePanelById,
    willClose,
  ]);

  // Set the child's close ref to the onCloseClick function.
  useEffect(() => {
    if (id === activePanelId) {
      // eslint-disable-next-line no-param-reassign
      childCloseRef.current = modalOnDismiss
        ? () => onCloseWithModalHandler(onCloseClick)
        : onCloseClick;
    }
  }, [
    onCloseClick,
    id,
    activePanelId,
    childCloseRef,
    onCloseWithModalHandler,
    modalOnDismiss,
  ]);

  // Multi Step logic
  const stepsLabels = [];
  const onDoneMultiStep = () => setCurrentStep(0);
  const onCloseMultiStep = () => setCurrentStep(0);
  const onNextStep = () => setCurrentStep(currentStep + 1);
  const onPreviousStep = () => setCurrentStep(currentStep - 1);
  if (steps && isMultiStep) {
    steps.forEach((step) => {
      stepsLabels.push({
        label: step.props.title || step.props.id,
        id: step.props.id,
      });
    });
  }
  let nextIdMultiStep;
  let previousIdMultiStep;
  if (isMultiStep && stepsLabels[currentStep + 1]) {
    nextIdMultiStep = stepsLabels[currentStep + 1].id;
  }
  if (isMultiStep) {
    if (stepsLabels[currentStep - 1]) {
      previousIdMultiStep = stepsLabels[currentStep - 1].id;
    } else {
      previousIdMultiStep = null;
    }
  }
  // Get information about steps
  useEffect(() => {
    if (isMultiStep && getCurrentStepInfo) {
      getCurrentStepInfo({
        currentStep,
        currentStepId: steps[currentStep].props.id,
        currentStepLabel: steps[currentStep].props.title,
      });
    }
  }, [currentStep, getCurrentStepInfo, isMultiStep, steps]);
  // Programmatically set step
  if (setStep) {
    setStep((index) => {
      if (stepsLabels[index]) {
        setCurrentStep(index);
      }
    });
  }

  const multiStep = isMultiStep
    ? steps.map((step, index) => {
        return (
          <SidePanelMultiStep
            key={`index-${step.props.id}`}
            ref={stepRefs.current[index]}
            id={`${step.props.id}-multi-step`}
            aria-hidden={currentStep === index ? "false" : "true"}
            classNames={classNames("pal--side-panel__multi-step-content", {
              "pal--side-panel__multi-step-content--open":
                step.props.id === stepsLabels[currentStep].id,
              "pal--side-panel__multi-step-content--next":
                step.props.id === nextIdMultiStep,
              "pal--side-panel__multi-step-content--previous":
                step.props.id === previousIdMultiStep,
              "pal--side-panel__multi-step-content--hidden-in-place":
                step.props.id !== stepsLabels[currentStep].id &&
                step.props.id !== nextIdMultiStep &&
                step.props.id !== previousIdMultiStep,
            })}
            setActivePanelById={setActivePanelById}
          >
            {step}
          </SidePanelMultiStep>
        );
      })
    : null;
  const miniOrderProps = {};
  const miniOrderSummaryMultiStep = React.isValidElement(miniOrderContent)
    ? React.cloneElement(miniOrderContent, miniOrderProps, multiStep)
    : null;

  useEffect(() => {
    if (isMultiStep) {
      const currentStepRef = stepRefs.current[currentStep];
      const focusablesInCurrentStep = currentStepRef
        ? currentStepRef.current.querySelectorAll(
            'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
          )
        : [];
      const allFocusables = stepRefs.current.reduce((acc, step) => {
        if (step.current) {
          acc.push(
            step.current.querySelectorAll(
              'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
            )
          );
        }
        return acc;
      }, []);
      const allFocusablesFlattened = [];
      allFocusables.forEach((nodeList) =>
        nodeList.forEach((node) => allFocusablesFlattened.push(node))
      );
      allFocusablesFlattened.forEach((elem) =>
        elem.setAttribute("tabindex", "-1")
      );
      focusablesInCurrentStep.forEach((elem) =>
        elem.removeAttribute("tabindex")
      );
    }
  }, [isMultiStep, currentStep, stepRefs]);
  // A function to call when closing the side panel
  const onClose = callIf(
    onCloseClick,
    isMultiStep ? onCloseMultiStep : closePanel
  );
  // A function to call when the next button is clicked.
  const onNext = callIf(
    onNextClick,
    isMultiStep ? onNextStep : () => setActivePanelById(nextId)
  );
  // A function to call when the done button is clicked.
  const onDone = callIf(
    onDoneClick,
    isMultiStep ? onDoneMultiStep : closePanel
  );
  // A function to call when the cancel button is clicked.
  const onCancel = () => {
    callIf(onCancelClick, closePanel)();
  };
  // A function to call when the previous button is clicked.
  const onPrevious = callIf(
    onPreviousClick,
    isMultiStep ? onPreviousStep : () => setActivePanelById(previousId)
  );

  return (
    <SidePanelFocusTrap>
      <div
        ref={thisPanel}
        key={id}
        id={id}
        className={classNames(
          "pal--side-panel",
          {
            "pal--side-panel--open": isOpen,
            "pal--side-panel--small": panelSize === "small",
            "pal--side-panel--xl": panelSize === "xl",
            "pal--side-panel--has-bottom-nav": !hideBottomNav,
          },
          className
        )}
        data-is-active={id === activePanelId}
        {...rest}
      >
        {breadcrumbs && (
          <SidePanelBreadcrumbs
            activePanelId={activePanelId}
            breadcrumbs={breadcrumbs}
            hasOverlay={hasOverlay}
            onBreadCrumbClick={onBreadCrumbClick}
            onPageSelect={setActivePanelById}
            onTabToPrev={onTabToLast}
          />
        )}
        <div
          className={classNames("pal--side-panel__content", {
            "pal--side-panel__content--scroll": hasScrollContent,
            "pal--side-panel__multi-step__parent": isMultiStep,
          })}
        >
          <div className="pal--side-panel__heading--close-button">
            <h3 className="pal--side-panel__heading">{title}</h3>
            <SidePanelCloseButton
              activePanelId={activePanelId}
              focusOnLast={!breadcrumbs && hasOverlay}
              iconDescription={t("closePanelText")}
              onClose={onClose}
              panelId={id}
              onTabToPrev={onTabToLast}
              onTabToNext={(event) => {
                if (getAllTabElements(thisPanel.current).length === 1) {
                  onTabToFirst(event);
                }
              }}
            />
          </div>
          {isMultiStep && (
            <ProgressIndicator
              spaceEqually
              currentIndex={currentStep}
              className="pal--side-panel__progress-indicator"
            >
              {stepsLabels.map((step) => {
                return (
                  <ProgressStep label={step.label} key={`key-${step.id}`} />
                );
              })}
            </ProgressIndicator>
          )}
          <SidePanelContent
            activePanelId={activePanelId}
            cloneNavProps={cloneNavProps}
            nextId={isMultiStep ? nextIdMultiStep : nextId}
            previousId={isMultiStep ? previousIdMultiStep : previousId}
            setActivePanelById={setActivePanelById}
          >
            {(isMultiStep && (
              <>
                <div
                  style={{ position: "relative" }}
                  className={
                    hasMiniOrderSummary && miniOrderContent.props
                      ? miniOrderContent.props.className
                      : ""
                  }
                >
                  {hasMiniOrderSummary ? miniOrderSummaryMultiStep : multiStep}
                </div>
                {hasMiniOrderSummary && miniOrderSummary}
              </>
            )) ||
              children}
          </SidePanelContent>
        </div>
        {!hideBottomNav && (
          <SidePanelControls
            cancelText={t("cancelText")}
            doneText={t("doneText")}
            hasOverlay={hasOverlay}
            nextId={isMultiStep ? nextIdMultiStep : nextId}
            nextText={t("nextText")}
            onCancel={onCancel}
            onNext={onNext}
            onDone={onDone}
            onPrevious={onPrevious}
            previousText={t("previousText")}
            primaryButtonDisabled={
              primaryButtonDisabled || id !== activePanelId
            }
            primaryButtonDanger={primaryButtonDanger}
            renderPrimaryButton={renderPrimary}
            secondaryButtonDisabled={
              secondaryButtonDisabled || id !== activePanelId
            }
            previousId={isMultiStep ? previousIdMultiStep : previousId}
            doneIsLoading={doneIsLoading}
            doneIsLoadingText={t("doneIsLoadingText")}
          />
        )}
      </div>
      <SidePanelNestedPanels
        activePanelId={activePanelId}
        isOpen={isOpen}
        parentBreadcrumbText={
          isMultiStep ? stepsLabels[currentStep].label : breadCrumbText
        }
        locale={locale}
        panelSize={panelSize}
        closePanel={closePanel}
        childCloseRef={childCloseRef}
        containerPanelProps={containerPanelProps}
        nestedPanels={nestedPanels}
        onPageSelect={setActivePanelById}
        hasOverlay={hasOverlay}
        setActivePanelById={setActivePanelById}
        parentPanelId={id}
      />
    </SidePanelFocusTrap>
  );
};
// Set a display name so we can easily filter for these.
SidePanel.displayName = "SidePanel";
SidePanel.SidePanelContainer = SidePanelContainer;

SidePanel.propTypes = {
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
   * The text for the "cancel" button, used when on the first panel. If not provided, this will be inherited
   * from the parent sidePanelContainer.
   */
  cancelText: PropTypes.string,

  /**
   * A custom class name to provide to the side panel component.
   */
  className: PropTypes.string,

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
   * The text for the "previous" button for panels after the first panel of a set. If not provided, this will be inherited
   * from the parent sidePanelContainer.
   */
  previousText: PropTypes.string,

  /**
   * Prop from container that determines all sidepanels will be Multi Step.
   */
  isMultiStep: PropTypes.bool,

  /**
   * A function to be called to return the setStep function. The setStep function will accept step number
   * iterating ([0, number of steps-1 ]) to switch to the desired Step
   */
  setStep: PropTypes.func,
  /**
   * A function to be called to return the current step data. The function is called on every step change
   * returning an object with label, id and current-step index.
   */
  getCurrentStepInfo: PropTypes.func,
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
      })
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
    modalOnDismiss: PropTypes.bool,
  }),

  /**
   * Gets fired if passed when clicking outside the sidepanel
   */
  onCloseWithModalHandler: PropTypes.func,
};

SidePanel.defaultProps = {
  primaryButtonDisabled: false,
  primaryButtonDanger: false,
  doneIsLoading: false,
  secondaryButtonDisabled: false,
  cloneNavProps: false,
  nestedPanels: [],
  willClose: false,
  internal: {},
  hasScrollContent: false,
  getCurrentStepInfo: () => {},
  onCloseWithModalHandler: undefined,
};

export default SidePanel;
export { SidePanelContainer };
