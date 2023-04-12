import { TagList } from '../../TagList';
import PropTypes from 'prop-types';
import React from 'react';

const baseClass = 'pal--solution-tile__tags';

const SolutionTileTags = ({ tags, ...rest}) => {
  
  if(!tags || !tags.length) {
    return null;
  }

  return (
    <TagList isEditable='never' numTagsDisplayed={10} tags={tags.map((tag)=>{return { ...tag, otherProps: { size:'sm' }}})} className={baseClass} {...rest} />
  );
}

SolutionTileTags.defaultProps = {
  tags: [],
}

SolutionTileTags.propTypes = {
  /**
   * An array of objects representing tags.
   */
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      type: PropTypes.oneOf(['green', 'red', 'magenta', 'red']).isRequired,
      otherProps: PropTypes.objectOf(
        PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
          PropTypes.bool,
          PropTypes.node,
          PropTypes.func,
        ]).isRequired
      ),
    })
  ),
  ...TagList.propTypes

}

export default SolutionTileTags;