import React from 'react';
import PropTypes from 'prop-types';

const baseClass = 'pal--experimental-tile__description';
/**
 * The ExperimentalTileDescription is used to render text based content
 * within a summary tile.
 */
const ExperimentalTileDescription = ({ children }) => {
  if (!children) {
    return null;
  }

  return (
    <p className={baseClass} title={typeof children === 'string' ? children : undefined }>
      {children}
    </p>
  )
};

ExperimentalTileDescription.propTypes = {
  /**
   * The children to render within the description.
   */
  children: PropTypes.node,
}

ExperimentalTileDescription.defaultProps = {
  children: undefined,
}

export default ExperimentalTileDescription;