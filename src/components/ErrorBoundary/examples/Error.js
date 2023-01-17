import React from 'react';
import PropTypes from 'prop-types';

const ErrorExample = ({ shouldError }) => {
  if (typeof window !== 'undefined' && shouldError) {
    JSON.parse('>');
  }

  return <p>No Error</p>;
};

ErrorExample.propTypes = {
  shouldError: PropTypes.bool,
};

ErrorExample.defaultProps = {
  shouldError: true,
};

export default ErrorExample;
