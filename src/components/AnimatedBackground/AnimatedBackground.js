import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { Gradient } from './children'; 

const AnimatedBackground = ({
  className,
  motion,
  colorSet,
  duration
}) => {

  const classes = classNames(
    `pal--animated-background`,
    {"pal--animated-background--motion": motion},
    colorSet,
    className
  );

  const styles = {
    "--duration": `${duration}ms`,
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
};

export default AnimatedBackground;
