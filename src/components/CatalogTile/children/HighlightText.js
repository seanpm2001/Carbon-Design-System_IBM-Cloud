import PropTypes from 'prop-types';
import React from 'react';

const HighlightText = ({ model, customClass, decorator }) => {
  return (
    <p className={customClass}>
      {model.map((segment, index) => {
        const key = `${segment.text}-${index}`;
        return segment.highlight ? (
          <span key={key} className="pal--catalog-tile__search-text">
            {segment.text}
          </span>
        ) : (
          <span key={key}>{segment.text}</span>
        );
      })}
      {decorator}
    </p>
  );
};

HighlightText.propTypes = {
  customClass: PropTypes.string,
  decorator: PropTypes.node,
  model: PropTypes.arrayOf(
    PropTypes.shape({
      highlight: PropTypes.bool,
      text: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default HighlightText;
