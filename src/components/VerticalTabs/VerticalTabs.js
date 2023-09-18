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
  onAdd: () => {},
  setOnAdd: () => {},
});
const BREAKPOINT = 672;
/**
 * - make panels scrollable
 * - mobile view
 */
const VerticalTabs = ({
  children,
  className,
  selectedIndex: controlledSelectedIndex,
  defaultSelectedIndex,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(
    defaultSelectedIndex | controlledSelectedIndex
  );
  const [totalTabs, setTotalTabs] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const [onAdd, setOnAdd] = useState(() => {});
  const classes = classNames('pal--vertical-tabs__wrapper', {
    'pal--vertical-tabs__wrapper--mobile': isMobile,
  });

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
    onAdd,
    setOnAdd,
  };

  return (
    <VerticalTabsContext.Provider value={value}>
      <div className={classes}>
        {children}
        <VerticalTabsFooter />
      </div>
    </VerticalTabsContext.Provider>
  );
};

VerticalTabs.defaultProps = {
  selectedIndex: 0,
  defaultSelectedIndex: 0,
  onChange: undefined,
  children: undefined,
  className: undefined,
};

VerticalTabs.propTypes = {
  selectedIndex: PropTypes.number,
  defaultSelectedIndex: PropTypes.number,
  onChange: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
};
export default VerticalTabs;
