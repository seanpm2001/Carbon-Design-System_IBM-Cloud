<h1 align="center">Carbon for IBM Cloud</h1>

> The Carbon-for-IBM-Cloud package is a ecosystem of tools, best practices, guidelines, and reusuable patterns built for the IBM Cloud Platform. Carbon-for-IBM-Cloud extends 
> [carbon/react](https://github.com/carbon-design-system/carbon/tree/main/packages/react) components and adds a set of consistent, reusable components to integrate into their user 
> experiences. Carbon-for-IBM-Cloud is the one stop shop for designing and developing UIs on IBM Cloud.

  <p align="center">
  <a href="https://github.com/carbon-design-system/ibm-cloud/blob/master/LICENSE">
    <img src="https://img.shields.io/badge/license-Apache--2.0-blue.svg" alt="Carbon-for-IBM-Cloud is released under the Apache-2.0 license" />
  </a>
  <a href="https://github.com/carbon-design-system/ibm-cloud/actions/workflows/storybook-test.yml">
    <img src="https://github.com/carbon-design-system/ibm-cloud/actions/workflows/storybook-test.yml/badge.svg" alt="Test workflow status" />
  </a>
  <a href="https://github.com/carbon-design-system/ibm-cloud/actions/workflows/test-pull-request.yml">
    <img src="https://github.com/carbon-design-system/ibm-cloud/actions/workflows/test-pull-request.yml/badge.svg" alt="Test workflow status" />
  </a>
   <a href="https://github.com/carbon-design-system/ibm-cloud/actions/workflows/lint-pull-request.yml">
    <img src="https://github.com/carbon-design-system/ibm-cloud/actions/workflows/lint-pull-request.yml/badge.svg" alt="Lint workflow status" />
  </a>
  
   <a href="https://www.npmjs.com/package/carbon-for-ibm-cloud">
    <img src="https://img.shields.io/npm/dm/carbon-for-ibm-cloud.svg" alt="Downloads" />
  </a>
  <a href="https://www.npmjs.com/package/carbon-for-ibm-cloud">
    <img src="https://img.shields.io/npm/v/carbon-for-ibm-cloud/latest.svg" alt="NPM latest package" />
  </a>
  </p>
  
## Getting started

To install `carbon-for-ibm-cloud` in your project, you will need to run the following
command using [npm](https://www.npmjs.com/):

```bash
npm install -S carbon-for-ibm-cloud
```

If you prefer [Yarn](https://yarnpkg.com/en/), use the following command
instead:

```bash
yarn add carbon-for-ibm-cloud
```

Since this package is based on [carbon/react](https://github.com/carbon-design-system/carbon/tree/main/packages/react) it requires [Dart Sass](http://npmjs.com/package/sass) in order to
compile styles. Please check out [carbon/styles](https://github.com/carbon-design-system/carbon/blob/main/packages/styles/docs/sass.md) documentation out for Sass configuration.

## Usage

The `carbon-for-ibm-cloud` package provides components and patterns for IBM Cloud.

To use a component, you can import it directly from the package:

```jsx
import { Card } from 'carbon-for-ibm-cloud';

function MyComponent() {
  return <Card>Example usage</Card>;
}
```

To include the styles for a specific component, you can either import all the
styles from the project or include the styles for a specific component:

```scss
// Bring in all the styles for Carbon-for-ibm-cloud
@use 'carbon-for-ibm-cloud';

// Preferred: bring in the styles for one component
@use 'carbon-for-ibm-cloud/components/Card';
```

For a full list of components available, checkout our
[Storybook](https://carbon-design-system.github.io/ibm-cloud).

## 📖 Documentation

If you're looking for `carbon-for-ibm-cloud` component and pattern documentation, check out:

- [Storybook](https://carbon-design-system.github.io/ibm-cloud).
- [Carbon for IBM Products Documentation (IBM Internal)](https://pages.github.ibm.com/cdai-design/pal/)

## 🙌 Contributing

We're always looking for contributors to help us fix bugs, build new features,
or help us improve the project documentation. If you're interested, definitely
check out our [Contributing Guide](/.github/CONTRIBUTING.md)! 👀

## ❓ Questions and Support
If you have any questions about `carbon-for-ibm-cloud` or need support please feel free to reach out to us via Slack using the #cloud-pal channel.

## 📝 License

Licensed under the [Apache 2.0 License](/LICENSE).

