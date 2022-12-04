import React, { useEffect, useRef } from 'react';
import getAllTabElements from '../utils/getAllTabElements';

// eslint-disable-next-line react/prop-types
const SidePanelFocusTrap = ({ children }) => {
  const botTabTrap = useRef();
  const container = useRef();

  useEffect(() => {
    const trapFocus = event => {
      let elements;

      if (event.target === botTabTrap.current) {
        elements = getAllTabElements(container.current);
        if (elements.length > 0) {
          const firstElement = elements[0];
          firstElement.focus();
        }
      }
    };
    document.addEventListener('focusin', trapFocus);
    return () => document.removeEventListener('focusin', trapFocus);
  }, [botTabTrap, container]);
  return (
    <div ref={container}>
      {children}
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex */}
      {<span role='none' ref={botTabTrap} tabIndex="0" />}
    </div>
  );
};

export default SidePanelFocusTrap;
