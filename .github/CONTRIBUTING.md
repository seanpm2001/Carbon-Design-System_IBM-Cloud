# Contributing to carbon-for-ibm-cloud

First and foremost, thank you for your interest in contributing to `carbon-for-ibm-cloud`. We appreciate your
enthusiasm to help create reusable components and patterns that we can share across the IBM Cloud
community.

Please take a moment to review this document before contributing, as it will help save time and
ease the process for all involved parties. There are many different ways for you to contribute
to `carbon-for-ibm-cloud` including filing bug reports, creating feature requests, reporting documentation
errors or corrections, fixing bugs, coding/designing new components, contributing documentation,
along with a variety of other opportunities. Below are a few of the more common ways you can contribute
to `carbon-for-ibm-cloud`.


## Opening issues

If you would like to see a change or addition to `carbon-for-ibm-cloud`, any of the packages that are included
alongside `carbon-for-ibm-cloud`, or to our docs site we encourage you to open an issue. If you don't think your
issue falls into one of the categories below, you can open a
[regular issue](https://github.com/carbon-design-system/ibm-cloud/issues/new) instead.

### Bug reports

If you find a bug within our docs site, packages, or components you can help us out by opening up a
[bug report](https://github.com/carbon-design-system/ibm-cloud/issues/new?labels=bug&template=bug_report.md) explaining
the problem. If you think you may have found a bug within `carbon-for-ibm-cloud` please make sure of the following things:

- Be sure that the code you're testing against the latest `main` branch of `carbon-for-ibm-cloud`.

- Please check our list of [issues](https://github.com/carbon-design-system/ibm-cloud/issues) to ensure that the bug your
reporting does not already exist.

If you have a reproduction of the bug within a live environment (prod, dev, or test) that you can provide a
link to, this will help speed up the process. Additionally, if you can provide as much information and follow
the issue template as closely as possible this will help reduce any ambiguity about what the nature of the bug is.

### Feature requests

We welcome and actively encourage people to open up feature requests for things they think will make `carbon-for-ibm-cloud` better.
If you have a new idea for a component, an enhancement to our development environment, additions or changes to a
component or pattern, or changes to our docs site that are not inherently content-based (for these see the Docs
Request below), please feel free to open a
[Feature Request](https://github.com/carbon-design-system/ibm-cloud/issues/new?labels=enhancement&template=feature_request.md).

### Docs request

You can open a [Docs Request](https://github.com/carbon-design-system/ibm-cloud/issues/new?assignees=&labels=Documentation&template=docs-request.md&title=)
if you find grammatical or spelling errors, think that something within our documentation is unclear
or could use further explanation, or if there is content missing from our documentation that users
of `carbon-for-ibm-cloud` could benefit from.

## Contributing code or documentation

Before you begin contributing code or documentation, please leave a comment on an existing issue expressing
your interest in contributing. If you can't find an issue for what you would like to contribute, feel free to
[open a new issue](https://github.com/carbon-design-system/ibm-cloud/issues). This helps us ensure that multiple people
aren't working on the same issue.

To get started we recommend reading our [Getting started](https://github.com/carbon-design-system/ibm-cloud#getting-started)
to get up to speed with how the `carbon-for-ibm-cloud` development environment works before jumping into code.

If you have any questions about our development environment, the contribution process, or general inquiries
please feel free to reach out to a member of our team and we'll do our best to assist you in your contribution.

### Commit conventions

`carbon-for-ibm-cloud` adheres to Angular [Commit Message Conventions](https://gist.github.com/stephenparish/9941e89d80e2bc58a153#format-of-the-commit-message)
and uses these commit messages to handle versioning of each of our packages and repositories. When
committing from the CLI, validation is used to ensure these conventions are correctly followed. When
squashing and merging a Pull Request or editing a file using GitHub, these commit message conventions should also be followed.

### Developing components
Our team is more than happy to host a component or pattern. While there are certain
components and data hooks that we've officially included in our library, we also have stages for components that
are not officially included in the libraries main export files, but are included in the npm package.
[Components Guidelines](https://pages.github.ibm.com/cdai-design/cloud-pal/development-guidelines/components/overview)

### Submitting code
1. **Fork the repo**

    Fork the repository and clone it locally. Connect your local to the original “upstream” repository by adding it as a remote. Pull in changes from “upstream” often so that you stay up to date so that when you submit your pull request, merge conflicts will be less likely.

2. **From the root directory of your fork, run:**

    ```sh
      # To install the project's dependencies
      npm run install

      # To build the project:
      npm run build
    ```
    To get your development server running and to start coding run:
    ```sh
      npm run storybook
    ```
3. **Test and lint your code**

   If you're contributing to our JavaScript code, test and lint your changes by running our test commands: 
   ```sh
      # To run unit tests
      npm run test

      # To lint javascript changes
      npm run lint

      # To lint styling changes
      npm run lint:style
    ```
4. **Create Pull Request**

    Once you feel like your code is in a good place and ready to be submitted you can open a Pull Request
    by pushing your branch up to the upstream repository. In your PR please reference the issue your PR resolves.

    Upon submission, your PR will be reviewed by one or multiple members of the `carbon-for-ibm-cloud` team. The team member may
    ask you to make changes based on coding conventions, architectural best practices, or to provide further clarity.
    We expect these changes to be made within two weeks. After two weeks we may close the pull request if it isn't showing
    any activity.

## Component stages

Once a component has been submitted to `carbon-for-ibm-cloud` it will be assigned a stage. There are
four different stages a componentcan be assigned to based on what sets of criteria it
meets. Most will start out in the community gallery stage. As the component meets more
criteria and as a greater need for it grows across teams it can be promoted to the next stage. All
components that have been

### 1. Community Gallery

  The community gallery is where we capture new designs or bits of code that people in our IBM Cloud
  community have created. Nothing in the community gallery has been vetted, and often we aren’t sure
  a pattern, component, or data hook will evolve. Rather we are hoping to surface as much as we can
  as to provide transparency into what others are creating.

#### Required Criteria

<br/>

- It is a React component
- The code works without any major breakages

### 2. Experimental

At this stage, there is clearly a need for the pattern because it is being used by at least one
platform or service team. However, not enough use-cases have been validated as to allow for firm
guidelines to be written.

#### Required Criteria

<br />

- The component meets all the previous stages criteria
- The component or data hook functions as intended
- A use case in the platform has been identified
- The component includes documented prop types, a description, and applicable use cases

### 3. Candidate

A pattern becomes a candidate when multiple teams are using or are in need of the pattern. Candidate
patterns are being actively worked on by cloud designers and developers to finalize the guidelines and
code across a variety of use-cases.

#### Required Criteria

- The component meets all the previous stages criteria
- The component has met the design teams previous stages criteria and Candidate criteria
- The component is responsive
- The component passes IBM’s accessibility checklist and requirements
- The component's classes follow the BEM naming convention
- The component works in the platform without breaking
- The component or data hook includes analytics
- The component or data hook is unit tested
- The component or data hook is now maintained by the `carbon-for-ibm-cloud` development team

### 4. GA

It’s complete! The guidelines are final and the pattern has been developed in code for all to use.

#### Required Criteria

- The component meets all the previous stages criteria for both development and design
- The component has final style and usage guidelines
- The component or data hook has received final approval from the gov squad