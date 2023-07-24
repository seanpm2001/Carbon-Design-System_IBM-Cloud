import { Tabs } from '@carbon/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState } from 'react';
import VerticalTabsFooter from './children/VerticalTabsFooter';
import VerticalTabsHeader from './children/VerticalTabsHeader';

export const VerticalTabsContext = createContext({
  selectedIndex: 0,
  totalTabs: 0,
  isMobile: false,
  setSelectedIndex: () => {},
  setTotalTabs: () => {},
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
  const classes = classNames(
    'pal--vertical-tabs',
    { 'pal--vertical-tabs--mobile': isMobile },
    className
  );

  const handleTabSelect = ({ selectedIndex }) => {
    setSelectedIndex(selectedIndex);
  };

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
    window.addEventListener('resize', handleResize);
  });

  const value = {
    selectedIndex,
    totalTabs,
    isMobile,
    setSelectedIndex,
    setTotalTabs,
  };

  return (
    <VerticalTabsContext.Provider value={value}>
      <Tabs
        selectedIndex={selectedIndex}
        onChange={handleTabSelect}
        className={classes}
        {...rest}>
        <div className={classes}>
          {/* <VerticalTabsHeader /> */}
          {children}
          <VerticalTabsFooter />
        </div>
      </Tabs>
    </VerticalTabsContext.Provider>
  );
};

VerticalTabs.defaultProps = {
  fullHeight: false,
  ...Tabs.defaultProps,
};

VerticalTabs.propTypes = {
  /**
   * Determines whether Tabs span whole height or not.
   */
  fullHeight: PropTypes.bool,
  ...Tabs.propTypes,
};
export default VerticalTabs;
