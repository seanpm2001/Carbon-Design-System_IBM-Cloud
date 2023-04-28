import React from 'react';
import PropTypes from 'prop-types';
import useThemePreference, {
  themes,
} from '../../../utilities/useThemePreference/useThemePreference';

import sanitizeIds from '../../../utils/sanitizeIds';

function lightUnauthorized(id, className) {
  const gradientIds = sanitizeIds(
    [
      'icon--unauthorized--linear-gradient',
      'icon--unauthorized--linear-gradient-2',
      'icon--unauthorized--linear-gradient-3',
      'icon--unauthorized--linear-gradient-4',
      'icon--unauthorized--linear-gradient-5',
      'icon--unauthorized--linear-gradient-6',
      'icon--unauthorized--linear-gradient-7',
      'icon--unauthorized--linear-gradient-8',
    ],
    id
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 80 80"
      className={className}>
      <defs>
        <linearGradient
          id={gradientIds['icon--unauthorized--linear-gradient-2']}
          x1="27.98"
          x2="53.65"
          y1="73.72"
          y2="58.9"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#525252" stopOpacity=".05" />
          <stop offset="1" stopOpacity=".1" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--unauthorized--linear-gradient-3']}
          x1="17.33"
          x2="53.57"
          y1="40.68"
          y2="19.76"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f4f4f4" />
          <stop offset=".78" stopColor="#e0e0e0" />
          <stop offset="1" stopColor="#c6c6c6" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--unauthorized--linear-gradient-4']}
          x1="28.59"
          x2="58.88"
          y1="16.01"
          y2="68.47"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f4f4f4" />
          <stop offset=".11" stopColor="#e0e0e0" />
          <stop offset=".25" stopColor="#d8d8d8" />
          <stop offset=".44" stopColor="#c6c6c6" />
          <stop offset=".53" stopColor="#ababab" />
          <stop offset=".93" stopColor="#a8a8a8" />
          <stop offset="1" stopColor="#8d8d8d" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--unauthorized--linear-gradient']}
          x1="26.93"
          x2="61.39"
          y1="50.69"
          y2="50.69"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#a8a8a8" />
          <stop offset="1" stopColor="#c6c6c6" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--unauthorized--linear-gradient-5']}
          x1="39.97"
          x2="39.97"
          y1="32.38"
          y2="1.64"
          xlinkHref={`#${gradientIds['icon--unauthorized--linear-gradient']}`}
        />
        <linearGradient
          id={gradientIds['icon--unauthorized--linear-gradient-6']}
          x1="24.59"
          x2="51.62"
          y1="44.68"
          y2="44.68"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#e0e0e0" />
          <stop offset="1" stopColor="#c6c6c6" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--unauthorized--linear-gradient-7']}
          x1="32.72"
          x2="38.82"
          y1="45.46"
          y2="41.94"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#a8a8a8" />
          <stop offset="1" stopColor="#8d8d8d" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--unauthorized--linear-gradient-8']}
          x1="20.61"
          x2="52.7"
          y1="20.85"
          y2="39.38"
          gradientUnits="userSpaceOnUse">
          <stop offset=".67" stopColor="#fff" />
          <stop offset=".76" stopColor="#fff" stopOpacity=".99" />
          <stop offset=".8" stopColor="#fdfdfd" stopOpacity=".96" />
          <stop offset=".84" stopColor="#fbfbfb" stopOpacity=".91" />
          <stop offset=".87" stopColor="#f7f7f7" stopOpacity=".83" />
          <stop offset=".9" stopColor="#f3f3f3" stopOpacity=".74" />
          <stop offset=".92" stopColor="#ededed" stopOpacity=".62" />
          <stop offset=".94" stopColor="#e6e6e6" stopOpacity=".48" />
          <stop offset=".97" stopColor="#dfdfdf" stopOpacity=".31" />
          <stop offset=".99" stopColor="#d6d6d6" stopOpacity=".13" />
          <stop offset="1" stopColor="#d0d0d0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientIds['icon--unauthorized--linear-gradient-2']})`}
        d="M20.28 60.39l10.27-5.94 30.8 17.79-10.26 5.93-30.81-17.78z"
      />
      <path
        fill={`url(#${gradientIds['icon--unauthorized--linear-gradient-3']})`}
        d="M61.16 32.9a1.46 1.46 0 00-.5-.5l-1.1-.64L31.07 15.3a.52.52 0 00-.49-.06l-10.1 5.83c-.12.07 2.15 28.77 2.15 28.77l4.3 2.79L61.25 33.1a1.78 1.78 0 00-.1-.2z"
      />
      <path
        fill={`url(#${gradientIds['icon--unauthorized--linear-gradient-4']})`}
        d="M61.16 62.45a.5.5 0 00.23-.48V33.64a1.36 1.36 0 00-.13-.54L26.93 52.64l24.12 15.64z"
      />
      <path
        fill={`url(#${gradientIds['icon--unauthorized--linear-gradient']})`}
        d="M61.16 62.45a.5.5 0 00.23-.48V33.64a1.36 1.36 0 00-.13-.54L26.93 52.64l24.12 15.64z"
      />
      <path
        fill={`url(#${gradientIds['icon--unauthorized--linear-gradient-5']})`}
        d="M46.88 31.4a.85.85 0 00.5.7 2.65 2.65 0 002.4 0 .84.84 0 00.5-.7V18.27c0-5.39-4.15-12-9.46-15.07-3.04-1.76-6.04-2.04-8.22-.78-1.9 1.1-2.95 3.19-2.95 5.9V21.5a.84.84 0 00.5.7 2.66 2.66 0 002.4 0 .84.84 0 00.5-.7V8.31a3.28 3.28 0 011.25-2.95c1.08-.62 2.88-.33 4.82.78 4.2 2.44 7.76 7.99 7.76 12.13z"
      />
      <path
        fill={`url(#${gradientIds['icon--unauthorized--linear-gradient-6']})`}
        d="M50.56 38.22l-1.1-.63-28.49-16.45a.52.52 0 00-.49-.06.5.5 0 00-.23.48v28.33a1.49 1.49 0 00.23.74 1.46 1.46 0 00.5.5L49.45 67.6l1.1.63a.52.52 0 00.5.06.5.5 0 00.22-.47V39.47a1.5 1.5 0 00-.23-.74 1.46 1.46 0 00-.49-.5z"
      />
      <path
        fill={`url(#${gradientIds['icon--unauthorized--linear-gradient-7']})`}
        d="M38.02 41.63a4.98 4.98 0 00-2.25-3.9c-1.25-.71-2.26-.13-2.26 1.3a4.76 4.76 0 00.84 2.5l-.84 5.3 4.5 2.6-.83-6.26a1.48 1.48 0 00.84-1.54z"
      />
      <path
        fill={`url(#${gradientIds['icon--unauthorized--linear-gradient-8']})`}
        d="M51.4 38.51a1.88 1.88 0 00-.63-.65l-1.1-.63-28.49-16.45a1.04 1.04 0 00-.1-.05l-.6.35a.38.38 0 01.17-.04.65.65 0 01.33.1l28.48 16.45 1.1.63a1.46 1.46 0 01.5.5l.06.15.37-.2-.08-.16z"
      />
    </svg>
  );
}

