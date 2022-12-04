import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Icons
import EMPTY from './icons/Empty';
import ERROR from './icons/Error';
import NORESULTS from './icons/NoResults';
import NOTIFICATION from './icons/Notification';
import TAG from './icons/Tag';
import UNAUTHORIZED from './icons/Unauthorized';

const iconMap = new Map([
  ['EMPTY', EMPTY],
  ['ERROR', ERROR],
  ['NORESULTS', NORESULTS],
  ['NOTIFICATION', NOTIFICATION],
  ['TAG', TAG],
  ['UNAUTHORIZED', UNAUTHORIZED],
]);

const IsometricIcon = ({ id, icon, className }) => {
  const iconProps = {
    id,
    className: classnames('pal--isometric-icon', className),
  };

  const Icon = iconMap.get(icon);

  return <Icon {...iconProps} />;
};

IsometricIcon.defaultProps = {
  icon: 'EMPTY',
  className: null,
};

IsometricIcon.propTypes = {
  id: PropTypes.string.isRequired,
  icon: PropTypes.oneOfType([
    PropTypes.oneOf([
      'EMPTY',
      'ERROR',
      'NORESULTS',
      'NOTIFICATION',
      'TAG',
      'UNAUTHORIZED',
    ]),
    PropTypes.node,
  ]),
  className: PropTypes.string,
};

export default IsometricIcon;
