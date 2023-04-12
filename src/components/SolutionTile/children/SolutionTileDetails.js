import React from 'react';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';

const baseClass = 'pal--experimental-tile__details';

const SolutionTileDetails = ({ details }) => {
  const classes = classNames(baseClass,
    details?.length > 3 && `${baseClass}--overflow`)

  if (!details || !details.length) {
    return null;
  }

  return (
    <ul className={classes} title={details.map(({value}) => value)}>
      {
        details.map(
         ({ value, key, ...rest }) => (
            <li
              key={key}
              className={`${baseClass}-item`}
              data-experimental-tile-item-type={key}
              {...rest}
            >
              {value}
            </li>
          )
        )
      }
    </ul>
  )
}

SolutionTileDetails.propTypes = {
  details: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.node,
    key: PropTypes.string.isRequired,
  }))
}

export default SolutionTileDetails;