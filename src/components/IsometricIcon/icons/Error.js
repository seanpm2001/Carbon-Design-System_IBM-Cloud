import React from 'react';
import PropTypes from 'prop-types';
import useThemePreference, {
  themes,
} from '../../../Utilities/useThemePreference/useThemePreference';
import sanitizeIds from '../../../utils/sanitizeIds';

function lightError(id, className) {
  const gradientIds = sanitizeIds(
    [
      'icon--error--linear-gradient',
      'icon--error--linear-gradient-2',
      'icon--error--linear-gradient-3',
      'icon--error--linear-gradient-4',
      'icon--error--linear-gradient-5',
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
          id={gradientIds['icon--error--linear-gradient']}
          x1="29.96"
          x2="53.15"
          y1="45.68"
          y2="85.84"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#525252" stopOpacity=".05" />
          <stop offset="1" stopOpacity=".1" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--error--linear-gradient-2']}
          x1="38.91"
          x2="38.91"
          y1="52.59"
          y2="3.3"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#c6c6c6" />
          <stop offset=".78" stopColor="#e0e0e0" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--error--linear-gradient-3']}
          x1="18.07"
          x2="71.64"
          y1="14.06"
          y2="44.99"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#e0e0e0" />
          <stop offset=".13" stopColor="#f4f4f4" />
          <stop offset=".56" stopColor="#e0e0e0" />
          <stop offset=".62" stopColor="#d8d8d8" />
          <stop offset=".7" stopColor="#c6c6c6" />
          <stop offset=".89" stopColor="#a8a8a8" />
          <stop offset="1" stopColor="#8d8d8d" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--error--linear-gradient-4']}
          x1="27.94"
          x2="49.87"
          y1="51.19"
          y2="13.21"
          gradientUnits="userSpaceOnUse">
          <stop offset=".54" stopColor="#d0d0d0" stopOpacity="0" />
          <stop offset=".82" stopColor="#f1f1f1" stopOpacity=".7" />
          <stop offset=".94" stopColor="#fff" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--error--linear-gradient-5']}
          x1="28.66"
          x2="47.15"
          y1="26.33"
          y2="37"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".05" stopColor="#fdfdfd" />
          <stop offset=".3" stopColor="#f6f6f6" />
          <stop offset="1" stopColor="#f4f4f4" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientIds['icon--error--linear-gradient']})`}
        d="M59.91 78.34l-43-24.83 4.86-2.8 43 24.82-4.86 2.8z"
      />
      <path
        fill={`url(#${gradientIds['icon--error--linear-gradient-2']})`}
        d="M38.98 6.92C51.13 13.94 60.94 30.94 60.9 44.9s-9.92 19.6-22.07 12.58S16.87 33.46 16.91 19.5 26.83-.1 38.98 6.92z"
      />
      <path
        fill={`url(#${gradientIds['icon--error--linear-gradient-3']})`}
        d="M42.85 4.68C36.74 1.15 31.2.82 27.2 3.15l-3.66 2.13c3.98-2.2 9.43-1.83 15.44 1.64C51.13 13.94 60.94 30.94 60.9 44.9c-.02 6.76-2.35 11.57-6.13 13.93l-.07.05c-.32.2 3.66-2.1 3.66-2.1 3.95-2.3 6.4-7.19 6.41-14.12C64.81 28.7 55 11.69 42.85 4.68z"
      />
      <path
        fill={`url(#${gradientIds['icon--error--linear-gradient-4']})`}
        d="M29.11 3.9v.37a19.58 19.58 0 019.68 2.97c12.03 6.94 21.78 23.84 21.74 37.65-.02 9.4-4.56 15.23-11.83 15.23a19.59 19.59 0 01-9.68-2.96C26.99 50.22 17.24 33.32 17.28 19.5c.02-9.39 4.56-15.22 11.83-15.22V3.9m0 0c-7.2 0-12.17 5.7-12.2 15.59-.04 13.96 9.77 30.97 21.92 37.98a20.03 20.03 0 009.87 3.01c7.2 0 12.17-5.7 12.2-15.6.04-13.95-9.77-30.96-21.92-37.97A20.03 20.03 0 0029.1 3.9z"
      />
      <path
        fill={`url(#${gradientIds['icon--error--linear-gradient-5']})`}
        d="M38.93 49.8a6.84 6.84 0 01-2.66-2.52 6.07 6.07 0 01-.81-3v-.98a2.25 2.25 0 01.81-2.05q.81-.52 2.66.55a6.72 6.72 0 012.6 2.5 6.04 6.04 0 01.82 2.98v.99a2.25 2.25 0 01-.82 2.05c-.54.34-1.4.17-2.6-.53zm-1.16-11.64l-1.75-15.39v-9.73l5.81 3.36v9.73l-1.66 13.42z"
      />
    </svg>
  );
}

