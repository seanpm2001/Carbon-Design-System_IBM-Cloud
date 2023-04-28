import React from 'react';
import PropTypes from 'prop-types';
import useThemePreference, {
  themes,
} from '../../../Utilities/useThemePreference/useThemePreference';
import sanitizeIds from '../../../utils/sanitizeIds';

function lightNoResults(id, className) {
  const gradientIds = sanitizeIds(
    [
      'icon--noresults--linear-gradient',
      'icon--noresults--linear-gradient-2',
      'icon--noresults--linear-gradient-3',
      'icon--noresults--linear-gradient-4',
      'icon--noresults--linear-gradient-5',
      'icon--noresults--linear-gradient-6',
      'icon--noresults--linear-gradient-7',
    ],
    id
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 80 80">
      <defs>
        <linearGradient
          id={gradientIds['icon--noresults--linear-gradient']}
          x1="2.6"
          x2="43.48"
          y1="-12.81"
          y2="58"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f4f4f4" />
          <stop offset=".69" stopColor="#e0e0e0" />
          <stop offset=".94" stopColor="#c4c4c4" />
          <stop offset="1" stopColor="#a8a8a8" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--noresults--linear-gradient-2']}
          x1="48.57"
          x2="67.31"
          y1="57.08"
          y2="57.08"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#a8a8a8" />
          <stop offset="1" stopColor="#c6c6c6" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--noresults--linear-gradient-3']}
          x1="15.1"
          x2="41.51"
          y1="10.36"
          y2="56.09"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#bdbdbd" />
          <stop offset="1" stopColor="#a3a3a3" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--noresults--linear-gradient-4']}
          x1="34.92"
          x2="34.92"
          y1="-46.56"
          y2="97.82"
          gradientTransform="rotate(30 34.92 27.57)"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6e6e6e" />
          <stop offset=".48" stopColor="#787878" stopOpacity=".69" />
          <stop offset=".72" stopColor="#818181" stopOpacity=".41" />
          <stop offset="1" stopColor="#8c8c8c" stopOpacity=".1" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--noresults--linear-gradient-5']}
          x1="26.4"
          x2="55.54"
          y1="71.67"
          y2="54.85"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#565656" stopOpacity=".05" />
          <stop offset="1" stopColor="#171717" stopOpacity=".1" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--noresults--linear-gradient-6']}
          x1="24.56"
          x2="50.36"
          y1="9.61"
          y2="54.3"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".12" stopColor="#fff" stopOpacity=".01" />
          <stop offset=".22" stopColor="#fff" stopOpacity=".05" />
          <stop offset=".31" stopColor="#fff" stopOpacity=".12" />
          <stop offset=".4" stopColor="#fff" stopOpacity=".21" />
          <stop offset=".48" stopColor="#fff" stopOpacity=".34" />
          <stop offset=".56" stopColor="#fff" stopOpacity=".49" />
          <stop offset=".64" stopColor="#fff" stopOpacity=".66" />
          <stop offset=".71" stopColor="#fff" stopOpacity=".86" />
          <stop offset=".73" stopColor="#fff" stopOpacity=".92" />
          <stop offset="1" stopColor="#fff" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--noresults--linear-gradient-7']}
          x1="15.86"
          x2="56.75"
          y1="-20.5"
          y2="50.32"
          xlinkHref={`#${gradientIds['icon--noresults--linear-gradient']}`}
        />
      </defs>
      <path
        fill={`url(#${gradientIds['icon--noresults--linear-gradient']})`}
        d="M12.69 17.95c0 12.04 8.75 26.85 19.56 33.09 5.64 3.26 10.73 3.52 14.3 1.32l4.82-2.78-1.19-1.93c-3.24 1.73-7.72 1.38-12.66-1.48-9.9-5.72-17.92-19.29-17.92-30.32 0-5.1 1.71-8.75 4.53-10.65l-1.2-1.96-4.83 2.8c-3.36 1.97-5.42 6.08-5.42 11.91"
      />
      <path
        fill={`url(#${gradientIds['icon--noresults--linear-gradient-2']})`}
        d="M67.31 64.92s.11.86-1.89 2.24-2.73 1.18-2.73 1.18L48.57 49.22l4.62-3.42z"
      />
      <path
        fill={`url(#${gradientIds['icon--noresults--linear-gradient-3']})`}
        d="M37.68 46.05c-9.9-5.71-17.93-19.29-17.93-30.32 0-3.79.95-6.78 2.6-8.85-4.87.76-8.09 5.04-8.09 12.02 0 11.03 8.03 24.6 17.93 30.32 6.5 3.75 12.19 3.19 15.33-.76-2.83.44-6.2-.3-9.84-2.4"
      />
      <ellipse
        cx="34.92"
        cy="27.57"
        fill={`url(#${gradientIds['icon--noresults--linear-gradient-4']})`}
        opacity=".5"
        rx="14.55"
        ry="25.2"
        transform="rotate(-30 34.93 27.57)"
      />
      <path
        fill={`url(#${gradientIds['icon--noresults--linear-gradient-5']})`}
        d="M67.1 75L54.26 67.6c1.1-1.15 1.1-2.36-.77-3.44l-.05-.02L26.17 48.4l-.09-.06c-2.6-1.5-5.82-1.05-8.41.45s-3.58 3.48-.99 4.98l27.41 15.8a7.17 7.17 0 005.5.54l12.98 7.51c1.25.72 5.78-1.89 4.53-2.61z"
      />
      <path
        fill={`url(#${gradientIds['icon--noresults--linear-gradient-6']})`}
        d="M42.88 50.8a16.4 16.4 0 01-8.06-2.47C24.94 42.62 16.9 28.69 16.9 17.28c0-5.57 1.9-9.73 5.32-11.72s7.98-1.53 12.8 1.25c9.9 5.7 17.93 19.64 17.93 31.05 0 5.57-1.89 9.73-5.32 11.71a9.37 9.37 0 01-4.75 1.22zM26.97 4.75a8.96 8.96 0 00-4.54 1.17c-3.3 1.9-5.12 5.93-5.12 11.35 0 11.28 7.95 25.04 17.72 30.68 4.7 2.71 9.1 3.16 12.4 1.25s5.1-5.94 5.1-11.35c0-11.28-7.94-25.05-17.7-30.69a16 16 0 00-7.86-2.4z"
        opacity=".6"
      />
      <path
        fill={`url(#${gradientIds['icon--noresults--linear-gradient-7']})`}
        d="M57.02 37.5c0-12.03-8.75-26.84-19.56-33.08-5.64-3.26-10.73-3.53-14.3-1.33l-4.82 2.78 1.18 1.94c3.25-1.74 7.72-1.38 12.67 1.47C42.09 15 50.1 28.58 50.1 39.6c0 4.85-1.55 8.4-4.14 10.37-.12.1-1.17.73-1.3.82l2.11 1.42 4.83-2.79c3.35-1.98 5.42-6.09 5.42-11.92"
      />
    </svg>
  );
}

