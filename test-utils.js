import React from 'react'
import {render} from '@testing-library/react'
import { Theme } from '@carbon/react';
import CarbonForCloudWrapper from "./src/i18n/CarbonForCloudWrapper";


// eslint-disable-next-line react/prop-types
const TestWrapper = ({ children }) => {
  return (
    <Theme theme="light">
      <CarbonForCloudWrapper locale='en'>
        {children}
      </CarbonForCloudWrapper>
    </Theme>
  )
}

const customRender = (ui, options) =>
  render(ui, {wrapper: TestWrapper, ...options})

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render}