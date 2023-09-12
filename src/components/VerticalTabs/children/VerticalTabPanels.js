import PropTypes from 'prop-types';
import React from 'react';

// Used to keep track of position in a list of tab panels
const VerticalTabPanelContext = React.createContext(0);

const VerticalTabPanels = ({ children }) => {
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
