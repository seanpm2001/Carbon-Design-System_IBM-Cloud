/* eslint-disable no-unused-expressions */
import React from 'react';
import { render } from '../../../test-utils';
import Breadcrumbs from '.';

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
    asButton: true,
  },
  {
    value: <div>Breadcrumb 4</div>,
    asCustomComponent: true,
  },
];

describe('Breadcrumb prop', () => {
  it('render correct amount of breadcrumbs', () => {
    const { container } = render(<Breadcrumbs breadcrumbs={breadcrumbs} />);
    expect(container.querySelectorAll('.cds--breadcrumb-item').length).toBe(4);
  });

  it('renders the correct content inside breadcrumb', () => {
    const { getByText } = render(<Breadcrumbs breadcrumbs={breadcrumbs} />);
    expect(getByText('Breadcrumb 1')).toBeInTheDocument();
  });
});
