import React from 'react';
import { render, fireEvent } from '../../../config/jest/test-utils';
import SideNav from './SideNav';

const itemsWithSubMenu = [
  { href: '#example-item-1A', label: 'Link 1A' },
  { href: '#example-item-1B', label: 'Link 1B' },
  { href: '#example-item-1C', label: 'Link 1C' },
  {
    label: 'Sub Menu',
    items: [
      { href: '#sub-item-1B', label: 'Sub Link 1A' },
      { href: '#sub-item-1C', label: 'Sub Link 1B' },
    ],
  },
];

describe('side nav a11y', () => {
  it('the side nav component passes the IBMA ruleset', async () => {
    const main = document.createElement('main');
    const { container } = render(
      <SideNav items={itemsWithSubMenu} showDropdown={false} />,
      {
        container: document.body.appendChild(main),
      },
    );

    await expect(container).toBeAccessible('Components: Side Nav');
  });

  it('the side nav component passes the IBMA ruleset when a sub menu is open', async () => {
    const main = document.createElement('main');
    const { getByText, container } = render(
      <SideNav items={itemsWithSubMenu} showDropdown={false} />,
      { container: document.body.appendChild(main) },
    );

    const subMenu = getByText('Sub Menu');
    fireEvent.click(subMenu);

    await expect(container).toBeAccessible('Components: Side Nav - menu open');
  });

  it('the side nav component passes the IBMA ruleset when the nav is collapsed', async () => {
    const main = document.createElement('main');
    const { getByText, container } = render(
      <SideNav items={itemsWithSubMenu} showDropdown={false} />,
      { container: document.body.appendChild(main) },
    );

    const collapseButton = getByText('Close page navigation menu');
    fireEvent.click(collapseButton);

    await expect(container).toBeAccessible(
      'Components: Side Nav - nav collapsed',
    );
  });
});
