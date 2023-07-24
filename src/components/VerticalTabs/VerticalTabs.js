import { Tabs } from '@carbon/react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { createContext, useContext, useState } from 'react';
import VerticalTabsFooter from './children/VerticalTabsFooter';

export const VerticalTabsContext = createContext({
  selectedIndex: 0,
  totalTabs: 0,
  setSelectedIndex: () => {},
  setTotalTabs: () => {},
});

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
  const classes = classNames('pal--vertical-tabs', className);

  const handleTabSelect = ({ selectedIndex }) => {
    setSelectedIndex(selectedIndex);
  };

  const value = {
    selectedIndex,
    totalTabs,
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
