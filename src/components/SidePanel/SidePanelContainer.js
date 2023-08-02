import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  Children,
} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Modal } from '@carbon/react';
import { useTranslation } from 'react-i18next';

import { getPanelId, getPanelDetails } from './utils/getPanelDetails';
// import trackComponentEvent from "../../utils/analytics";
import canUseDom from '../../utils/canUseDom';

// Translations
// import getLocale, { documentLanguage } from "../../utils/getLocale";
// import translationUtils from "../../utils/translate";
// import translationStrings from "./translations";

/**
 * Adds a scroll lock to the body to prevent scrolling.
 */
const addScrollLock = () => document.body.classList.add('pal--no-scroll');

/**
 * Removes the scroll lock from the body.
 */
const removeScrollLock = () => document.body.classList.remove('pal--no-scroll');

/**
 * Manages the focus state for the initial focused element.
 */
const useInitialFocus = selector => {
  const initialFocus = useRef();
  const selectorFocus = useRef(null);

  if (selectorFocus.current === null && canUseDom) {
    selectorFocus.current = document.getElementById(selector);
  }

  const focusManagement = useRef({
    focus: () => {
      if (
        document !== 'undefined' &&
        document.body.contains(initialFocus.current)
      ) {
        initialFocus.current.focus();
      }
    },
    setFocus: () => {
      /* istanbul ignore next */
      initialFocus.current =
        document !== 'undefined' ? document.activeElement : null;
    },
  });

  return selector ? selectorFocus.current : focusManagement.current;
};

/**
 * A custom hook to return the previous state.
 */
// const usePrevious = (value) => {
//   const ref = useRef();
//   useEffect(() => {
//     ref.current = value;
//   });
//   return ref.current;
// };