function darkNoResults(id, className) {
  const gradientIds = sanitizeIds(
    [
      'icon--noresults--linear-gradient',
      'icon--noresults--linear-gradient-2',
      'icon--noresults--linear-gradient-3',
      'icon--noresults--linear-gradient-4',
      'icon--noresults--linear-gradient-5',
      'icon--noresults--linear-gradient-6',
    ],
    id
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 80 80">
      <defs>
        <linearGradient
          id={gradientIds['icon--noresults--linear-gradient']}
          x1="2.6"
          x2="43.48"
          y1="-12.81"
          y2="58"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#525252" />
          <stop offset=".69" stopColor="#393939" />
          <stop offset=".94" stopColor="#393939" />
          <stop offset="1" stopColor="#393939" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--noresults--linear-gradient-2']}
          x1="43.74"
          x2="69.51"
          y1="57.08"
          y2="57.08"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#262626" />
          <stop offset="1" stopColor="#393939" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--noresults--linear-gradient-3']}
          x1="15.1"
          x2="41.51"
          y1="10.36"
          y2="56.09"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#525252" />
          <stop offset="1" stopColor="#262626" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--noresults--linear-gradient-4']}
          x1="34.92"
          x2="34.92"
          y1="-46.56"
          y2="97.82"
          gradientTransform="rotate(30 34.92 27.57)"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#393939" />
          <stop offset=".48" stopColor="#393939" stopOpacity=".69" />
          <stop offset="1" stopColor="#262626" stopOpacity=".1" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--noresults--linear-gradient-5']}
          x1="24.56"
          x2="50.36"
          y1="9.61"
          y2="54.3"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6f6f6f" stopOpacity="0" />
          <stop offset=".17" stopColor="#6f6f6f" stopOpacity=".03" />
          <stop offset=".31" stopColor="#6f6f6f" stopOpacity=".12" />
          <stop offset=".44" stopColor="#6f6f6f" stopOpacity=".28" />
          <stop offset=".56" stopColor="#6f6f6f" stopOpacity=".49" />
          <stop offset=".68" stopColor="#6f6f6f" stopOpacity=".77" />
          <stop offset=".73" stopColor="#6f6f6f" stopOpacity=".92" />
          <stop offset="1" stopColor="#6f6f6f" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--noresults--linear-gradient-6']}
          x1="15.86"
          x2="56.75"
          y1="-20.5"
          y2="50.32"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#525252" />
          <stop offset=".69" stopColor="#393939" />
          <stop offset=".94" stopColor="#393939" />
          <stop offset="1" stopColor="#262626" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientIds['icon--noresults--linear-gradient']})`}
        d="M12.69 17.95c0 12.04 8.75 26.85 19.56 33.09 5.64 3.26 10.73 3.52 14.3 1.32l4.82-2.78-1.19-1.93c-3.24 1.73-7.72 1.38-12.66-1.48-9.9-5.72-17.92-19.29-17.92-30.32 0-5.1 1.71-8.75 4.53-10.65l-1.2-1.96-4.83 2.8c-3.36 1.97-5.42 6.08-5.42 11.91"
      />
      <path
        fill={`url(#${gradientIds['icon--noresults--linear-gradient-2']})`}
        d="M67.31 64.92s.11.86-1.89 2.24-2.73 1.18-2.73 1.18L48.57 49.22l4.62-3.42z"
      />
      <path
        fill={`url(#${gradientIds['icon--noresults--linear-gradient-3']})`}
        d="M37.68 46.05c-9.9-5.71-17.93-19.29-17.93-30.32 0-3.79.95-6.78 2.6-8.85-4.87.76-8.09 5.04-8.09 12.02 0 11.03 8.03 24.6 17.93 30.32 6.5 3.75 12.19 3.19 15.33-.76-2.83.44-6.2-.3-9.84-2.4"
      />
      <ellipse
        cx="34.92"
        cy="27.57"
        fill={`url(#${gradientIds['icon--noresults--linear-gradient-4']})`}
        opacity=".5"
        rx="14.55"
        ry="25.2"
        transform="rotate(-30 34.93 27.57)"
      />
      <path
        d="M67.1 75L54.26 67.6c1.1-1.15 1.1-2.36-.77-3.44l-.05-.02L26.17 48.4l-.09-.06c-2.6-1.5-5.82-1.05-8.41.45s-3.58 3.48-.99 4.98l27.41 15.8a7.17 7.17 0 005.5.54l12.98 7.51c1.25.72 5.78-1.89 4.53-2.61z"
        opacity=".25"
      />
      <path
        fill={`url(#${gradientIds['icon--noresults--linear-gradient-5']})`}
        d="M42.88 50.8a16.4 16.4 0 01-8.06-2.47C24.94 42.62 16.9 28.69 16.9 17.28c0-5.57 1.9-9.73 5.32-11.72s7.98-1.53 12.8 1.25c9.9 5.7 17.93 19.64 17.93 31.05 0 5.57-1.89 9.73-5.32 11.71a9.37 9.37 0 01-4.75 1.22zM26.97 4.75a8.96 8.96 0 00-4.54 1.17c-3.3 1.9-5.12 5.93-5.12 11.35 0 11.28 7.95 25.04 17.72 30.68 4.7 2.71 9.1 3.16 12.4 1.25s5.1-5.94 5.1-11.35c0-11.28-7.94-25.05-17.7-30.69a16 16 0 00-7.86-2.4z"
        opacity=".6"
      />
      <path
        fill={`url(#${gradientIds['icon--noresults--linear-gradient-6']})`}
        d="M57.02 37.5c0-12.03-8.75-26.84-19.56-33.08-5.64-3.26-10.73-3.53-14.3-1.33l-4.82 2.78 1.18 1.94c3.25-1.74 7.72-1.38 12.67 1.47C42.09 15 50.1 28.58 50.1 39.6c0 4.85-1.55 8.4-4.14 10.37-.12.1-1.17.73-1.3.82l2.11 1.42 4.83-2.79c3.35-1.98 5.42-6.09 5.42-11.92"
      />
    </svg>
  );
}

const NoResults = ({ id, className }) => {
  const theme = useThemePreference();

  if (theme === themes.dark) {
    return darkNoResults(id, className);
  }

  return lightNoResults(id, className);
};

NoResults.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
};

export default NoResults;
