import React, { useState } from 'react';
import { Button } from "@carbon/react";
import Counter from './Counter';

export default {
  component: Counter,
  title: 'Components/Counter'
};

//👇 We create a “template” of how args map to rendering
const Template = args => {
  const {currentStep, ...otherArgs} = args;
  const [step, setStep] = useState(currentStep);
  function addSteps(delta) {
    let newStep = step + delta;
    // Limit our step state to what can be displayed,
    // otherwise button clicks may take more increments/decrements than is visible.
    if (newStep < 0) {
      newStep = 0;
    } else if (newStep > args.totalSteps) {
      newStep = args.totalSteps;
    }
    setStep(newStep);
  }
  return <>
    <Counter currentStep={step} {...otherArgs} />
    <Button kind='tertiary' size='sm' onClick={() => addSteps(1)}>
        Increase
    </Button>
    <Button kind='tertiary' size='sm'onClick={() => addSteps(-1)}>
        Decrease
    </Button>
  </>
}

//👇 Each story then reuses that template
export const Hovers = Template.bind({});

Hovers.args = {totalSteps:5, currentStep:0};
