import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

const VerticalTabsSidePanel = props => {
  const { open, onClose, className, children, ...rest } = props;

  const classes = classnames(
    'pal--vertical-tab-list__sidepanel',
    { 'pal--vertical-tab-list__sidepanel--open': open },
    className
  );

  // Closes the side panel and calls the child panels close event.
  const handleOverlayEvents = event => {
    const escapeKeyPress = event.key === 'Escape';
    const overlayClick =
      event.target?.dataset?.id === 'pal--vertical-tab-list-sidepanel';

    if (escapeKeyPress || overlayClick) {
      onClose(false);
    }
  };

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      data-id="pal--vertical-tab-list-sidepanel"
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
