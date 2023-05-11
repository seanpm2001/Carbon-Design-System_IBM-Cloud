import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import Skeleton from "./skeleton";

// Uses inclusive bounds.
function keepInBounds(value, lowerBound, upperBound) {
  if (value < lowerBound) {
    return lowerBound
  }
  if (value > upperBound) {
    return upperBound
  }
  return value
}

const Counter = ({
    /* Declare any props that this pattern can use */
    totalSteps,
    currentStep: initialStep,
  }) => {
  const [currentStep, setCurrentStep] = useState(keepInBounds(initialStep, 0, totalSteps));
  const [previousStep, setPreviousStep] = useState(currentStep);

  useEffect(() => {
    let newStep = keepInBounds(initialStep, 0, totalSteps);
    if (newStep !== currentStep) {
      setPreviousStep(currentStep);
      setCurrentStep(newStep);
    }
  }, [initialStep, currentStep, totalSteps]);

  const { t } = useTranslation("Counter");

  return (
      <div className="pal--counter" role="status">
      <div className="pal--counter__numbers">
        {/* {currentStep !== previousStep
          ? <h1 key={previousStep} className="pal--counter__previous-step pal--counter__number-exit">{previousStep}</h1>
          : null
        } */}
        {currentStep > previousStep
          ? <h1 key={previousStep} className="pal--counter__previous-step pal--counter__increase_number-exit">{previousStep}</h1>
          : null
        }
        {currentStep < previousStep
          ? <h1 key={previousStep} className="pal--counter__previous-step pal--counter__decrease_number-exit">{previousStep}</h1>
          : null
        }
        <h1 key={currentStep} className="pal--counter__current-step pal--counter__increase_number-enter">{currentStep}</h1>
        <h1 className="pal--counter__total-steps">/ {totalSteps}</h1>
      </div>
      <p className="pal--counter__label" aria-label={t("steps")}>{t("steps")}</p>
      <hr className="pal--counter__divider"></hr>
      </div>
  );
};

// components should export a skeleton
Counter.Skeleton = Skeleton;

Counter.propTypes = {
  /**
   * The total number of steps in the process.
   */
  totalSteps: PropTypes.number.isRequired, // 
  /**
   * The number of steps the user is currently on, or the starting number if not 0. Use this to increase the current step number.
   */
  currentStep: PropTypes.number, // 
};

Counter.defaultProps = {
  /* Default value for any non required props for this pattern */
  totalSteps: 5,
  currentStep: 0,
};

export default Counter;