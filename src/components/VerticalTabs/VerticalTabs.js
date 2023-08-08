import { Tabs } from '@carbon/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState } from 'react';
import VerticalTabsFooter from './children/VerticalTabsFooter';

export const VerticalTabsContext = createContext({
  selectedIndex: 0,
  totalTabs: 0,
  isMobile: false,
  open: false,
  setSelectedIndex: () => {},
  setTotalTabs: () => {},
  setOpen: () => {},
});
const BREAKPOINT = 672;
/**
 * - make panels scrollable
 * - mobile view
 */
const VerticalTabs = props => {
  const {
    children,
    className,
    fullHeight,
    selectedIndex: controlledSelectedIndex,
    defaultSelectedIndex,
    ...rest
  } = props;

  const [selectedIndex, setSelectedIndex] = useState(
    defaultSelectedIndex | controlledSelectedIndex
  );
  const [totalTabs, setTotalTabs] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const classes = classNames(
    'pal--vertical-tabs',
    { 'pal--vertical-tabs--mobile': isMobile },
    className
  );

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth < BREAKPOINT) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // create an event listener
  useEffect(() => {
    if (window.innerWidth < BREAKPOINT) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    window.addEventListener('resize', handleResize);
  }, []);

  const value = {
    selectedIndex,
    totalTabs,
    isMobile,
    open,
    setSelectedIndex,
    setTotalTabs,
    setOpen,
  };

  return (
    <VerticalTabsContext.Provider value={value}>
      <Tabs selectedIndex={selectedIndex} className={classes} {...rest}>
        <div className={classes}>
          {children}
          <VerticalTabsFooter />
        </div>
      </Tabs>
    </VerticalTabsContext.Provider>
  );
};

VerticalTabs.defaultProps = {
  ...Tabs.defaultProps,
};

VerticalTabs.propTypes = {
  /**
   * Determines whether Tabs span whole height or not.
   */
  ...Tabs.propTypes,
};
export default VerticalTabs;
