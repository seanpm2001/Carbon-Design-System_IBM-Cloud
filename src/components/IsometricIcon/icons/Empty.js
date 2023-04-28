import React from "react";
import PropTypes from "prop-types";

import useThemePreference, {
  themes,
} from "../../../utilities/useThemePreference/useThemePreference";
import sanitizeIds from "../../../utils/sanitizeIds";

function lightEmpty(id, className) {
  const gradientIds = sanitizeIds(
    [
      "icon--empty--linear-gradient",
      "icon--empty--linear-gradient-2",
      "icon--empty--linear-gradient-3",
      "icon--empty--linear-gradient-4",
    ],
    id
  );
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      viewBox="0 0 80 80"
    >
      <defs>
        <linearGradient
          id={gradientIds["icon--empty--linear-gradient"]}
          x1="18.35"
          x2="61.65"
          y1="74.17"
          y2="49.17"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#525252" stopOpacity=".05" />
          <stop offset="1" stopOpacity=".1" />
        </linearGradient>
        <linearGradient
          id={gradientIds["icon--empty--linear-gradient-2"]}
          x1="15.16"
          x2="40.31"
          y1="43.34"
          y2="43.34"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#e0e0e0" />
          <stop offset="1" stopColor="#c6c6c6" />
        </linearGradient>
        <linearGradient
          id={gradientIds["icon--empty--linear-gradient-3"]}
          x1="40"
          x2="68.88"
          y1="43.34"
          y2="43.34"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#a8a8a8" />
          <stop offset="1" stopColor="#c6c6c6" />
        </linearGradient>
        <linearGradient
          id={gradientIds["icon--empty--linear-gradient-4"]}
          x1="18.35"
          x2="61.65"
          y1="30.83"
          y2="5.83"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#f4f4f4" />
          <stop offset="1" stopColor="#e0e0e0" />
        </linearGradient>
      </defs>
      <path
        fill={`url(#${gradientIds["icon--empty--linear-gradient"]})`}
        d="M40 78.34L11.13 61.67 40 45.01l28.86 16.66L40 78.34z"
      />
      <path
        fill={`url(#${gradientIds["icon--empty--linear-gradient-2"]})`}
        d="M40 68.35L11.12 51.68l.01-33.35L40 34.99v33.36z"
      />
      <path
        fill={`url(#${gradientIds["icon--empty--linear-gradient-3"]})`}
        d="M68.88 51.68L40 68.35V35l28.87-16.67v33.35z"
      />
      <path
        fill={`url(#${gradientIds["icon--empty--linear-gradient-4"]})`}
        d="M40 35L11.13 18.32 40 1.66l28.87 16.67L40 34.99z"
      />
      <path
        fill="#c6c6c6"
        d="M25.97 26.67l28.67-16.55-.42-.24-28.68 16.56.43.23z"
      />
      <path
        fill="#fff"
        d="M40 35.24L11.13 18.57v-.24l.21-.12 28.87 16.66L40 35v.24zM21.5 33.33l-8.2-4.73v-5.69l8.2 4.74v5.68z"
      />
    </svg>
  );
}

function darkEmpty(id, className) {
  const gradientIds = sanitizeIds(
    [
      "icon--empty--linear-gradient",
      "icon--empty--linear-gradient-2",
      "icon--empty--linear-gradient-3",
    ],
    id
  );
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 80"
    >
      <defs>
        <linearGradient
          id={gradientIds["icon--empty--linear-gradient"]}
          x1="11.12"
          x2="40"
          y1="43.34"
          y2="43.34"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#393939" />
          <stop offset="1" stopColor="#262626" />
        </linearGradient>
        <linearGradient
          id={gradientIds["icon--empty--linear-gradient-2"]}
          x1="40"
          x2="68.88"
          y1="43.34"
          y2="43.34"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#161616" />
          <stop offset="1" stopColor="#262626" />
        </linearGradient>
        <linearGradient
          id={gradientIds["icon--empty--linear-gradient-3"]}
          x1="32.78"
          x2="47.22"
          y1="30.83"
          y2="5.83"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#525252" />
          <stop offset="1" stopColor="#393939" />
        </linearGradient>
      </defs>
      <path
        d="M40 78.34L11.13 61.67 40 45.01l28.86 16.66L40 78.34z"
        opacity=".25"
      />
      <path
        fill={`url(#${gradientIds["icon--empty--linear-gradient"]})`}
        d="M40 68.35L11.12 51.68l.01-33.35L40 34.99v33.36z"
      />
      <path
        fill={`url(#${gradientIds["icon--empty--linear-gradient-2"]})`}
        d="M68.88 51.68L40 68.35V35l28.87-16.67v33.35z"
      />
      <path
        fill={`url(#${gradientIds["icon--empty--linear-gradient-3"]})`}
        d="M40 35L11.13 18.32 40 1.66l28.87 16.67L40 34.99z"
      />
      <path
        fill="#262626"
        d="M25.97 26.67l28.67-16.55-.42-.24-28.68 16.56.43.23z"
      />
      <path
        fill="#6f6f6f"
        d="M40 35.24L11.13 18.57v-.24l.21-.12 28.87 16.66L40 35v.24z"
      />
      <path fill="#525252" d="M21.5 33.33l-8.2-4.73v-5.69l8.2 4.74v5.68z" />
    </svg>
  );
}

const Empty = ({ id, className }) => {
  const theme = useThemePreference();

  if (theme === themes.dark) {
    return darkEmpty(id, className);
  }

  return lightEmpty(id, className);
};

Empty.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
};

export default Empty;
