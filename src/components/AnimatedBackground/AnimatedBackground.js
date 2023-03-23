import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const Gradient = ({ motion }) => {
   const classes = classNames( 
    `pal--animated-background__gradient`,
    { "pal--animated-background__gradient--motion": motion }
  );

  return (
    <svg filter="url(#filter)" class={classes} height="100%" width="100%"  fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <filter id="filter" x="0" y="0" color-interpolation-filters="sRGB">
          <feGaussianBlur stdDeviation="70" /> 
        </filter>
      </defs>
    </svg>
  )
}


const AnimatedBackground = ({
  className,
  motion,
  colorSet,
  duration,
  scaleY,
  scaleX,
  minOpacity,
  maxOpacity,
  bop,
  minScale,
}) => {

  const classes = classNames(
    `pal--animated-background`,
    {"pal--animated-background--motion": motion},
    colorSet,
    className
  );

  const styles = {
    "--duration": `${duration}ms`,
    "--scale-x": scaleX,
    "--scale-y": scaleY,
    "--min-opacity": minOpacity,
    "--max-opacity": maxOpacity,
    "--bop": `${(-1)*bop}%`, // need a negative value
    "--min-scale": minScale,
  }

  return (
    <div className='pal--animated-background__container' style={styles}>
      <div className={classes}>
        <Gradient motion={motion} />
        </div>
      </div>
  );

};

AnimatedBackground.defaultProps = {
  motion: true,
  className: undefined,
  maxOpacity: 1,
  minOpacity: .8,
  minScale: .8,
  scaleX: 1.1,
  scaleY: 1.3,
  bop: 5,
  colorSet: 'set-cyan-magenta-purple',
  duration: 13500
};

AnimatedBackground.propTypes = {
  /**
   * A custom class name to be applied to the animated background element.
   */
  className: PropTypes.string,
  /**
   * A boolean to toggle animation.
   */
  motion: PropTypes.bool,
  /**
   * A string to pick between the two color sets.
   */
  colorSet: PropTypes.oneOf(['set-cyan-magenta-purple', 'set-cyan-teal']),
  /**
   * A number to determine the speed of the animation.
   */
  duration: PropTypes.number,
  /**
   * A number to determine the max. scale value on the x-axis for the gradient blob animation.
   */
  scaleX: PropTypes.number,
  /**
   * A number to determine the max. scale value on the y-axis for the gradient blob animation.
   */
  scaleY: PropTypes.number,
  /**
   * A number to determine the min. scale value on the y-axis and x-axis for the gradient blob animation.
   */
  minScale: PropTypes.number,
  /**
   * A number to determine the min. opacity value of the gradient blob animation.
   */
  minOpacity: PropTypes.number,
  /**
   * A number to determine the max. opacity value of the gradient blob animation.
   */
  maxOpacity: PropTypes.number,
  /**
   * A number to determine how much the gradient blobs should move on the y-axis during animation.
   */
  bop: PropTypes.number,
};

export default AnimatedBackground;
