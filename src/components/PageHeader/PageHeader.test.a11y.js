import React from 'react';
import { render } from '../../../config/jest/test-utils';
// Page Header Components
import PageHeader from './PageHeader';

const breadcrumbs = [
  {
    href: 'https://cloud.ibm.com',
    value: 'Breadcrumb 1',
  },
  {
    href: 'https://cloud.ibm.com',
    value: 'Breadcrumb 2',
  },
  {
    href: 'https://cloud.ibm.com',
    value: 'Breadcrumb 3',
  },
];
const actions = 'test';

describe('Page Header a11y', () => {
  it('the page header component passes the IBMA ruleset', async () => {
    const main = document.createElement('main');
    const { container } = render(
      <PageHeader
        truncatedTitle
        actions={actions}
        breadcrumbs={breadcrumbs}
        title="Page Header Title"
        surfacedDetails="surfaced details"
      />,
      { container: document.body.appendChild(main) },
    );

    await expect(container).toBeAccessible('Components: Page Header');
  });
});
