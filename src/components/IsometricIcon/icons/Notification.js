import React from 'react';
import PropTypes from 'prop-types';
import useThemePreference, {
  themes,
} from '../../../utilities/useThemePreference/useThemePreference';
import sanitizeIds from '../../../utils/sanitizeIds';

function lightNotification(id, className) {
  const gradientIds = sanitizeIds(
    [
      'icon--notification--linear-gradient',
      'icon--notification--linear-gradient-2',
      'icon--notification--linear-gradient-3',
      'icon--notification--linear-gradient-4',
      'icon--notification--linear-gradient-5',
      'icon--notification--linear-gradient-6',
      'icon--notification--linear-gradient-7',
      'icon--notification--linear-gradient-8',
      'icon--notification--linear-gradient-9',
      'icon--notification--linear-gradient-10',
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
          id={gradientIds['icon--notification--linear-gradient']}
          x1="61.44"
          x2="61.44"
          y1="66.99"
          y2="60.01"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#c6c6c6" />
          <stop offset=".78" stopColor="#e0e0e0" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--notification--linear-gradient-3']}
          x1="28.5"
          x2="53.04"
          y1="44.06"
          y2="86.58"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#525252" stopOpacity=".05" />
          <stop offset="1" stopOpacity=".1" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--notification--linear-gradient-4']}
          x1="30.05"
          x2="35.5"
          y1="54.31"
          y2="54.31"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#a4a4a4" />
          <stop offset="1" stopColor="#bebebe" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--notification--linear-gradient-5']}
          x1="28.61"
          x2="70.69"
          y1="-3.97"
          y2="68.92"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f4f4f4" />
          <stop offset=".52" stopColor="#e0e0e0" />
          <stop offset=".56" stopColor="#d8d8d8" />
          <stop offset=".61" stopColor="#c6c6c6" />
          <stop offset=".89" stopColor="#a8a8a8" />
          <stop offset=".95" stopColor="#8d8d8d" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--notification--linear-gradient-6']}
          x1="38.01"
          x2="38.01"
          y1="59.43"
          y2="3.27"
          xlinkHref={`#${gradientIds['icon--notification--linear-gradient']}`}
        />
        <linearGradient
          id={gradientIds['icon--notification--linear-gradient-7']}
          x1="21.52"
          x2="61.39"
          y1="36.2"
          y2="36.2"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#e0e0e0" />
          <stop offset="1" stopColor="#c6c6c6" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--notification--linear-gradient-2']}
          x1="17.68"
          x2="55.37"
          y1="15.75"
          y2="37.5"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".05" stopColor="#fdfdfd" />
          <stop offset=".3" stopColor="#f6f6f6" />
          <stop offset="1" stopColor="#f4f4f4" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--notification--linear-gradient-8']}
          x1="14.24"
          x2="51.92"
          y1="21.8"
          y2="43.56"
          xlinkHref={`#${gradientIds['icon--notification--linear-gradient-2']}`}
        />
        <linearGradient
          id={gradientIds['icon--notification--linear-gradient-9']}
          x1="10.96"
          x2="48.66"
          y1="27.56"
          y2="49.33"
          xlinkHref={`#${gradientIds['icon--notification--linear-gradient-2']}`}
        />
        <linearGradient
          id={gradientIds['icon--notification--linear-gradient-10']}
          x1="15.14"
          x2="63.06"
          y1="5.72"
          y2="33.52"
          gradientUnits="userSpaceOnUse">
          <stop offset=".78" stopColor="#fff" />
          <stop offset=".8" stopColor="#fefefe" stopOpacity=".98" />
          <stop offset=".82" stopColor="#fcfcfc" stopOpacity=".93" />
          <stop offset=".85" stopColor="#f8f8f8" stopOpacity=".84" />
          <stop offset=".87" stopColor="#f2f2f2" stopOpacity=".72" />
          <stop offset=".9" stopColor="#eaeaea" stopOpacity=".56" />
          <stop offset=".93" stopColor="#e1e1e1" stopOpacity=".37" />
          <stop offset=".95" stopColor="#d7d7d7" stopOpacity=".14" />
          <stop offset=".97" stopColor="#d0d0d0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientIds['icon--notification--linear-gradient']})`}
        d="M61.3 68.1a.93.93 0 00.09-.13.93.93 0 01-.09.14zm.22-.45a1.6 1.6 0 00.03-.32l.02-7.24-.02 7.24a1.6 1.6 0 01-.03.32zm-.09.26a1.18 1.18 0 00.07-.2 1.18 1.18 0 01-.07.2z"
      />
      <path
        fill={`url(#${gradientIds['icon--notification--linear-gradient-3']})`}
        d="M15.13 52.11l45.5 26.28 4.25-2.51L19.4 49.63l-4.27 2.48z"
      />
      <path
        fill={`url(#${gradientIds['icon--notification--linear-gradient-4']})`}
        d="M32.66 52.85l-2.25 4.22a1.14 1.14 0 01-.36.35l2.83-1.65a1.15 1.15 0 00.36-.35l2.26-4.22z"
      />
      <path
        fill={`url(#${gradientIds['icon--notification--linear-gradient-5']})`}
        d="M63.45 26.58L20.63 1.86a1 1 0 00-1.01-.1l-3.98 2.3a1 1 0 011.02.1l42.82 24.72a3.15 3.15 0 011.42 2.46l-.1 36.09a1 1 0 01-.42.9l3.97-2.3a1 1 0 00.42-.9l.1-36.08a3.15 3.15 0 00-1.42-2.47z"
      />
      <path
        fill={`url(#${gradientIds['icon--notification--linear-gradient-6']})`}
        d="M59.48 28.88a3.15 3.15 0 011.42 2.46l-.1 36.09c0 .9-.65 1.26-1.42.81l-26.7-15.4-2.26 4.23a.9.9 0 01-1.33.27 3.09 3.09 0 01-1.22-1.53l-2.33-7.09-9-5.2a3.14 3.14 0 01-1.42-2.46l.1-36.08c0-.9.64-1.28 1.43-.82z"
      />
      <path
        fill={`url(#${gradientIds['icon--notification--linear-gradient-7']})`}
        d="M59.48 28.88a3.15 3.15 0 011.42 2.46l-.1 36.09c0 .9-.65 1.26-1.42.81l-26.7-15.4-2.26 4.23a.9.9 0 01-1.33.27 3.09 3.09 0 01-1.22-1.53l-2.33-7.09-9-5.2a3.14 3.14 0 01-1.42-2.46l.1-36.08c0-.9.64-1.28 1.43-.82z"
      />
      <path
        fill={`url(#${gradientIds['icon--notification--linear-gradient-6']})`}
        d="M59.48 28.88a3.15 3.15 0 011.42 2.46l-.1 36.09c0 .9-.65 1.26-1.42.81l-26.7-15.4-2.26 4.23a.9.9 0 01-1.33.27 3.09 3.09 0 01-1.22-1.53l-2.33-7.09-9-5.2a3.14 3.14 0 01-1.42-2.46l.1-36.08c0-.9.64-1.28 1.43-.82z"
      />
      <path
        fill={`url(#${gradientIds['icon--notification--linear-gradient-2']})`}
        d="M57.99 37.07l-.01 3.9L18.03 17.9l.01-3.9 39.95 23.07z"
      />
      <path
        fill={`url(#${gradientIds['icon--notification--linear-gradient-8']})`}
        d="M57.99 45.11l-.01 3.91-39.95-23.07.01-3.9 39.95 23.06z"
      />
      <path
        fill={`url(#${gradientIds['icon--notification--linear-gradient-9']})`}
        d="M44.62 45.04l-.01 3.9L18.03 33.6l.01-3.9 26.58 15.34z"
      />
      <path
        fill={`url(#${gradientIds['icon--notification--linear-gradient-10']})`}
        d="M60.76 30.55a2.5 2.5 0 01.14.8v3.95a3.98 3.98 0 01.4-.13l.01-3.82a3.54 3.54 0 00-1.62-2.82L16.86 3.8a1.98 1.98 0 00-.44-.2l-.78.46.03-.01a.72.72 0 01.18-.07h.02a.82.82 0 01.15-.02h.1a1.09 1.09 0 01.23.06l.04.01a1.65 1.65 0 01.27.12l21.4 12.37 21.42 12.36a3.15 3.15 0 011.28 1.67z"
      />
    </svg>
  );
}

function darkNotification(id, className) {
  const gradientIds = sanitizeIds(
    [
      'icon--notification--linear-gradient',
      'icon--notification--linear-gradient-2',
      'icon--notification--linear-gradient-3',
      'icon--notification--linear-gradient-4',
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
          id={gradientIds['icon--notification--linear-gradient']}
          x1="30.05"
          x2="35.5"
          y1="54.31"
          y2="54.31"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#161616" />
          <stop offset="1" stopColor="#262626" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--notification--linear-gradient-2']}
          x1="28.61"
          x2="70.69"
          y1="-3.97"
          y2="68.92"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#525252" />
          <stop offset=".52" stopColor="#393939" />
          <stop offset=".61" stopColor="#393939" />
          <stop offset="1" stopColor="#161616" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--notification--linear-gradient-3']}
          x1="38.01"
          x2="38.01"
          y1="69.51"
          y2="-.42"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#262626" />
          <stop offset="1" stopColor="#393939" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--notification--linear-gradient-4']}
          x1="15.14"
          x2="63.06"
          y1="5.72"
          y2="33.52"
          gradientUnits="userSpaceOnUse">
          <stop offset=".78" stopColor="#6f6f6f" />
          <stop offset=".81" stopColor="#6c6c6c" stopOpacity=".96" />
          <stop offset=".85" stopColor="#636363" stopOpacity=".84" />
          <stop offset=".89" stopColor="#545454" stopOpacity=".64" />
          <stop offset=".93" stopColor="#404040" stopOpacity=".35" />
          <stop offset=".97" stopColor="#262626" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M15.13 52.11l45.5 26.28 4.25-2.51L19.4 49.63l-4.27 2.48z"
        opacity=".25"
      />
      <path
        fill={`url(#${gradientIds['icon--notification--linear-gradient']})`}
        d="M32.66 52.85l-2.25 4.22a1.14 1.14 0 01-.36.35l2.83-1.65a1.15 1.15 0 00.36-.35l2.26-4.22z"
      />
      <path
        fill={`url(#${gradientIds['icon--notification--linear-gradient-2']})`}
        d="M63.45 26.58L20.63 1.86a1 1 0 00-1.01-.1l-3.98 2.3a1 1 0 011.02.1l42.82 24.72a3.15 3.15 0 011.42 2.46l-.1 36.09a1 1 0 01-.42.9l3.97-2.3a1 1 0 00.42-.9l.1-36.08a3.15 3.15 0 00-1.42-2.47z"
      />
      <path
        fill={`url(#${gradientIds['icon--notification--linear-gradient-3']})`}
        d="M59.48 28.88a3.15 3.15 0 011.42 2.46l-.1 36.09c0 .9-.65 1.26-1.42.81l-26.7-15.4-2.26 4.23a.9.9 0 01-1.33.27 3.09 3.09 0 01-1.22-1.53l-2.33-7.09-9-5.2a3.14 3.14 0 01-1.42-2.46l.1-36.08c0-.9.64-1.28 1.43-.82z"
      />
      <path
        fill="#525252"
        d="M57.99 37.07l-.01 3.9L18.03 17.9l.01-3.9 39.95 23.07zM57.99 45.11l-.01 3.91-39.95-23.07.01-3.9 39.95 23.06zM44.62 45.04l-.01 3.9L18.03 33.6l.01-3.9 26.58 15.34z"
      />
      <path
        fill={`url(#${gradientIds['icon--notification--linear-gradient-4']})`}
        d="M60.76 30.55a2.5 2.5 0 01.14.8v3.95a3.98 3.98 0 01.4-.13l.01-3.82a3.54 3.54 0 00-1.62-2.82L16.86 3.8a1.98 1.98 0 00-.44-.2l-.78.46.03-.01a.72.72 0 01.18-.07h.02a.82.82 0 01.15-.02h.1a1.09 1.09 0 01.23.06l.04.01a1.65 1.65 0 01.27.12l21.4 12.37 21.42 12.36a3.15 3.15 0 011.28 1.67z"
      />
    </svg>
  );
}

const Notification = ({ id, className }) => {
  const theme = useThemePreference();

  if (theme === themes.dark) {
    return darkNotification(id, className);
  }

  return lightNotification(id, className);
};

Notification.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
};

export default Notification;
