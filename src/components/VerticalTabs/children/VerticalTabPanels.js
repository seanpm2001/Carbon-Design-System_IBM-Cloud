import PropTypes from 'prop-types';
import React, { useContext } from 'react';
import Message from '../../Message';
import { Add } from '@carbon/react/icons';
import { VerticalTabsContext } from '../VerticalTabs';

// Used to keep track of position in a list of tab panels
const VerticalTabPanelContext = React.createContext(0);

const VerticalTabPanels = ({ children }) => {
  const { onAdd } = useContext(VerticalTabsContext);

  const handleAdd = () => {
    if (onAdd) {
      onAdd();
    }
  };

  if (!children) {
    return (
      <div className="pal--vertical-tab-panel pal--vertical-tab-panel--empty">
        <Message
          isTileWrapped
          text="Resources"
          caption="You can find your resource details here after you create them."
          button={{
            text: 'Create resource',
            kind: 'tertiary',
            size: 'sm',
            renderIcon: Add,
            onClick: handleAdd,
          }}
        />
      </div>
    );
  }

  return (
    <>
      {React.Children.map(children, (child, index) => {
        return (
          <VerticalTabPanelContext.Provider value={index}>
            {child}
          </VerticalTabPanelContext.Provider>
        );
      })}
    </>
  );
};

VerticalTabPanels.propTypes = {
  children: PropTypes.node.isRequired,
};
export { VerticalTabPanelContext };
export default VerticalTabPanels;
