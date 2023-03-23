import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import { ReactComponent as GradientMotion} from './gradient_motion.svg';
import { ReactComponent as GradientNoMotion} from './gradient_no_motion.svg';

const AnimatedBackground = ({
  className,
  motion,
  colorSet,
  duration,
  scaleY,
  scaleX,
  minOpacity,
  maxOpacity,
  translateY,
  minScale,
}) => {

  const classes = classNames(
    `pal--animated-background-svg`,
    {"pal--animated-background-svg--motion": motion},
    colorSet,
    className
  );

  const styles = {
    "--duration": `${duration}ms`,
    "--scale-x": scaleX,
    "--scale-y": scaleY,
    "--min-opacity": minOpacity,
    "--max-opacity": maxOpacity,
    "--translate-y": `${translateY}%`,
    "--min-scale": minScale,
  }

  return (
    <div className='pal--animated-background-svg__container' style={styles}>
      <div className={classes}>
        { motion ? (
           <GradientMotion/>
        ):(
          <GradientNoMotion/>
        )}   
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
  translateY: -5,
  colorSet: 'set-cyan-magenta-purple',
  duration: 13500
};

AnimatedBackground.propTypes = {
  /**
   * A custom class name to be applied to the page header's `header` element.
   */
  className: PropTypes.string,
  motion: PropTypes.bool,
  colorSet: PropTypes.oneOf(['set-cyan-magenta-purple', 'set-cyan-teal']),
  duration: PropTypes.number,
  scaleX: PropTypes.number,
  scaleY: PropTypes.number,
  minOpacity: PropTypes.number,
  maxOpacity: PropTypes.number,
  translateY: PropTypes.number,
  minScale: PropTypes.number,

};

export default AnimatedBackground;
