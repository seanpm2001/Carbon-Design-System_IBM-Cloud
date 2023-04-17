import React from 'react';
import { PropTypes } from 'prop-types';

const baseClass = 'pal--solution-tile__icon';

const SolutionTileIcon = ({ children }) => {
  if (!children) {
    return null;
  }

  return (
    <div className={baseClass}>
      {children}
    </div>
  )
}

SolutionTileIcon.propTypes = {
  children: PropTypes.node
}

export default SolutionTileIcon;