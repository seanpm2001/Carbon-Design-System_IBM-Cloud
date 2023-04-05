import React from 'react';
import { PropTypes } from 'prop-types';

const baseClass = 'pal--experimental-tile__icon';

const ExperimentalTileIcon = ({ children }) => {
  if (!children) {
    return null;
  }

  return (
    <div className={baseClass}>
      {children}
    </div>
  )
}

ExperimentalTileIcon.propTypes = {
  children: PropTypes.node
}

export default ExperimentalTileIcon;