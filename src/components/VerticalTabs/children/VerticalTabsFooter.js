import { IconButton } from '@carbon/react';
import { CaretDown, CaretUp } from '@carbon/react/icons';
import { default as React, useContext } from 'react';
import { VerticalTabsContext } from '../VerticalTabs';

/**
 *
 * TODO: add keyboard events
 */

const VerticalTabsFooter = () => {
  const { selectedIndex, totalTabs, setSelectedIndex } =
    useContext(VerticalTabsContext);

  const incrementTab = () => {
    setSelectedIndex(selectedIndex + 1);
  };

  const decrementTab = () => {
    setSelectedIndex(selectedIndex - 1);
  };

  return (
    <div className="pal--vertical-tab-panel__footer">
      <IconButton
        kind="ghost"
        label="Previous"
        onClick={decrementTab}
        disabled={selectedIndex <= 0 || !totalTabs}>
        <CaretUp size={16} />
      </IconButton>
      <IconButton
        kind="ghost"
        label="Next"
        onClick={incrementTab}
        disabled={selectedIndex >= totalTabs - 1 || !totalTabs}>
        <CaretDown size={16} />
      </IconButton>
    </div>
  );
};

VerticalTabsFooter.defaultProps = {};

VerticalTabsFooter.propTypes = {};
export default VerticalTabsFooter;
