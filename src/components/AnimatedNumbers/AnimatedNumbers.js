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

function divideDigits(digitString, currentDigit, currentNumber, previousNumber) {
    console.log(digitString);
    let digitSet = "";
    let classString = "";
    let loopLength = 0;
    loopLength = digitString.length;
    // set current or previous class
    if (currentDigit) {
        classString = "pal--animated-numbers__current-number ";
        // loopLength = digitString.length;
        // set increase or decrease class
        if (currentNumber < previousNumber) {
            //add to string
            classString = classString + "pal--animated-numbers__decrease_number-enter";
        }
        else {
            //add to string
            classString = classString + "pal--animated-numbers__increase_number-enter";
        }
    }
    //could also check if string != current number
    else if (!currentDigit) {
        classString = "pal--animated-numbers__previous-number ";
        // loopLength = previousNumber.toString.length;
        // set increase or decrease class
        if (currentNumber > previousNumber) {
            //add to string
            classString = classString + "pal--animated-numbers__increase_number-exit";
        }
        //what to do if prev and current are same?
        else if (currentNumber < previousNumber) {
            //add to string
            classString = classString + "pal--animated-numbers__decrease_number-exit"
        }
    }
    console.log(classString);
    for (let i = 0; i < loopLength; i++) {
        let digit = digitString.charAt(i);
        //construct span with class and digit
        // let digitSpan = `<span className="${classString} pal--animated-numbers__digit-${i}">${digit}</span>`;
        let digitSpan = `<span class="${classString} pal--animated-numbers__digit-${i}">${digit}</span>`;
        //add to set
        digitSet = digitSet + digitSpan;
    }
    console.log(digitSet);
    // digitSet = <>${digitSet} <>
    return digitSet;
}

const AnimatedNumbers = ({
    /* Declare any props that this pattern can use */
    currentNumber: initialNumber, staggeredAnimation,
  }) => {
  const [currentNumber, setcurrentNumber] = useState(keepInBounds(initialNumber, 0));
  const [previousNumber, setpreviousNumber] = useState(currentNumber);
//   const [currentNumberString, setcurrentNumberString] = useState(currentNumber.toString);
//   const [previousNumberString, setpreviousNumberString] = useState(previousNumber.toString);
  const [previousSet, setpreviousSet] = useState();
  const [currentSet, setcurrentSet] = useState();

  useEffect(() => {
    //update numbers
    let newNumber = keepInBounds(initialNumber, 0);
    if (newNumber !== currentNumber) {
        setpreviousNumber(Number(currentNumber));
        setcurrentNumber(Number(newNumber));
        console.log("previous num:" + previousNumber + " current num:" + currentNumber);
        //set Strings
        // let previousNumberString = previousNumber.toString;
        // let currentNumberString = currentNumber.toString;
        // console.log("previous string:" + previousNumberString + " current string:" + currentNumberString);
        //construct spans from strings
        // let previousNumberString = "555";
        // let currentNumberString = "777";
        setpreviousSet(divideDigits(`${previousNumber}`, false, currentNumber, previousNumber));
        setcurrentSet(divideDigits(`${currentNumber}`, true, currentNumber, previousNumber));
    }
 }, [initialNumber, currentNumber, previousNumber]);
//   }, [initialNumber, currentNumber, previousNumber, currentNumberString, previousNumberString]);

//   const { t } = useTranslation("AnimatedNumbers");

  return (
      <div className="pal--animated-numbers" role="status">
        <div className="pal--animated-numbers__numbers">
            {/* Animation without stagger */}
            {/* {currentNumber > previousNumber
            ? <h1 key={previousNumber} className="pal--animated-numbers__previous-number pal--animated-numbers__increase_number-exit">{previousNumber}</h1>
            : null
            }
            {currentNumber < previousNumber
            ? <h1 key={previousNumber} className="pal--animated-numbers__previous-number pal--animated-numbers__decrease_number-exit">{previousNumber}</h1>
            : null
            }
            <h1 key={currentNumber} className={`pal--animated-numbers__current-number ${currentNumber < previousNumber ? "pal--animated-numbers__decrease_number-enter" : "pal--animated-numbers__increase_number-enter"}`}>{currentNumber}</h1> */}
            {/* {currentNumber > previousNumber
            ? <h1 key={previousNumber} className="pal--animated-numbers__previous-number pal--animated-numbers__increase_number-exit">{previousNumber}</h1>
            : null
            }
            {currentNumber < previousNumber
            ? <h1 key={previousNumber} className="pal--animated-numbers__previous-number pal--animated-numbers__decrease_number-exit">{previousNumber}</h1>
            : null
            }
            <h1 key={currentNumber} className={`pal--animated-numbers__current-number ${currentNumber < previousNumber ? "pal--animated-numbers__decrease_number-enter" : "pal--animated-numbers__increase_number-enter"} pal--animated-numbers__digit-#2}`}>{currentNumber}</h1>      
             */}
            {/* <>{currentSet}</> 
            <>{previousSet}</>  */}
            {/* <div key={previousNumber} className="pal--animated-numbers__numbers"  dangerouslySetInnerHTML={{__html: previousSet}}></div> */}
            <div key={currentNumber} className="pal--animated-numbers__numbers"  dangerouslySetInnerHTML={{__html: currentSet}}></div>
        </div>
      </div>
  );
};

// components should export a skeleton
AnimatedNumbers.Skeleton = Skeleton;

AnimatedNumbers.propTypes = {
  /**
   * The number to display to the user, or the number to change to.
   */
  currentNumber: PropTypes.number, // 
    /**
  * Whether the animation is chunked or staggered.
   */
  staggeredAnimation: PropTypes.bool, // 
};

AnimatedNumbers.defaultProps = {
  /* Default value for any non required props for this pattern */
  currentNumber: 0,
  staggeredAnimation: false,
};

export default AnimatedNumbers;