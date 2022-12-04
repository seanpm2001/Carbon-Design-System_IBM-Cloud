import React, { Children } from 'react';
import PropTypes from 'prop-types';

const SidePanelContent = ({
  activePanelId,
  children,
  cloneNavProps,
  nextId,
  previousId,
  setActivePanelById,
}) => {
  // If it looks like a React component and quacks like one it must be one.
  return (
    <div className="pal--side-panel__body-content">
      {Children.count(children) === 1 &&
      React.isValidElement(children) &&
      children.props &&
      cloneNavProps
        ? React.cloneElement(children, {
            setActivePanelById,
            previousPanelId: previousId,
            activePanelId,
            nextPanelId: nextId,
          })
        : children}
    </div>
  );
};

SidePanelContent.propTypes = {
  activePanelId: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  cloneNavProps: PropTypes.bool.isRequired,
  nextId: PropTypes.string,
  previousId: PropTypes.string,
  setActivePanelById: PropTypes.func.isRequired,
};

export default SidePanelContent;
