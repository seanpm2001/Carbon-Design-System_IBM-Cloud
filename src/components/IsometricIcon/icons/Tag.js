import React from 'react';
import PropTypes from 'prop-types';
import useThemePreference, {
  themes,
} from '../../../utilities/useThemePreference/useThemePreference';
import sanitizeIds from '../../../utils/sanitizeIds';

function lightTag(id, className) {
  const gradientIds = sanitizeIds(
    [
      'icon--tag--linear-gradient',
      'icon--tag--linear-gradient-2',
      'icon--tag--linear-gradient-3',
      'icon--tag--linear-gradient-4',
      'icon--tag--linear-gradient-5',
      'icon--tag--linear-gradient-6',
      'icon--tag--linear-gradient-7',
      'icon--tag--linear-gradient-8',
      'icon--tag--linear-gradient-9',
      'icon--tag--linear-gradient-10',
    ],
    id
  );

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 80 80">
      <defs>
        <linearGradient
          id={gradientIds['icon--tag--linear-gradient-2']}
          x1="634.82"
          x2="644.85"
          y1="667.18"
          y2="684.56"
          gradientTransform="matrix(.866 .5 -1 .577 161.5 -640.11)"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#525252" stopOpacity=".05" />
          <stop offset="1" stopOpacity=".1" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--tag--linear-gradient-3']}
          x1="29.21"
          x2="56.14"
          y1="7.75"
          y2="23.3"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f4f4f4" />
          <stop offset=".78" stopColor="#e0e0e0" />
          <stop offset="1" stopColor="#c6c6c6" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--tag--linear-gradient-4']}
          x1="45.47"
          x2="55.21"
          y1="46.54"
          y2="46.54"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#a8a8a8" />
          <stop offset="1" stopColor="#c6c6c6" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--tag--linear-gradient-5']}
          x1="38.25"
          x2="38.25"
          y1="59.31"
          y2="2.99"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#c6c6c6" />
          <stop offset=".78" stopColor="#e0e0e0" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--tag--linear-gradient-6']}
          x1="28.77"
          x2="48.15"
          y1="9.54"
          y2="40.79"
          gradientUnits="userSpaceOnUse">
          <stop offset=".42" stopColor="#fff" />
          <stop offset=".48" stopColor="#fff" stopOpacity=".99" />
          <stop offset=".53" stopColor="#fdfdfd" stopOpacity=".96" />
          <stop offset=".56" stopColor="#fafafa" stopOpacity=".9" />
          <stop offset=".59" stopColor="#f6f6f6" stopOpacity=".82" />
          <stop offset=".62" stopColor="#f2f2f2" stopOpacity=".71" />
          <stop offset=".65" stopColor="#ebebeb" stopOpacity=".58" />
          <stop offset=".67" stopColor="#e4e4e4" stopOpacity=".43" />
          <stop offset=".7" stopColor="#dcdcdc" stopOpacity=".25" />
          <stop offset=".72" stopColor="#d3d3d3" stopOpacity=".06" />
          <stop offset=".73" stopColor="#d0d0d0" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--tag--linear-gradient']}
          x1="51.28"
          x2="51.34"
          y1="68.32"
          y2="68.36"
          gradientUnits="userSpaceOnUse">
          <stop offset=".87" stopColor="#fff" />
          <stop offset=".89" stopColor="#fefefe" stopOpacity=".98" />
          <stop offset=".9" stopColor="#fcfcfc" stopOpacity=".93" />
          <stop offset=".92" stopColor="#f8f8f8" stopOpacity=".84" />
          <stop offset=".94" stopColor="#f2f2f2" stopOpacity=".72" />
          <stop offset=".95" stopColor="#eaeaea" stopOpacity=".56" />
          <stop offset=".97" stopColor="#e1e1e1" stopOpacity=".37" />
          <stop offset=".99" stopColor="#d7d7d7" stopOpacity=".14" />
          <stop offset="1" stopColor="#d0d0d0" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--tag--linear-gradient-7']}
          x1="51.09"
          x2="51.22"
          y1="68.25"
          y2="68.33"
          xlinkHref={`#${gradientIds['icon--tag--linear-gradient']}`}
        />
        <linearGradient
          id={gradientIds['icon--tag--linear-gradient-8']}
          x1="51.41"
          x2="51.46"
          y1="68.32"
          y2="68.35"
          xlinkHref={`#${gradientIds['icon--tag--linear-gradient']}`}
        />
        <linearGradient
          id={gradientIds['icon--tag--linear-gradient-9']}
          x1="33.94"
          x2="42.79"
          y1="19.46"
          y2="19.46"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#a4a4a4" />
          <stop offset="1" stopColor="#8c8c8c" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--tag--linear-gradient-10']}
          x1="35.3"
          x2="38.85"
          y1="23.46"
          y2="17.31"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#fff" />
          <stop offset=".04" stopColor="#fdfdfd" stopOpacity=".95" />
          <stop offset=".13" stopColor="#f7f7f7" stopOpacity=".84" />
          <stop offset=".23" stopColor="#eee" stopOpacity=".64" />
          <stop offset=".36" stopColor="#e2e2e2" stopOpacity=".38" />
          <stop offset=".5" stopColor="#d2d2d2" stopOpacity=".04" />
          <stop offset=".52" stopColor="#d0d0d0" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientIds['icon--tag--linear-gradient-2']})`}
        d="M51.59 78.34l-26.8-15.48 3.62-2.09 26.8 15.48-3.62 2.09z"
      />
      <path
        fill={`url(#${gradientIds['icon--tag--linear-gradient-3']})`}
        d="M45.47 30.38l6.58-3.76 3.12-1.85a1.33 1.33 0 01.03.15 1.37 1.37 0 00-.17-.47L42.2 2.21c-.24-.42-.64-.65-.88-.5L28.47 9.1a.44.44 0 00-.18.4l13.88 3.02a1.37 1.37 0 00.62 1.08z"
      />
      <path
        fill={`url(#${gradientIds['icon--tag--linear-gradient-4']})`}
        d="M55.03 66.29a.43.43 0 00.18-.4V25.06a1.07 1.07 0 00-.04-.29l-3.12 1.85-6.58 3.76 6.07 37.92 3.49-2.01z"
      />
      <path
        fill={`url(#${gradientIds['icon--tag--linear-gradient-5']})`}
        d="M51.53 26.47L38.69 4.23c-.25-.42-.64-.64-.88-.5l-12.84 7.4a.44.44 0 00-.18.4v40.83a1.37 1.37 0 00.62 1.07l25.68 14.83c.34.2.62.04.62-.36V27.08a1.27 1.27 0 00-.18-.6zm-14.45-2.46a6.93 6.93 0 01-3.14-5.44c0-2 1.4-2.8 3.14-1.8a6.93 6.93 0 013.13 5.43c0 2-1.4 2.8-3.13 1.8z"
      />
      <path
        fill={`url(#${gradientIds['icon--tag--linear-gradient-6']})`}
        d="M39.05 4.02a1.64 1.64 0 00-.64-.64l-.6.34a.32.32 0 01.16-.04.97.97 0 01.72.55l12.84 22.24a1.27 1.27 0 01.18.61V67.9a.43.43 0 01-.18.4h.01l.58-.34V27.08a1.68 1.68 0 00-.23-.82z"
      />
      <path
        fill={`url(#${gradientIds['icon--tag--linear-gradient']})`}
        d="M51.28 68.33a.46.46 0 00.07.01.46.46 0 01-.07 0z"
      />
      <path
        fill={`url(#${gradientIds['icon--tag--linear-gradient-7']})`}
        d="M51.23 68.32a.72.72 0 01-.14-.06.72.72 0 00.13.06z"
      />
      <path
        fill={`url(#${gradientIds['icon--tag--linear-gradient-8']})`}
        d="M51.48 68.32a.3.3 0 01-.08.02.34.34 0 00.08-.02z"
      />
      <path
        fill={`url(#${gradientIds['icon--tag--linear-gradient-9']})`}
        d="M39.66 22.17a6.93 6.93 0 01-3.14-5.44l.02-.21c-1.48-.56-2.6.27-2.6 2.05a6.93 6.93 0 003.14 5.44c1.66.96 3 .23 3.11-1.6a3.44 3.44 0 01-.53-.24z"
      />
      <path
        fill={`url(#${gradientIds['icon--tag--linear-gradient-10']})`}
        d="M35.67 16.33a2.85 2.85 0 011.4.43 6.93 6.93 0 013.14 5.44c0 1.42-.7 2.24-1.73 2.24a2.85 2.85 0 01-1.4-.43 6.93 6.93 0 01-3.14-5.43c0-1.42.7-2.24 1.74-2.24m0-.42c-1.31 0-2.16 1.04-2.16 2.66a7.3 7.3 0 003.35 5.8 3.24 3.24 0 001.6.48c1.32 0 2.16-1.05 2.16-2.66a7.3 7.3 0 00-3.35-5.8 3.23 3.23 0 00-1.6-.48z"
      />
    </svg>
  );
}

