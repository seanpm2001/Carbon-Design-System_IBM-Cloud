import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

// Carbon Components
/* Import all Carbon Components Here */

// Skeleton
import Skeleton from './skeleton';

/* TODO Add translations if you have required strings
Translations will be imported frome the locales folder through the ProgressBar.translations file.
This will return an object with the tranlsation strings here in shape of:

{
  en: {},
  es: {}
}

The consumer can provide a locale as a prop to components to control the rendered language.
See below TODOs
*/
// Translations
// import translations from './ProgressBar.translations.json';
// import getLocale from '../../utils/getLocale';
// import getTranslations from '../../utils/getTranslations';
// Render translations string using the above and the locale prop: getTranslations(translations, defaultLocale)

const getStatus = segment =>
  segment.indeterminate ? `indeterminate-${segment.status}` : segment.status;

const progressBarSegments = (segments, value) => {
  return segments.map((segment, i) => {
    const nextThreshold =
      i === segments.length - 1 ? 100 : segments[i + 1].value;
    let status =
      value < nextThreshold ? 'indeterminate-green' : getStatus(segment);
    if (value < segment.value) status = '';
    return (
      <div
        className="pal--progress-bar__section"
        key={`segment-${segment.value}`}
        data-status={status}
        style={{ flexBasis: `${nextThreshold - segment.value}%` }}
      >
        <div
          className={classnames(
            'pal--progress-bar__section__fill',
            segment.className,
          )}
        />
      </div>
    );
  });
};

const percentBarSegments = (segments, value) => {
  const segment = segments.reduce((prevSegment, curSegment) => {
    if (value >= curSegment.value && curSegment.value >= prevSegment.value) {
      return curSegment;
    }
    return prevSegment;
  });
  return (
    <React.Fragment>
      <div
        className="pal--progress-bar__section"
        data-status={getStatus(segment)}
        style={{ flexBasis: `${value}%` }}
      >
        <div className="pal--progress-bar__section__fill" />
      </div>
      <div
        className="pal--progress-bar__section"
        style={{ flexBasis: `${100 - value}%` }}
      >
        <div className="pal--progress-bar__section__fill" />
      </div>
    </React.Fragment>
  );
};

const ProgressBar = ({ value, kind, segments, width, label }) => {
  // TODO enable if using locales const defaultLocale = getLocale(locale);
  if ((value || value === 0) && segments) {
    return (
      <div
        className={classnames('pal--progress-bar', {
          'pal--progress-bar--segments': kind === 'segments',
          'pal--progress-bar--percent': kind === 'percent',
        })}
      >
        <div className="pal--progress-bar__progress" style={{ width }}>
          {kind === 'percent'
            ? percentBarSegments(segments, value)
            : progressBarSegments(segments, value)}
        </div>
        {label && <span className="pal--progress-bar__label">{label}</span>}
      </div>
    );
  }
  return null;
};

const requiredWithinRange = (min, max) => {
  return (props, propName, componentName) => {
    const { [propName]: value } = props;
    if (value || value === 0) {
      if (typeof value === 'number') {
        return value >= min && value <= max
          ? null
          : new Error(
              `${propName} in ${componentName} must be between ${min} and ${max}.`,
            );
      }
      return new Error(
        `${propName} in ${componentName} must be an integer between ${min} and ${max}.`,
      );
    }
    return new Error(`${propName} in ${componentName} is required.`);
  };
};

const zeroTo100 = {
  isRequired: requiredWithinRange(0, 100),
};

const zeroTo99 = {
  isRequired: requiredWithinRange(0, 99),
};

ProgressBar.propTypes = {
  /**
   * Required. The current value of the progress bar, as an integer from 0 to 100. For `kind=segments`, determines which segment shows
   * as the current "running" stage. For `kind=percent`, determines how much of the bar to show as "complete".
   */
  value: zeroTo100.isRequired,
  /**
   * Required. Defines the different stages of progress. The `value` of each segment defines the threshold at which the status of that
   * segment would apply. The `status` must be one of `green`, `yellow`, `red`, `blue`, or 'gray' and determines the color of the bar
   * for that segment. If `indeterminate` is `true` then the segment will show the "indeterminate" animation, typically
   * meaning progress is unknown. The first segment should always have a `value` of 0, and they should be placed in ascending
   * order of `value`, up to but not including 100.
   */
  segments: PropTypes.arrayOf(
    PropTypes.shape({
      status: PropTypes.oneOf(['red', 'yellow', 'green', 'blue', 'gray']),
      className: PropTypes.string,
      value: zeroTo99.isRequired,
      indeterminate: PropTypes.bool,
      label: PropTypes.string,
    }),
  ).isRequired,
  /**
   * A label to show next to the progress bar.
   */
  label: PropTypes.string,
  /**
   * The kind of progress bar to show. Use `segments` to show discrete stages of progress, or `percent` to show progress
   * as a value from 0 to 100 percent. `segments` can be used when progress cannot be easily represented by a percentage,
   * but can be shown as separate relative stages along a progression to completion. In this case the current segment is
   * always shown as "green" and "indeterminate", meaning that is the stage currently in progress.
   */
  kind: PropTypes.oneOf(['segments', 'percent']),
  /**
   * The width of the progress bar (not including the label). Can be any valid CSS width value.
   */
  width: PropTypes.string,
};

ProgressBar.defaultProps = {
  kind: 'segments',
  width: '3.5rem',
  label: '',
};

// components should export translation strings
// ProgressBar.translations = Translations;

// components should export a skeleton
ProgressBar.skeleton = Skeleton;

export default ProgressBar;
