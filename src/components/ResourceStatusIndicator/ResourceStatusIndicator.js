import classnames from "classnames";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
// Carbon Components
/* Import all Carbon Components Here */
import {
  CheckmarkFilled,
  ErrorFilled,
  InProgress,
  Incomplete
} from "@carbon/react/icons";
import inactiveIcon from "./utils/inactiveIcon";
import infoIcon from "./utils/infoIcon";
// Skeleton
import Skeleton from "./skeleton";

const segmentedBar = (segments, value, fatalError, kind) => {
  if (kind === "indeterminate") {
    return (
      <div
        className="pal--resource-status-indicator__section"
        data-status="indeterminate-green"
        style={{ flexBasis: `100%` }}
      >
        <div
          className="pal--resource-status-indicator__section__fill"
          style={{ width: `100%` }}
        />
      </div>
    );
  }
  return segments.map((segment, i) => {
    const nextThreshold =
      i === segments.length - 1 ? 100 : segments[i + 1].value;
    let status = value < nextThreshold ? "indeterminate-green" : "green";
    if (value < segment.value) status = "";
    if (fatalError || segment.error) status = "red";
    const width = status === "" ? 0 : 100;
    return (
      <div
        className="pal--resource-status-indicator__section"
        key={`segment-${segment.value}`}
        data-status={status}
        style={{ flexBasis: `${nextThreshold - segment.value}%` }}
      >
        <div
          className="pal--resource-status-indicator__section__fill"
          style={{ width: `${width}%` }}
        />
      </div>
    );
  });
};

const percentBar = (value, fatalError) => {
  return (
    <>
      <div
        className="pal--resource-status-indicator__section"
        data-status={fatalError ? "red" : "green"}
        style={{ flexBasis: fatalError ? "100%" : `${value}%` }}
      >
        <div className="pal--resource-status-indicator__section__fill" />
      </div>
      <div
        className="pal--resource-status-indicator__section"
        style={{ flexBasis: fatalError ? "0%" : `${100 - value}%` }}
      >
        <div className="pal--resource-status-indicator__section__fill" />
      </div>
    </>
  );
};

const ResourceStatusIndicator = ({
  value,
  kind,
  segments,
  width,
  label,
  fatalError,
  statusIndicator,
}) => {
  const [success, setSuccess] = useState(false);
  const [iconState, setIconState] = useState(false);

  const errorIcon = <ErrorFilled size={16} className="pal--resource-status-indicator__icon--red-failure" />;
  const successIcon = <CheckmarkFilled size={16} className="pal--resource-status-indicator__icon--green-checkmark" />;
  // lazy colors
  let icon = fatalError ? (
    errorIcon
  ) : (
    successIcon
  );

  useEffect(() => {
    if (statusIndicator) setIconState(true);
    else setIconState(false);
  }, [statusIndicator]);

  // On success state change
  useEffect(() => {
    if (kind === "indeterminate" && !fatalError && value !== 100) {
      return;
    }
    if (value === 100 || success) {
      if (!success) setSuccess(true);
      const timer = setTimeout(() => {
        setIconState(true);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [value, success, kind, fatalError]);

  useEffect(() => {
    if (fatalError) {
      setTimeout(() => {
        setSuccess(true);
      }, 400);
    }
  }, [fatalError]);
  // Icon only
  if (statusIndicator) {
    switch (statusIndicator) {
      case "success":
        icon = (
          successIcon
        );
        break;
      case "failure":
        icon = errorIcon
        break;
      case "inactive":
        icon = inactiveIcon;
        break;
      case "information":
        icon = infoIcon;
        break;
      case "in-progress":
        icon = (
          <InProgress size={16} className="pal--resource-status-indicator__icon--inprogress" />
        );
        break;
      case 'incomplete':
        icon = <Incomplete size={16} className='pal--resource-status-indicator__icon--incomplete' />;
        break;
      case "unknown":
        icon =
          <div
            aria-hidden="true"
            className='pal--resource-status-indicator__unknown'
          >
            —
          </div>;
        break;
      default:
        break;
    }
  }
  return (
    <div
      className={classnames("pal--resource-status-indicator", {
        "pal--resource-status-indicator--segments":
          kind === "segments" && !success,
        "pal--resource-status-indicator--percent":
          kind === "percent" || success,
      })}
    >
      {iconState ? (
        icon
      ) : (
        <div
          className="pal--resource-status-indicator__progress"
          style={{ width: success ? "12px" : width }}
        >
          {kind === "percent" || success
            ? percentBar(value, fatalError)
            : segmentedBar(segments, value, fatalError, kind)}
        </div>
      )}
      {label && (
        <span className="pal--resource-status-indicator__label">{label}</span>
      )}
    </div>
  );
};

const requiredWithinRange = (min, max) => {
  return (props, propName, componentName) => {
    const { [propName]: value } = props;
    if (value || value === 0) {
      if (typeof value === "number") {
        return value >= min && value <= max
          ? null
          : new Error(
              `${propName} in ${componentName} must be between ${min} and ${max}.`
            );
      }
      return new Error(
        `${propName} in ${componentName} must be an integer between ${min} and ${max}.`
      );
    }
    return null;
  };
};

const zeroTo100 = requiredWithinRange(0, 100);

const zeroTo99 = requiredWithinRange(0, 99);

ResourceStatusIndicator.propTypes = {
  /**
   * Required for kinds `segments` and `percent`. The current value of the progress bar, as an integer from 0 to 100.
   * For `kind=segments`, determines which segment shows as the current "running" stage. For `kind=percent`, determines
   * how much of the bar to show as "complete".
   */
  value: zeroTo100,
  /**
   * Prop for when the whole process fails and the icon state is triggered for failure.
   */
  fatalError: PropTypes.bool,
  /**
   * Render the icon and label only.
   */
  statusIndicator: PropTypes.oneOf([
    "success",
    "failure",
    "inactive",
    "information",
    "in-progress",
    'incomplete',
    "unknown",
  ]),
  /**
   * Required for kind `segments`. Defines the different stages of progress. The `value` of each segment defines the
   * threshold at which the status of that segment would apply. If `indeterminate` is `true` then the segment will show
   * the "indeterminate" animation, typically meaning progress is unknown. The first segment should always have a `value`
   * of 0, and they should be placed in ascending order of `value`, up to but not including 100.
   */
  segments: PropTypes.arrayOf(
    PropTypes.shape({
      value: zeroTo99,
      error: PropTypes.bool,
    })
  ),
  /**
   * A label to show next to the progress bar.
   */
  label: PropTypes.string,
  /**
   * The kind of progress bar to show. Use `segments` to show discrete stages of progress, or `percent` to show progress
   * as a value from 0 to 100 percent. `segments` can be used when progress cannot be easily represented by a percentage,
   * but can be shown as separate relative stages along a progression to completion. In this case the current segment is
   * always shown as "green" and "indeterminate", meaning that is the stage currently in progress. Use `indeterminate`
   * to show the full bar at indeterminate state when there is no estimated time for completion of the job.
   */
  kind: PropTypes.oneOf(["segments", "percent", "indeterminate"]),
  /**
   * The width of the progress bar (not including the label). Can be any valid CSS width value.
   */
  width: PropTypes.string,
};

ResourceStatusIndicator.defaultProps = {
  kind: "percent",
  width: "3rem",
  label: "",
};

// components should export a skeleton
ResourceStatusIndicator.skeleton = Skeleton;

export default ResourceStatusIndicator;
