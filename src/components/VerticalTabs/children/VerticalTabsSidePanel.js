import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const VerticalTabsSidePanel = props => {
  const { open, onClose, className, children } = props;

  const id = 'pal--vertical-tabs-sidepanel';

  const classes = classnames(
    'pal--vertical-tabs__sidepanel',
    { 'pal--vertical-tabs__sidepanel--open': open },
    className
  );

  // Closes the side panel and calls the child panels close event.
  const handleOverlayEvents = event => {
    const escapeKeyPress = event.key === 'Escape';
    const overlayClick = event.target?.dataset?.id === id;

    if (escapeKeyPress || overlayClick) {
      onClose(false);
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      data-id={id}
      onMouseDown={handleOverlayEvents}
      onKeyDown={handleOverlayEvents}
      className={classes}>
      {children}
    </div>
  );
};

VerticalTabsSidePanel.propTypes = {
  open: PropTypes.bool.isRequired,
  className: PropTypes.string,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

VerticalTabsSidePanel.defaultProps = {
  open: false,
  onClose: value => {},
  className: undefined,
  children: undefined,
};

export default VerticalTabsSidePanel;
