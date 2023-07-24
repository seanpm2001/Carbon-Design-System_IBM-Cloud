import { IconButton, Search } from '@carbon/react';
import { Add, ArrowsVertical } from '@carbon/react/icons';
import React, { useContext } from 'react';
import { VerticalTabsContext } from '../VerticalTabs';
import PropTypes from 'prop-types';

const VerticalTabsHeader = props => {
  const { withAdd } = props;
  const { selectedIndex, totalTabs, setSelectedIndex } =
    useContext(VerticalTabsContext);

  return (
    <div className="pal--vertical-tab-list__header">
      <Search
        onClear={() => {}}
        className="pal--vertical-tab-list__search"
        // {...searchProps}
      />
      <IconButton onClick={() => {}} kind="ghost">
        <ArrowsVertical />
      </IconButton>
      {withAdd && (
        <IconButton onClick={() => {}} kind="primary">
          <Add />
        </IconButton>
      )}
    </div>
  );
};

VerticalTabsHeader.defaultProps = {
  withAdd: false,
};

VerticalTabsHeader.propTypes = {
  withAdd: PropTypes.bool,
};
export default VerticalTabsHeader;
