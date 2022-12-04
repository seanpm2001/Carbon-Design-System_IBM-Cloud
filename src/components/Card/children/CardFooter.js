import React from 'react';
import PropTypes from 'prop-types';

const CardFooter = ({ children }) => (
  <div className="pal--card__footer">
    {children}
  </div>
);

CardFooter.propTypes = {
  /**
   * Any children to render inside of the CardFooter component.
   */
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default CardFooter;
