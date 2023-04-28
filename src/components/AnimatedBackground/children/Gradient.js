import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Gradient = ({ motion }) => {
   const classes = classNames( 
    `pal--animated-background__gradient`,
    { "pal--animated-background__gradient--motion": motion }
  );

  return (
    <svg filter="url(#filter)" className={classes} height="100%" width="100%"  fill="none" xmlns="http://www.w3.org/2000/svg">
      {motion ? (
        <g>
          <ellipse id="blob1" cx="0%" cy="110%" rx="20%" ry="18%"/>
          <ellipse id="blob2" cx="25%" cy="110%" rx="20%" ry="18%"/>    
          <ellipse id="blob3" cx="50%" cy="110%" rx="20%" ry="18%"/>
          <ellipse id="blob4" cx="75%" cy="110%" rx="20%" ry="18%"/>
          <ellipse id="blob5" cx="100%" cy="110%" rx="20%" ry="18%"/>
        </g>
      ) : (
        <g>
          <ellipse id="blob1" cx="5%" cy="100%" rx="10%" ry="35%" />
          <ellipse id="blob2" cx="15%" cy="100%" rx="25%" ry="15%" />    
          <ellipse id="blob3" cx="40%" cy="105%" rx="10%" ry="20%" />
          <ellipse id="blob4" cx="80%" cy="100%" rx="30%" ry="15%" />
          <ellipse id="blob5" cx="100%" cy="100%" rx="20%" ry="50%" />
        </g>
      )}
      <defs>
        <filter id="filter" x="0" y="0" colorInterpolationFilters="sRGB">
          <feGaussianBlur stdDeviation="70" /> 
        </filter>
      </defs>
    </svg>
  )
}

Gradient.propTypes = {
  motion: PropTypes.bool
}

Gradient.defaultProps = {
  motion: true
}

export default Gradient;
