import React from 'react';
import cx from 'classnames';
import { ZoomIn, ZoomOut, ZoomReset, Launch } from '@carbon/react/icons';
import PropTypes from 'prop-types';

const ZoomControls = ({ onZoomIn, onZoomOut, onZoomReset, imageUrl }) => {
  return <div className={cx(
      'pal--media-gallery__modal-zoom-controls'
    )}>
      <button
        aria-label="Zoom in image"
        type="button"
        className="pal--media-gallery__modal-zoom-control"
        onClick={() => onZoomIn()}
      >
        <ZoomIn size={24} />
      </button>
      <button
        aria-label="Zoom out image"
        type="button"
        className="pal--media-gallery__modal-zoom-control"
        onClick={() => onZoomOut()}
      >
        <ZoomOut size={24} />
      </button>
      <button
        aria-label="Reset zoom"
        type="button"
        className="pal--media-gallery__modal-zoom-control"
        onClick={() => onZoomReset()}
      >
        <ZoomReset size={24} />
      </button>
      <a
        aria-label="Launch in new window"
        className="pal--media-gallery__modal-zoom-control"
        href={imageUrl || ''}
        target="_blank"
        rel="noreferrer"
      >
        <Launch size={24} />
      </a>
    </div>;
}

ZoomControls.propTypes = {
  /**
   * A function to call when onZoomIn is clicked.
   */
  onZoomIn: PropTypes.func.isRequired,
  /**
   * A function to call when onZoomOut is clicked.
   */
  onZoomOut: PropTypes.func.isRequired,
  /**
   * A function to call when onZoomReset is clicked.
   */
  onZoomReset: PropTypes.func.isRequired,
    /**
   * A function to call when onZoomReset is clicked.
   */
  imageUrl: PropTypes.string
};

export default ZoomControls; 