const SidePanelContainer = ({
  isMultiStep,
  className,
  isOpen,
  hasOverlay,
  children,
  getPageRef,
  setPageRef,
  afterClose,
  panelSize,
  focusOnCloseSelector,
  'data-testid': testId,
  modalOnDismiss,
  dismissalModalHeader,
  dismissalModalBody,
  dismissalModalLabel,
  ...containerPanelProps
}) => {
  const { t } = useTranslation('SidePanel');

  const sidePanels = Children.toArray(children);
  // Shared State
  const [panelsOpen, setPanelsOpen] = useState(isOpen);
  const [activePanelId, setActivePanelById] = useState(
    getPanelId(sidePanels[0], 0)
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [modalCloseFunc, setModalCloseFunc] = useState(() => () => true);
  // Refs
  const childCloseRef = useRef();
  const initialFocus = useInitialFocus(focusOnCloseSelector);
  const timeoutRef = useRef(null);
  const animationsOn = useRef();

  // Resets the active panel to the first side panel after the animations finish.
  const resetActivePanel = useCallback(() => {
    /* istanbul ignore next */
    if (!timeoutRef.current) {
      let ref;
      const timeoutValue = animationsOn.current ? 400 : 0;

      const faded = new Promise(resolveFaded => {
        ref = setTimeout(() => {
          setActivePanelById(getPanelId(sidePanels[0], 0));
          timeoutRef.current = null;
          resolveFaded();
        }, timeoutValue);
      });
      timeoutRef.current = ref;
      return faded;
    }
  }, [sidePanels]);

  // const prevIsOpen = usePrevious(isOpen);

  // Clear the timeout if we're unmounting.
  useEffect(() => {
    // Used to match the media-query in our CSS
    animationsOn.current =
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: no-preference)')?.matches;
    return () => timeoutRef.current && clearTimeout(timeoutRef.current);
  }, []);

  // TODO: Deprecate these externally facing refs in the next release of PAL.
  useEffect(() => {
    if (getPageRef) {
      getPageRef({
        activePanelId,
        index: sidePanels.findIndex(
          (panel, index) => activePanelId === getPanelId(panel, index)
        ),
      });
    }
  }, [isOpen, activePanelId, sidePanels]); // eslint-disable-line react-hooks/exhaustive-deps

  if (setPageRef) {
    setPageRef(index => {
      /* istanbul ignore next */
      if (sidePanels[index]) {
        setActivePanelById(getPanelId(sidePanels[index], index));
      }
    });
  }

  useEffect(() => {
    // Reset the panel ID to the first panel if we're closing the panels and refocus on the initial element.
    if (!isOpen && panelsOpen) {
      resetActivePanel();
    }

    // Only refocus if there is an overlay and we're changing the panels.
    if (!isOpen && panelsOpen && hasOverlay) {
      initialFocus.focus();
    }
  }, [hasOverlay, initialFocus, isOpen, panelsOpen, resetActivePanel]);

  // Watch for changes to isOpen to set the internal state and set focus.
  useEffect(() => {
    setPanelsOpen(isOpen);

    if (isOpen && !focusOnCloseSelector) {
      initialFocus.setFocus();
    }
    if (isOpen && focusOnCloseSelector) {
      initialFocus.focus();
    }
  }, [isOpen, initialFocus, focusOnCloseSelector]);

  // Add or remove scroll locking from the body.
  useEffect(() => {
    if (panelsOpen && hasOverlay) {
      addScrollLock();
    } else {
      removeScrollLock();
    }
    return removeScrollLock;
  }, [panelsOpen, hasOverlay]);

  // Closes the panel and reasserts focus on the initially focused element.
  const closePanel = async () => {
    setPanelsOpen(false);
    await resetActivePanel();
    if (hasOverlay) {
      initialFocus.focus();
    }

    afterClose();
  };

  // Closes the side panel and calls the child panels close event.
  const handleOverlayEvents = event => {
    const escapeKeyPress = event.key === 'Escape' && hasOverlay;
    const overlayClick =
      hasOverlay && event.target?.dataset?.id === 'pal-side-panel-container';

    if ((escapeKeyPress || overlayClick) && childCloseRef.current(event)) {
      closePanel();
    }
  };

  // Side Panel Component classes
  const panelContainerClasses = classNames(
    'pal--side-panel-container',
    {
      'pal--side-panel-container--open': panelsOpen,
      'pal--side-panel-container--overlay': hasOverlay,
    },
    className
  );

  const onCloseWithModalHandler = closeFunc => {
    setModalOpen(true);
    setModalCloseFunc(() => () => {
      if (closeFunc()) closePanel(); // behave like the typical flow in handleOverlayEvents above
    });
  };

  return (
    <>
      {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
      <div
        data-id="pal-side-panel-container"
        className={panelContainerClasses}
        onMouseDown={handleOverlayEvents}
        onKeyDown={handleOverlayEvents}
        data-testid={testId}>
        <div className="pal--side-panel-container__panels">
          {sidePanels.reduce((visiblePanels, panel, index, panels) => {
            const {
              id,
              nextId,
              previousId,
              isActive,
              isNextActive,
              isPreviousActive,
              isNestedActive,
            } = getPanelDetails(panel, index, panels, activePanelId);

            if (
              isActive ||
              isNextActive ||
              isNestedActive ||
              isPreviousActive
            ) {
              return [
                ...visiblePanels,
                React.cloneElement(panel, {
                  ...containerPanelProps,
                  ...panel.props,
                  onCloseWithModalHandler,
                  key: id,
                  id,
                  isMultiStep,
                  internal: {
                    containerPanelProps,
                    panelSize,
                    isActive,
                    activePanelId,
                    setActivePanelById,
                    nextId,
                    previousId,
                    // locale,
                    closePanel,
                    childCloseRef,
                    hasOverlay,
                    renderPrimary: true,
                    isOpen:
                      (isActive || isNestedActive || isNextActive) &&
                      panelsOpen,
                    modalOnDismiss,
                  },
                }),
              ];
            }
            return visiblePanels;
          }, [])}
        </div>
      </div>
      {modalOnDismiss && (
        <Modal
          modalHeading={dismissalModalHeader || t('modal.header')}
          aria-label={dismissalModalLabel || t('modal.label')}
          modalLabel={dismissalModalLabel || t('modal.label')}
          onRequestClose={() => setModalOpen(false)}
          onRequestSubmit={() => {
            setModalOpen(false);
            modalCloseFunc();
          }}
          secondaryButtonText={t('cancelText')}
          primaryButtonText={t('modal.closeText')}
          danger
          open={modalOpen}>
          {dismissalModalBody || t('modal.confirmText')}
        </Modal>
      )}
    </>
  );
};

const validSizes = (props, propName, componentName) => {
  const { [propName]: size } = props;
  if (size) {
    if (typeof size === 'string') {
      return size === 'xl' || size === 'medium' || size === 'small'
        ? null
        : new Error(
            `${propName} in ${componentName} must be "small", "medium" or "xl". The "large" option is the same size as the "medium". The "large" prop will be deprecated in the next major release`
          );
    }
    return new Error(`${propName} in ${componentName} valid string.`);
  }
  return null;
};

SidePanelContainer.propTypes = {
  /**
   * A class name to provide to the side panel container component.
   */
  className: PropTypes.string,

  /**
   *  A boolean value indicating whether or not the SidePanel should be open.
   */
  isOpen: PropTypes.bool,

  /**
   * If provided this title will be used for all of the rendered side panels, unless this is
   * overridden by the props provided to a SidePanel. Elements or strings can be rendered inside of the title prop.
   */
  title: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),

  /**
   * A boolean value that specifies whether or not everything outside of the SidePanel should be
   * covered with a semi-transparent overlay.
   */
  hasOverlay: PropTypes.bool,

  /**
   * Function to call after the SidepanelContainer has fully closed, post-animation. If using a boolean statement to control rendering, this callback would be a good place to toggle it to false.
   */
  afterClose: PropTypes.func,

  /**
   * Enables Multi Step Side Panel with Progress Indicator,
   */
  isMultiStep: PropTypes.bool,

  /**
   * The text for the default button when there is only one SidePanel, or the last panel is displayed
   * The default value can be found in /patterns/src/locales/(en|es)/SidePanel
   */
  doneText: PropTypes.string,

  /**
   * An ID used for testing purposes on the container element.
   */
  'data-testid': PropTypes.string,

  /**
   * The text for the back button in a nested panel.
   * The default value can be found in /patterns/src/locales/(en|es)/SidePanel
   */
  backText: PropTypes.string,

  /**
   * the text for the "cancel" button, used when on the only or first panel of a set. If not provided, this will be inherited
   * from the parent sidePanelContainer.
   */
  closePanelText: PropTypes.string,

  /**
   * The text for the primary button for any panels after other than the last when there are multiple panels
   * The default value can be found in /patterns/src/locales/(en|es)/SidePanel
   */
  nextText: PropTypes.string,

  /**
   * The size of the panel. Valid values are 'medium', 'small' and 'xl'. Default is 'medium'.
   * The option "large" will be deprecated in the next major release.
   */
  panelSize: validSizes,

  /**
   * Prop to set focus when the SidePanel is closed. The required id should be passed and then on close this
   * component will be the one focused.
   */
  focusOnCloseSelector: PropTypes.string,
  /**
   * A function to be called if the user clicks the cancel button. If this function returns false
   * the panel will not execute the default navigation behavior. This can be used for form validation.
   * This will be passed to the active SidePanel if no onCancelClick prop is provided and will be used
   * in its place.
   */
  onCancelClick: PropTypes.func,

  /**
   * A function to be called if the user clicks the close button (x) in the upper right of the panel.
   * This will be passed to the active SidePanel if no onCloseClick prop is provided and will be used
   * in its place.
   */
  onCloseClick: PropTypes.func,

  /**
   * A function to be called if the user clicks the done button.  If this function returns false
   * the panel will not execute the default navigation behavior. This can be used for form validation.
   * This will be passed to the active SidePanel if no onDoneClick prop is provided and will be used
   * in its place.
   */
  onDoneClick: PropTypes.func,

  /**
   * A function to be called if the user clicks a breadcrumb.  If this function returns false
   * the panel will not execute the default navigation behavior. This can be used for form validation.
   */
  onBreadCrumbClick: PropTypes.func,

  /**
   * A function to be called when the user clicks the primary button. If this function returns false
   * the panel will not execute the default navigation behavior. This can be used for form validation.
   * This will be passed to the active SidePanel if no onNextClick prop is provided and will be used
   * in its place.
   */
  onNextClick: PropTypes.func,

  /**
   * A function to be called when the user clicks the secondary button. If this function returns false
   * the panel will not execute the default navigation behavior. This can be used for form validation.
   * This will be passed to the active SidePanel if no onPreviousClick prop is provided and will be used
   * in its place.
   */
  onPreviousClick: PropTypes.func,

  /**
   * A function to be called to return the getPage function. The getPage function will return the
   * current panel id.
   */
  getPageRef: PropTypes.func,

  /**
   * A function to be called to return the setPage function. The setPage function will accept page id
   * parameter to switch the specified panel id.
   */
  setPageRef: PropTypes.func,

  /**
   * The children of the SidePanelContainer. These should only be SidePanel elements.
   */
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,

  /**
   * The locale used for translating the strings.
   */
  // locale: PropTypes.string,

  /**
   * If this property is true, the bottom nav will not be rendered.
   */
  hideBottomNav: PropTypes.bool,

  /**
   * If true, a warning will appear if the user tries to click away that
   * informs them that everything in the modal will be lost
   */
  modalOnDismiss: PropTypes.bool,

  /**
   * Header for dismissal warning modal
   */
  dismissalModalHeader: PropTypes.node,

  /**
   * Body for dismissal warning modal
   */
  dismissalModalBody: PropTypes.node,

  /**
   * Label for dismissal warning modal
   */
  dismissalModalLabel: PropTypes.node,
};

SidePanelContainer.defaultProps = {
  isOpen: true,
  hasOverlay: true,
  panelSize: 'medium',
  onCancelClick: () => true,
  onCloseClick: () => true,
  onDoneClick: () => true,
  onNextClick: () => true,
  onPreviousClick: () => true,
  onBreadCrumbClick: () => true,
  afterClose: () => {},
  // locale: documentLanguage,
  hideBottomNav: false,
  modalOnDismiss: false,
  dismissalModalHeader: undefined,
  dismissalModalBody: undefined,
  dismissalModalLabel: undefined,
};

export default SidePanelContainer;
