import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { SolutionTileHeader, SolutionTileDescription, SolutionTileDetails, SolutionTileTags, SolutionTileIcon } from './children';
import { ClickableTile } from '@carbon/react';
import { ArrowRight } from '@carbon/react/icons';
import SolutionTileSkeleton from './skeleton';

const baseClass = 'pal--solution-tile';

const SolutionTile = ({ children, size, href, onClick, ...rest}) => {
  
  const classes = classNames(
    baseClass,
    `${baseClass}--${size}`,
  )
  
  return (
    <ClickableTile
      className={classes}
      href={href} 
      onClick={onClick}
      {...rest}
    >
      <div className={`${baseClass}__content`}>
        {children}
        <ArrowRight className={`${baseClass}__arrow`}/>
      </div>
    </ClickableTile>
  );
}

SolutionTile.defaultProps = {
  onClick: () => {},
  href: undefined,
  size: 'md'
}

SolutionTile.header = SolutionTileHeader;
SolutionTile.description = SolutionTileDescription;
SolutionTile.details = SolutionTileDetails;
SolutionTile.tags = SolutionTileTags;
SolutionTile.icon = SolutionTileIcon;
SolutionTile.skeleton = SolutionTileSkeleton;

SolutionTile.propTypes = {
  /**
   * The link the tile should take the user to when clicked.
   */
  href: PropTypes.string.isRequired,
  /**
   * A function to call when clicking on the tile.
   */
  onClick: PropTypes.func,
  /**
   * string to determine size of tile
   * - `sm` = aspect-ratio of `3:2`
   * - `md` = aspect-ratio of `1:1`
   * - `lg` = aspect-ratio of `3:4`
   */
  size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg']),
  /**
   * children
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  ...ClickableTile.propTypes
}

export default SolutionTile;