function darkError(id, className) {
  const gradientIds = sanitizeIds(
    [
      'icon--error--linear-gradient',
      'icon--error--linear-gradient-2',
      'icon--error--linear-gradient-3',
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
          id={gradientIds['icon--error--linear-gradient']}
          x1="38.91"
          x2="38.91"
          y1="77.08"
          y2="8.15"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#262626" />
          <stop offset="1" stopColor="#393939" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--error--linear-gradient-2']}
          x1="12.43"
          x2="76.33"
          y1="10.8"
          y2="47.7"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#525252" />
          <stop offset=".52" stopColor="#393939" />
          <stop offset=".61" stopColor="#393939" />
          <stop offset=".99" stopColor="#161616" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--error--linear-gradient-3']}
          x1="39.38"
          x2="52.04"
          y1="31.37"
          y2="9.45"
          gradientUnits="userSpaceOnUse">
          <stop offset=".11" stopColor="#6f6f6f" stopOpacity="0" />
          <stop offset=".94" stopColor="#6f6f6f" />
        </linearGradient>
      </defs>
      <path
        d="M59.91 78.34l-43-24.83 4.86-2.8 43 24.82-4.86 2.8z"
        opacity=".25"
      />
      <path
        fill={`url(#${gradientIds['icon--error--linear-gradient']})`}
        d="M38.98 6.92C51.13 13.94 60.94 30.94 60.9 44.9s-9.92 19.6-22.07 12.58S16.87 33.46 16.91 19.5 26.83-.1 38.98 6.92z"
      />
      <path
        fill={`url(#${gradientIds['icon--error--linear-gradient-2']})`}
        d="M42.85 4.68C36.74 1.15 31.2.82 27.2 3.15l-3.66 2.13c3.98-2.2 9.43-1.83 15.44 1.64C51.13 13.94 60.94 30.94 60.9 44.9c-.02 6.76-2.35 11.57-6.13 13.93l-.07.05c-.32.2 3.66-2.1 3.66-2.1 3.95-2.3 6.4-7.19 6.41-14.12C64.81 28.7 55 11.69 42.85 4.68z"
      />
      <path
        fill={`url(#${gradientIds['icon--error--linear-gradient-3']})`}
        d="M29.11 3.9v.37a19.58 19.58 0 019.68 2.97c12.03 6.94 21.78 23.84 21.74 37.65-.02 9.4-4.56 15.23-11.83 15.23a19.59 19.59 0 01-9.68-2.96C26.99 50.22 17.24 33.32 17.28 19.5c.02-9.39 4.56-15.22 11.83-15.22V3.9m0 0c-7.2 0-12.17 5.7-12.2 15.59-.04 13.96 9.77 30.97 21.92 37.98a20.03 20.03 0 009.87 3.01c7.2 0 12.17-5.7 12.2-15.6.04-13.95-9.77-30.96-21.92-37.97A20.03 20.03 0 0029.1 3.9z"
      />
      <path
        fill="#525252"
        d="M38.93 49.8a6.84 6.84 0 01-2.66-2.52 6.07 6.07 0 01-.81-3v-.98a2.25 2.25 0 01.81-2.05q.81-.52 2.66.55a6.72 6.72 0 012.6 2.5 6.04 6.04 0 01.82 2.98v.99a2.25 2.25 0 01-.82 2.05c-.54.34-1.4.17-2.6-.53zm-1.16-11.64l-1.75-15.39v-9.73l5.81 3.36v9.73l-1.66 13.42z"
      />
    </svg>
  );
}
const Error = ({ id, className }) => {
  const theme = useThemePreference();

  if (theme === themes.dark) {
    return darkError(id, className);
  }
  return lightError(id, className);
};

Error.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
};

export default Error;
