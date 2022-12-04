import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

const CardBody = ({ children, className, short, ...rest }) => (
  <div
    {...rest}
    className={cx(
      {
        'pal--card__body': true,
        'pal--card__body--short': short,
      },
      className,
    )}
  >
      {children}
  </div>
);

CardBody.propTypes = {
  /**
   * A className that will be applied to the CardBody component.
   */
  className: PropTypes.string,
  /**
   * A CardIllustration component that will display an svg image.
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  /**
   * Whether or not to apply the short body cody styles. This should be applied if the card contains 4 lines of text or less.
   */
  short: PropTypes.bool,
};

CardBody.defaultProps = {
  className: '',
  short: false,
};

export default CardBody;
