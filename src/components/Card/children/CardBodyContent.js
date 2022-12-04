import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const CardBodyContent = ({ children, className, ...rest }) => (
  <div
    {...rest}
    className={cx(
      {
        'pal--card__body-content': true,
      },
      className
    )}>
    {children}
  </div>
);

CardBodyContent.propTypes = {
  /**
   * A className that will be applied to the CardBodyContent component.
   */
  className: PropTypes.string,
  /**
   * A CardIllustration component that will display an svg image.
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

CardBodyContent.defaultProps = {
  className: '',
};

export default CardBodyContent;