function darkTag(id, className) {
  const gradientIds = sanitizeIds(
    [
      'icon--tag--linear-gradient',
      'icon--tag--linear-gradient-2',
      'icon--tag--linear-gradient-3',
      'icon--tag--linear-gradient-4',
      'icon--tag--linear-gradient-5',
      'icon--tag--linear-gradient-6',
      'icon--tag--linear-gradient-7',
      'icon--tag--linear-gradient-8',
      'icon--tag--linear-gradient-9',
      'icon--tag--linear-gradient-10',
    ],
    id
  );

  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 80 80">
      <defs>
        <linearGradient
          id={gradientIds['icon--tag--linear-gradient-3']}
          x1="34.96"
          x2="48.48"
          y1="5.37"
          y2="28.8"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#525252" />
          <stop offset="1" stopColor="#393939" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--tag--linear-gradient']}
          x1="45.47"
          x2="55.21"
          y1="46.54"
          y2="46.54"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#262626" />
          <stop offset="1" stopColor="#393939" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--tag--linear-gradient-4']}
          x1="38.25"
          x2="38.25"
          y1="70.94"
          y2="-3.31"
          xlinkHref={`#${gradientIds['icon--tag--linear-gradient']}`}
        />
        <linearGradient
          id={gradientIds['icon--tag--linear-gradient-5']}
          x1="28.77"
          x2="48.15"
          y1="9.54"
          y2="40.79"
          gradientUnits="userSpaceOnUse">
          <stop offset=".42" stopColor="#6f6f6f" />
          <stop offset=".51" stopColor="#6e6e6e" stopOpacity=".98" />
          <stop offset=".56" stopColor="#6c6c6c" stopOpacity=".9" />
          <stop offset=".61" stopColor="#686868" stopOpacity=".77" />
          <stop offset=".65" stopColor="#636363" stopOpacity=".58" />
          <stop offset=".69" stopColor="#5c5c5c" stopOpacity=".34" />
          <stop offset=".72" stopColor="#545454" stopOpacity=".05" />
          <stop offset=".73" stopColor="#525252" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--tag--linear-gradient-2']}
          x1="51.28"
          x2="51.34"
          y1="68.32"
          y2="68.36"
          gradientUnits="userSpaceOnUse">
          <stop offset=".87" stopColor="#fff" />
          <stop offset=".89" stopColor="#fefefe" stopOpacity=".98" />
          <stop offset=".9" stopColor="#fcfcfc" stopOpacity=".93" />
          <stop offset=".92" stopColor="#f8f8f8" stopOpacity=".84" />
          <stop offset=".94" stopColor="#f2f2f2" stopOpacity=".72" />
          <stop offset=".95" stopColor="#eaeaea" stopOpacity=".56" />
          <stop offset=".97" stopColor="#e1e1e1" stopOpacity=".37" />
          <stop offset=".99" stopColor="#d7d7d7" stopOpacity=".14" />
          <stop offset="1" stopColor="#d0d0d0" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--tag--linear-gradient-6']}
          x1="51.09"
          x2="51.22"
          y1="68.25"
          y2="68.33"
          xlinkHref={`#${gradientIds['icon--tag--linear-gradient-2']}`}
        />
        <linearGradient
          id={gradientIds['icon--tag--linear-gradient-7']}
          x1="51.41"
          x2="51.46"
          y1="68.32"
          y2="68.35"
          xlinkHref={`#${gradientIds['icon--tag--linear-gradient-2']}`}
        />
        <linearGradient
          id={gradientIds['icon--tag--linear-gradient-8']}
          x1="33.94"
          x2="42.79"
          y1="119.47"
          y2="119.47"
          gradientTransform="translate(0 -100)"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#262626" />
          <stop offset="1" stopColor="#161616" />
        </linearGradient>
        <linearGradient
          id={gradientIds['icon--tag--linear-gradient-9']}
          x1="35.3"
          x2="38.85"
          y1="23.46"
          y2="17.31"
          gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#6f6f6f" />
          <stop offset=".09" stopColor="#6f6f6f" stopOpacity=".9" />
          <stop offset=".24" stopColor="#6f6f6f" stopOpacity=".63" />
          <stop offset=".44" stopColor="#6f6f6f" stopOpacity=".19" />
          <stop offset=".52" stopColor="#6f6f6f" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M51.59 78.34l-26.8-15.48 3.62-2.09 26.8 15.48-3.62 2.09z"
        opacity=".25"
      />
      <path
        fill={`url(#${gradientIds['icon--tag--linear-gradient-3']})`}
        d="M45.47 30.38l6.58-3.76 3.12-1.85a1.33 1.33 0 01.03.15 1.37 1.37 0 00-.17-.47L42.2 2.21c-.24-.42-.64-.65-.88-.5L28.47 9.1a.44.44 0 00-.18.4l13.88 3.02a1.37 1.37 0 00.62 1.08z"
      />
      <path
        fill={`url(#${gradientIds['icon--tag--linear-gradient']})`}
        d="M55.03 66.29a.43.43 0 00.18-.4V25.06a1.07 1.07 0 00-.04-.29l-3.12 1.85-6.58 3.76 6.07 37.92 3.49-2.01z"
      />
      <path
        fill={`url(#${gradientIds['icon--tag--linear-gradient-4']})`}
        d="M51.53 26.47L38.69 4.23c-.25-.42-.64-.64-.88-.5l-12.84 7.4a.44.44 0 00-.18.4v40.83a1.37 1.37 0 00.62 1.07l25.68 14.83c.34.2.62.04.62-.36V27.08a1.27 1.27 0 00-.18-.6zm-14.45-2.46a6.93 6.93 0 01-3.14-5.44c0-2 1.4-2.8 3.14-1.8a6.93 6.93 0 013.13 5.43c0 2-1.4 2.8-3.13 1.8z"
      />
      <path
        fill={`url(#${gradientIds['icon--tag--linear-gradient-5']})`}
        d="M39.05 4.02a1.64 1.64 0 00-.64-.64l-.6.34a.32.32 0 01.16-.04.97.97 0 01.72.55l12.84 22.24a1.27 1.27 0 01.18.61V67.9a.43.43 0 01-.18.4h.01l.58-.34V27.08a1.68 1.68 0 00-.23-.82z"
      />
      <path
        fill={`url(#${gradientIds['icon--tag--linear-gradient-2']})`}
        d="M51.28 68.33a.46.46 0 00.07.01.46.46 0 01-.07 0z"
      />
      <path
        fill={`url(#${gradientIds['icon--tag--linear-gradient-6']})`}
        d="M51.23 68.32a.72.72 0 01-.14-.06.72.72 0 00.13.06z"
      />
      <path
        fill={`url(#${gradientIds['icon--tag--linear-gradient-7']})`}
        d="M51.48 68.32a.3.3 0 01-.08.02.34.34 0 00.08-.02z"
      />
      <path
        fill={`url(#${gradientIds['icon--tag--linear-gradient-8']})`}
        d="M39.66 22.17a6.93 6.93 0 01-3.14-5.44l.02-.21c-1.48-.56-2.6.27-2.6 2.05a6.93 6.93 0 003.14 5.44c1.66.96 3 .23 3.11-1.6a3.44 3.44 0 01-.53-.24z"
      />
      <path
        fill={`url(#${gradientIds['icon--tag--linear-gradient-9']})`}
        d="M35.67 16.33a2.85 2.85 0 011.4.43 6.93 6.93 0 013.14 5.44c0 1.42-.7 2.24-1.73 2.24a2.85 2.85 0 01-1.4-.43 6.93 6.93 0 01-3.14-5.43c0-1.42.7-2.24 1.74-2.24m0-.42c-1.31 0-2.16 1.04-2.16 2.66a7.3 7.3 0 003.35 5.8 3.24 3.24 0 001.6.48c1.32 0 2.16-1.05 2.16-2.66a7.3 7.3 0 00-3.35-5.8 3.23 3.23 0 00-1.6-.48z"
      />
    </svg>
  );
}

const Tag = ({ id, className }) => {
  const theme = useThemePreference();

  if (theme === themes.dark) {
    return darkTag(id, className);
  }

  return lightTag(id, className);
};

Tag.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
};

export default Tag;