function darkUnauthorized(id, className) {
  const gradientIds = sanitizeIds(
    [
      'icon--unauthorized--linear-gradient',
      'icon--unauthorized--linear-gradient-2',
      'icon--unauthorized--linear-gradient-3',
      'icon--unauthorized--linear-gradient-4',
      'icon--unauthorized--linear-gradient-5',
      'icon--unauthorized--linear-gradient-6',
      'icon--unauthorized--linear-gradient-7',
      'icon--unauthorized--linear-gradient-8',
    ],
    id
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      className={className}
      viewBox="0 0 80 80">
      <defs>
        <linearGradient
          id={gradientIds['icon--unauthorized--linear-gradient-2']}
          x1="17.33"
          x2="53.57"
          y1="40.68"
          y2="19.76"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#525252" />
          <stop offset="1" stopColor="#393939" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--unauthorized--linear-gradient']}
          x1="37.21"
          x2="71.41"
          y1="61.49"
          y2="41.74"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#262626" />
          <stop offset="1" stopColor="#393939" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--unauthorized--linear-gradient-3']}
          x1="39.97"
          x2="39.97"
          y1="32.38"
          y2="1.64"
          xlinkHref={`#${gradientIds['icon--unauthorized--linear-gradient']}`}
        />
        <linearGradient
          id={gradientIds['icon--unauthorized--linear-gradient-4']}
          x1="24.59"
          x2="51.62"
          y1="44.68"
          y2="44.68"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#393939" />
          <stop offset="1" stopColor="#262626" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--unauthorized--linear-gradient-5']}
          x1="32.72"
          x2="38.82"
          y1="45.46"
          y2="41.94"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#262626" />
          <stop offset="1" stopColor="#161616" />
        </linearGradient>
      </defs>
      <path
        d="M20.28 60.39l10.27-5.94 30.8 17.79-10.26 5.93-30.81-17.78z"
        opacity=".25"
      />
      <path
        fill={`url(#${gradientIds['icon--unauthorized--linear-gradient-2']})`}
        d="M61.16 32.9a1.46 1.46 0 00-.5-.5l-1.1-.64L31.07 15.3a.52.52 0 00-.49-.06l-10.1 5.83c-.12.07 2.15 28.77 2.15 28.77l4.3 2.79L61.25 33.1a1.78 1.78 0 00-.1-.2z"
      />
      <path
        fill={`url(#${gradientIds['icon--unauthorized--linear-gradient']})`}
        d="M61.16 62.45a.5.5 0 00.23-.48V33.64a1.36 1.36 0 00-.13-.54L26.93 52.64l24.12 15.64z"
      />
      <path
        fill={`url(#${gradientIds['icon--unauthorized--linear-gradient-3']})`}
        d="M46.88 31.4a.85.85 0 00.5.7 2.65 2.65 0 002.4 0 .84.84 0 00.5-.7V18.27c0-5.39-4.15-12-9.46-15.07-3.04-1.76-6.04-2.04-8.22-.78-1.9 1.1-2.95 3.19-2.95 5.9V21.5a.84.84 0 00.5.7 2.66 2.66 0 002.4 0 .84.84 0 00.5-.7V8.31a3.28 3.28 0 011.25-2.95c1.08-.62 2.88-.33 4.82.78 4.2 2.44 7.76 7.99 7.76 12.13z"
      />
      <path
        fill={`url(#${gradientIds['icon--unauthorized--linear-gradient-4']})`}
        d="M50.56 38.22l-1.1-.63-28.49-16.45a.52.52 0 00-.49-.06.5.5 0 00-.23.48v28.33a1.49 1.49 0 00.23.74 1.46 1.46 0 00.5.5L49.45 67.6l1.1.63a.52.52 0 00.5.06.5.5 0 00.22-.47V39.47a1.5 1.5 0 00-.23-.74 1.46 1.46 0 00-.49-.5z"
      />
      <path
        fill={`url(#${gradientIds['icon--unauthorized--linear-gradient-5']})`}
        d="M38.02 41.63a4.98 4.98 0 00-2.25-3.9c-1.25-.71-2.26-.13-2.26 1.3a4.76 4.76 0 00.84 2.5l-.84 5.3 4.5 2.6-.83-6.26a1.48 1.48 0 00.84-1.54z"
      />
      <path
        fill="#6f6f6f"
        d="M51.4 38.51a1.88 1.88 0 00-.63-.65l-1.1-.63-28.49-16.45a1.04 1.04 0 00-.1-.05l-.6.35a.38.38 0 01.17-.04.65.65 0 01.33.1l28.48 16.45 1.1.63a1.46 1.46 0 01.5.5l.06.15.37-.2-.08-.16z"
      />
    </svg>
  );
}

const Unauthorized = ({ id, className }) => {
  const theme = useThemePreference();

  if (theme === themes.dark) {
    return darkUnauthorized(id, className);
  }

  return lightUnauthorized(id, className);
};

Unauthorized.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
};

export default Unauthorized;
