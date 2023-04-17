import React from 'react';
import PropTypes from 'prop-types';

const baseClass = 'pal--solution-tile__description';
/**
 * The SolutionTileDescription is used to render text based content
 * within a summary tile.
 */
const SolutionTileDescription = ({ children }) => {
  if (!children) {
    return null;
  }

  return (
    <p className={baseClass} title={typeof children === 'string' ? children : undefined }>
      {children}
    </p>
  )
};

SolutionTileDescription.propTypes = {
  /**
   * The children to render within the description.
   */
  children: PropTypes.node,
}

SolutionTileDescription.defaultProps = {
  children: undefined,
}

export default SolutionTileDescription;