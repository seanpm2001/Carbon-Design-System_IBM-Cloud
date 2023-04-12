import React from 'react';
import { PropTypes } from 'prop-types';

const baseClass = 'pal--solution-tile__header';

/**
 * The SolutionTileHeader is used to render headers within a Experimental tile.
 */
const SolutionTileHeader = ({ children, type, ...rest }) => {
  if(!children) {
    return null;
  }

  return(
    <h2 className={baseClass} title={typeof children === 'string' ? children : undefined } {...rest}>
        {children}
        {type && <span className={`${baseClass}__content-type`}>{type}</span>}
    </h2>
  )
}

SolutionTileHeader.propTypes = {
  /**
   * The children to render within the header element.
   */
  children: PropTypes.node,
  /**
   * A brief type description for the tile header
   */
  type: PropTypes.string
}

export default SolutionTileHeader;