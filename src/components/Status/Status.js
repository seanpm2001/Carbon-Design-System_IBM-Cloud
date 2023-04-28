import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import {
  CheckmarkFilled as CheckmarkFilled16,
  WarningFilled as WarningFilled16,
  ErrorFilled as ErrorFilled16,
  Information as Information16,
} from "@carbon/react/icons";
import { Tooltip } from "@carbon/react";
import Skeleton from "./skeleton";
import { useTranslation } from "react-i18next";

// The transition state is similar enough to the inline loading indicator that
// we can use the same class names to get the style, but the icon itself is a
// different size and styled just a bit differently.
const transitionIcon = (
  <svg
    className="cds--loading__svg"
    viewBox="-33 -33 66 66"
    aria-hidden="true"
    focusable="false"
  >
    <circle
      className="cds--loading__background"
      cx="0"
      cy="0"
      r="26.8125"
    ></circle>
  </svg>
);
const transitionStatus = (
  <div className="cds--inline-loading" aria-live="assertive">
    <div className="cds--inline-loading__animation">
      <div
        aria-atomic="true"
        aria-live="assertive"
        className="cds--loading cds--loading--small"
      >
        {transitionIcon}
      </div>
    </div>
  </div>
);

const Color = {
  BLUE: "blue",
  GRAY: "gray",
  GREEN: "green",
  RED: "red",
  YELLOW: "yellow",
};

export const StatusType = {
  BLANK: "",
  CRITICAL: "critical",
  CUSTOM: "custom",
  HEALTHY: "healthy",
  SUCCESS: "success",
  FAILURE: "failure",
  UNKNOWN: "unknown",
  WARNING: "warning",
  INACTIVE: "inactive",
  TRANSITION: "transition",
  TRANSITION_STATIC: "transition_static",
};

export function getStatusColor(status) {
  switch (status) {
    case StatusType.HEALTHY:
    case StatusType.SUCCESS:
      return Color.GREEN;
    case StatusType.CRITICAL:
    case StatusType.FAILURE:
      return Color.RED;
    case StatusType.WARNING:
      return Color.YELLOW;
    case StatusType.CUSTOM:
      return Color.BLUE;
    case StatusType.INACTIVE:
    default:
      return Color.GRAY;
  }
}

export function renderStatus(status) {
  if (status === "transition" || status === "transition_static") {
    return transitionStatus;
  }
  if (status === "unknown" || status === "") {
    return (
      <div className="pal--status__circle--unknown">
        <div />
      </div>
    );
  }

  const statusColorClasses = classnames(
    // 'pal--status__circle',
    `pal--status__circle--${getStatusColor(status)}`
  );
  const circleClasses = classnames(
    "pal--status__circle",
    `pal--status__circle--${getStatusColor(status)}`
  );
  if (status === "healthy" || status === "success") {
    return <CheckmarkFilled16 className={statusColorClasses} />;
  }
  if (status === "warning") {
    return <WarningFilled16 className={statusColorClasses} />;
  }
  if (status === "critical" || status === "failure") {
    return <ErrorFilled16 className={statusColorClasses} />;
  }
  return <div className={circleClasses} />;
}

const Status = ({ className, label, status, tooltipMsg }) => {
  const { t } = useTranslation("Status");

  const classes = classnames("pal--status", className);

  return (
    <div className={classes} data-status={status}>
      {renderStatus(status)}
      <div className="pal--status__label">{label}</div>
      {tooltipMsg && (
        <Tooltip
        iconDescription={t("infoIconDescription")}
        label={typeof tooltipMsg === "string" ? <p>{tooltipMsg}</p> : tooltipMsg}
        align='bottom'
      >
        <button type='button' className="pal--status__tooltip-trigger"> 
          <Information16 />
        </button>
      </Tooltip>
      )}
    </div>
  );
};

Status.defaultProps = {
  className: "",
  label: "",
  status: "",
  // locale: documentLanguage,
  tooltipMsg: "",
};

Status.propTypes = {
  className: PropTypes.string,
  status: PropTypes.oneOf([
    StatusType.BLANK,
    StatusType.CRITICAL,
    StatusType.CUSTOM,
    StatusType.FAILURE,
    StatusType.HEALTHY,
    StatusType.INACTIVE,
    StatusType.SUCCESS,
    StatusType.TRANSITION,
    StatusType.TRANSITION_STATIC,
    StatusType.UNKNOWN,
    StatusType.WARNING,
  ]),
  label: PropTypes.string,
  locale: PropTypes.string,
  tooltipMsg: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

Status.skeleton = Skeleton;
export default Status;
