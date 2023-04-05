import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { ExperimentalTileHeader, ExperimentalTileDescription, ExperimentalTileDetails, ExperimentalTileTags } from './children';
import { ClickableTile } from '@carbon/react';
import { ArrowRight } from '@carbon/react/icons';

const baseClass = 'pal--experimental-tile';

const ExperimentalTile = ({ children, size, href, description, title, type, icon: Icon, tags, details, onClick, ...rest}) => {
  
  const classes = classNames(
    baseClass,
    `${baseClass}--${size}`,
  )
  
  return (
    <ClickableTile
      className={classes}
      href={href} 
      title={title}
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

ExperimentalTile.defaultProps = {
  onClick: () => {},
  href: undefined,
  icon: undefined,
  size: 'md'
}

ExperimentalTile.header = ExperimentalTileHeader;
ExperimentalTile.description = ExperimentalTileDescription;
ExperimentalTile.details = ExperimentalTileDetails;
ExperimentalTile.tags = ExperimentalTileTags;

ExperimentalTile.propTypes = {
  /**
   * The icon node to render.
   */
  icon: PropTypes.any,
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

export default ExperimentalTile;