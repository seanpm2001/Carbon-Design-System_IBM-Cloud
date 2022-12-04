import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const CardImage = ({ alt, className, src, ...rest }) => (
  <div {...rest} className={cx('pal--card__image-wrap', className)}>
    <img className="pal--card__image" src={src} alt={alt} />
  </div>
);

CardImage.propTypes = {
  /**
   * A description of the image being rendered.
   */
  alt: PropTypes.string.isRequired,
  /**
   * A className to be provided to the CardImage component.
   */
  className: PropTypes.string,
  /**
   * The url of the image that should be rendered.
   */
  src: PropTypes.string.isRequired,
  /**
   * Any styles to apply to the CardImage component. To control the aspect ratio of the image set the paddingTop
   * property to the width of the image divided by the height as a percentage (e.g. 16:9 aspect ratio would be
   * 56.25%).
   */
  style: PropTypes.shape({}),
};

CardImage.defaultProps = {
  className: '',
  style: {},
};

export default CardImage;
