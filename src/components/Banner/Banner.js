import React, { useState } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { Close } from "@carbon/react/icons";
import { useTranslation } from "react-i18next";

import Skeleton from "./skeleton";

const Banner = ({
  // locale,
  children,
  withGradient,
  dismissible,
  closeButtonLabel,
}) => {
  const { t } = useTranslation("Banner");
  const [dismissed, setDismissed] = useState(false);

  const closeButtonLabelText = closeButtonLabel || t("close");
  return (
    !dismissed && (
      <div
        className={classnames("pal--banner", {
          "pal--banner--with-gradient": withGradient,
        })}
      >
        <div className="pal--banner__children-container">{children}</div>
        {dismissible && (
          <button
            className="pal--banner__close-button"
            type="button"
            title={closeButtonLabelText}
            aria-label={closeButtonLabelText}
            onClick={() => setDismissed(true)}
          >
            <Close />
          </button>
        )}
      </div>
    )
  );
};

Banner.propTypes = {
  /**
   * The locale used for translating the strings.
   */
  // locale: PropTypes.string,
  children: PropTypes.node.isRequired,
  withGradient: PropTypes.bool,
  dismissible: PropTypes.bool,
  closeButtonLabel: PropTypes.string,
};

Banner.defaultProps = {
  // locale: documentLanguage,
  withGradient: false,
  dismissible: false,
  closeButtonLabel: null,
};

Banner.skeleton = Skeleton;

export default Banner;
