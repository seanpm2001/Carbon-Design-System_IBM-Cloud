import React from "react";
import PropTypes from "prop-types";
import { Tile } from "@carbon/react";
import useThemePreference from "../../Utilities/useThemePreference";

import { ReactComponent as ERROR_BLUE } from "./icons/error--blue.svg";
import { ReactComponent as ERROR_GRAY } from "./icons/error--gray.svg";
import { ReactComponent as SUPPORT_BLUE } from "./icons/support--blue.svg";
import { ReactComponent as SUPPORT_GRAY } from "./icons/support--gray.svg";
import { ReactComponent as USAGE_BLUE } from "./icons/usage--blue.svg";
import { ReactComponent as USAGE_GRAY } from "./icons/usage--gray.svg";

// Dark mode icons
import { ReactComponent as ERROR_DARK_BLUE } from "./icons/error--dark-blue.svg";
import { ReactComponent as ERROR_DARK_GRAY } from "./icons/error--dark-gray.svg";
import { ReactComponent as SUPPORT_DARK_BLUE } from "./icons/support--dark-blue.svg";
import { ReactComponent as SUPPORT_DARK_GRAY } from "./icons/support--dark-gray.svg";
import { ReactComponent as USAGE_DARK_BLUE } from "./icons/usage--dark-blue.svg";
import { ReactComponent as USAGE_DARK_GRAY } from "./icons/usage--dark-gray.svg";

const MessageV2 = ({ icon, tileWrapped, text, caption }) => {
  const iconMap = {
    themeLight: {
      ERROR: {
        BLUE: ERROR_BLUE,
        GRAY: ERROR_GRAY,
      },
      SUPPORT: {
        BLUE: SUPPORT_BLUE,
        GRAY: SUPPORT_GRAY,
      },
      USAGE: {
        BLUE: USAGE_BLUE,
        GRAY: USAGE_GRAY,
      },
    },
    themeDark: {
      ERROR: {
        BLUE: ERROR_DARK_BLUE,
        GRAY: ERROR_DARK_GRAY,
      },
      SUPPORT: {
        BLUE: SUPPORT_DARK_BLUE,
        GRAY: SUPPORT_DARK_GRAY,
      },
      USAGE: {
        BLUE: USAGE_DARK_BLUE,
        GRAY: USAGE_DARK_GRAY,
      },
    },
  };

  const theme = useThemePreference();

  const Icon = iconMap[theme][icon.name][icon.color];

  const Content = () => (
    <>
      <Icon
        id={Math.random()}
        key={Math.random()}
        className="pal--message-v2__icon"
      />
      <div className="pal--message-v2__content">
        <p className="pal--message-v2__text">{text}</p>
        {caption && <p className="pal--message-v2__caption">{caption}</p>}
      </div>
    </>
  );

  if (!tileWrapped) {
    return (
      <div className="pal--message-v2__container">
        <Content />
      </div>
    );
  }

  return (
    <div className="pal--message-v2__container">
      <Tile>
        <Content />
      </Tile>
    </div>
  );
};

MessageV2.propTypes = {
  icon: PropTypes.shape({
    color: PropTypes.oneOf(["BLUE", "GRAY"]),
    name: PropTypes.oneOf(["ERROR", "USAGE", "SUPPORT"]),
  }),
  tileWrapped: PropTypes.bool,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  caption: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

MessageV2.defaultProps = {
  icon: {
    name: "ERROR",
    color: "GRAY",
  },
  tileWrapped: true,
  caption: null,
};

export default MessageV2;
