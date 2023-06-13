import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import { useTranslation } from "react-i18next";
import Skeleton from "./skeleton";

// Uses inclusive bounds.
function keepInBounds(value, lowerBound) {
  if (value < lowerBound) {
    return lowerBound
  }
  return value
}

const BigNumbers = ({
    /* Declare any props that this pattern can use */
    currentNumber: initialNumber,
  }) => {
  const [currentNumber, setcurrentNumber] = useState(keepInBounds(initialNumber, 0));
  const [previousNumber, setpreviousNumber] = useState(currentNumber);

  useEffect(() => {
    let newNumber = keepInBounds(initialNumber, 0);
    if (newNumber !== currentNumber) {
      setpreviousNumber(currentNumber);
      setcurrentNumber(newNumber);
    }
  }, [initialNumber, currentNumber]);

//   const { t } = useTranslation("BigNumbers");

  return (
      <div className="pal--big-numbers" role="status">
        <div className="pal--big-numbers__numbers">
            {currentNumber > previousNumber
            ? <h1 key={previousNumber} className="pal--big-numbers__previous-number pal--big-numbers__increase_number-exit">{previousNumber}</h1>
            : null
            }
            {currentNumber < previousNumber
            ? <h1 key={previousNumber} className="pal--big-numbers__previous-number pal--big-numbers__decrease_number-exit">{previousNumber}</h1>
            : null
            }
            <h1 key={currentNumber} className={`pal--big-numbers__current-number ${currentNumber < previousNumber ? "pal--big-numbers__decrease_number-enter" : "pal--big-numbers__increase_number-enter"}`}>{currentNumber}</h1>
        </div>
      </div>
  );
};

// components should export a skeleton
BigNumbers.Skeleton = Skeleton;

BigNumbers.propTypes = {
  /**
   * The number of numbers the user is currently on, or the starting number if not 0. Use this to increase the current number number.
   */
  currentNumber: PropTypes.number, // 
};

BigNumbers.defaultProps = {
  /* Default value for any non required props for this pattern */
  currentNumber: 0,
};

export default BigNumbers;