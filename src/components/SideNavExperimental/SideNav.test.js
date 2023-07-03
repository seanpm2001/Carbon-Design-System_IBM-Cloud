import React from 'react';
import { render, screen, fireEvent } from '../../../config/jest/test-utils';
import userEvent from '@testing-library/user-event';
import SideNav from './SideNav';

const items = [
  {
    href: '#example-item-1A',
    label: 'Link 1A',
    'data-testid': 'pal--side-nav-link',
  },
  { href: '#example-item-1B', label: 'Link 1B' },
  { href: '#example-item-1C', label: 'Link 1C' },
];

const itemsNoHref = [
  {
    to: '#example-item-1A',
    label: 'Link 1A',
    'data-testid': 'pal--side-nav-link',
  },
  { to: '#example-item-1B', label: 'Link 1B' },
  { to: '#example-item-1C', label: 'Link 1C' },
];

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

const itemsWithSubMenuNoHref = [
  { to: '#example-item-1A', label: 'Link 1A' },
  { to: '#example-item-1B', label: 'Link 1B' },
  { to: '#example-item-1C', label: 'Link 1C' },
  {
    label: 'Sub Menu',
    items: [
      { to: '#sub-item-1B', label: 'Sub Link 1A' },
      { to: '#sub-item-1C', label: 'Sub Link 1B' },
    ],
  },
];

const props = {
  items,
  showDropdown: false,
  showHeader: true,
  title: 'Side Nav Title',
  titleHref: '#side-nav-title-href',
};

describe('Side Nav', () => {
  describe('renders classes as expected for Side Nav component', () => {
    it('renders the side nav base class', () => {
      const { container } = render(<SideNav {...props} />);
      const baseClass = container.querySelector('.pal--side-nav');
      expect(baseClass).toBeInTheDocument();
    });

    it('renders the side nav with a custom class', () => {
      const { container } = render(
        <SideNav {...props} className="pal--custom-class" />,
      );
      const baseClass = container.querySelector('.pal--custom-class');
      expect(baseClass).toBeInTheDocument();
    });
  });

  describe('renders the side nav header', () => {
    it('renders the side nav header content', () => {
      render(<SideNav {...props} />);
      const navTitle = screen.getByText('Side Nav Title');

      expect(navTitle).toBeInTheDocument();
    });

    it('selects the header on click', () => {
      render(<SideNav {...props} />);
      const navTitle = screen.getByText('Side Nav Title');
      userEvent.click(navTitle);

      expect(navTitle).toHaveAttribute('aria-current', 'page');
    });

    it('selects the header when pressing enter', () => {
      render(<SideNav {...props} />);
      const navTitle = screen.getByText('Side Nav Title');
      fireEvent.keyDown(navTitle, { key: 'Enter', code: 13 });

      expect(navTitle).toHaveAttribute('aria-current', 'page');
    });

    it('selects the header when pressing space', () => {
      render(<SideNav {...props} />);
      const navTitle = screen.getByText('Side Nav Title');
      fireEvent.keyDown(navTitle, { key: 'Spacebar', code: 32 });

      expect(navTitle).toHaveAttribute('aria-current', 'page');
    });

    it('selects the title when a link component is provided', () => {
      render(
        <SideNav
          {...props}
          items={itemsNoHref}
          linkComponent={({ to, children, ...rest }) => (
            <a href={to} {...rest}>
              {children}
            </a>
          )}
        />,
      );
      const navTitle = screen.getByText('Side Nav Title');
      userEvent.click(navTitle);
      expect(navTitle).toHaveAttribute('aria-current', 'page');
    });

    it('calls the onTitleClick function when the title gets clicked', () => {
      const mockFunction = jest.fn();
      const { container } = render(
        <SideNav
          {...props}
          onTitleClick={() => {
            mockFunction();
          }}
        />,
      );
      const titleLink = container.querySelector('.pal--side-nav__header a');
      expect(mockFunction).toHaveBeenCalledTimes(0);
      userEvent.click(titleLink);
      expect(mockFunction).toHaveBeenCalledTimes(1);
    });
  });

  describe('renders the side nav items', () => {
    it('renders side nav link items correctly', () => {
      render(<SideNav {...props} />);
      const firstLink = screen.getByText('Link 1A');
      const secondLink = screen.getByText('Link 1B');
      const thirdLink = screen.getByText('Link 1C');

      expect(firstLink).toBeInTheDocument();
      expect(secondLink).toBeInTheDocument();
      expect(thirdLink).toBeInTheDocument();
    });

    it('renders side nav link items correctly - with active item', () => {
      props.items[1].active = true;
      render(<SideNav {...props} />);
      const firstLink = screen.getByText('Link 1A');
      const secondLink = screen.getAllByText('Link 1B');
      const thirdLink = screen.getByText('Link 1C');

      expect(firstLink).toBeInTheDocument();
      expect(secondLink.length).toBe(2);
      expect(secondLink[0]).toBeInTheDocument();
      expect(secondLink[1]).toBeInTheDocument();
      expect(thirdLink).toBeInTheDocument();
    });

    it('renders side nav link with sub items correctly', () => {
      render(<SideNav {...props} items={itemsWithSubMenu} />);
      const subMenu = screen.getByText('Sub Menu');
      const firstSubLink = screen.getByText('Sub Link 1A');
      const secondSubLink = screen.getByText('Sub Link 1B');

      expect(subMenu).toBeInTheDocument();
      expect(firstSubLink).toBeInTheDocument();
      expect(secondSubLink).toBeInTheDocument();
    });

    it('renders side nav link with sub items correctly - with link component', () => {
      render(
        <SideNav
          {...props}
          items={itemsWithSubMenuNoHref}
          linkComponent={({ to, children, ...rest }) => (
            <a href={to} {...rest}>
              {children}
            </a>
          )}
        />,
      );
      const subMenu = screen.getByText('Sub Menu');
      const firstSubLink = screen.getByText('Sub Link 1A');
      const secondSubLink = screen.getByText('Sub Link 1B');

      expect(subMenu).toBeInTheDocument();
      expect(firstSubLink).toBeInTheDocument();
      expect(secondSubLink).toBeInTheDocument();
    });

    it('toggles a sub menu open on click', () => {
      render(<SideNav {...props} items={itemsWithSubMenu} />);
      const subMenu = screen.getByText('Sub Menu');

      userEvent.click(subMenu);

      expect(subMenu).toHaveAttribute('aria-expanded', 'true');
    });

    it('selects the nav item on click', () => {
      render(<SideNav {...props} />);
      const navItem = screen.getByText('Link 1A');
      userEvent.click(navItem);

      expect(navItem).toHaveAttribute('aria-current', 'page');
    });

    it('selects the nav item when pressing enter', () => {
      render(<SideNav {...props} />);
      const navItem = screen.getByText('Link 1A');
      fireEvent.keyDown(navItem, { key: 'Enter', code: 13 });

      expect(navItem).toHaveAttribute('aria-current', 'page');
    });

    it('selects the nav item when pressing enter - with link component', () => {
      render(
        <SideNav
          {...props}
          items={itemsNoHref}
          linkComponent={({ to, children, ...rest }) => (
            <a href={to} {...rest}>
              {children}
            </a>
          )}
        />,
      );
      const navItem = screen.getByText('Link 1A');
      fireEvent.keyDown(navItem, { key: 'Enter', code: 13 });

      expect(navItem).toHaveAttribute('aria-current', 'page');
    });

    it('fires the on select callback if defined', () => {
      const callBack = jest.fn();
      const navItems = [
        { href: '#example-item-1A', label: 'Link 1A', onClick: callBack },
      ];
      render(<SideNav {...props} items={navItems} />);
      const navItem = screen.getByText('Link 1A');
      userEvent.click(navItem);

      expect(callBack).toHaveBeenCalled();
    });

    it('selects the nav item when pressing space', () => {
      render(<SideNav {...props} />);
      const navItem = screen.getByText('Side Nav Title');
      fireEvent.keyDown(navItem, { key: 'Spacebar', code: 32 });

      expect(navItem).toHaveAttribute('aria-current', 'page');
    });

    it('selects a sub nav item on click', () => {
      render(<SideNav {...props} items={itemsWithSubMenu} />);
      const subNavItem = screen.getByText('Sub Link 1A');
      userEvent.click(subNavItem);

      expect(subNavItem).toHaveAttribute('aria-current', 'page');
    });

    it('selects a sub nav item on key down', () => {
      render(<SideNav {...props} items={itemsWithSubMenu} />);
      const subNavItem = screen.getByText('Sub Link 1A');
      fireEvent.keyDown(subNavItem, { key: 'Spacebar', code: 32 });

      expect(subNavItem).toHaveAttribute('aria-current', 'page');
    });

    it('sets the sub menu to active when a sub item is selected', () => {
      const { container } = render(
        <SideNav {...props} items={itemsWithSubMenu} />,
      );
      const subNavItem = screen.getByText('Sub Link 1A');
      userEvent.click(subNavItem);

      expect(
        container.querySelector('.pal--side-nav__item--active'),
      ).toBeInTheDocument();
    });

    it('sets the sub menu to active when the open prop is toggled', () => {
      const initialItems = [
        {
          label: 'Sub Menu',
          open: false,
          items: [
            { href: '#sub-item-1B', label: 'Sub Link 1A' },
            { href: '#sub-item-1C', label: 'Sub Link 1B' },
          ],
        },
      ];
      const { rerender } = render(<SideNav {...props} items={initialItems} />);
      const subMenu = screen.getByText('Sub Menu');
      expect(subMenu).toHaveAttribute('aria-expanded', 'false');
      initialItems[0].open = true;
      rerender(<SideNav {...props} items={initialItems} />);
      expect(subMenu).toHaveAttribute('aria-expanded', 'true');
    });

    it('does not call onClick when the activeHref is supplied', () => {
      const { container } = render(
        <SideNav {...props} activeHref="#example-item-1A" />,
      );
      const activeNavItem = container.querySelector(
        '[data-testid="pal--side-nav-link"]',
      );
      const navItem = screen.getByText('Link 1B');
      userEvent.click(navItem);

      expect(activeNavItem).toHaveAttribute('aria-current');
    });
  });

  describe('renders the collapse button', () => {
    it('renders the collapse button', () => {
      render(<SideNav {...props} />);
      const collapseButton = screen.getByText('Close page navigation menu');

      expect(collapseButton).toBeInTheDocument();
    });

    it('renders the collapse button - on the right', () => {
      props.collapseButtonLocation = 'right';
      render(<SideNav {...props} />);
      const collapseButton = screen.getByText('Close page navigation menu');

      expect(collapseButton).toBeInTheDocument();
    });

    it('collapses the menu on click', () => {
      const { container } = render(<SideNav {...props} />);
      const collapseButton = screen.getByText('Close page navigation menu');

      userEvent.click(collapseButton);

      expect(
        container.querySelector('.pal--side-nav--collapsed'),
      ).toBeInTheDocument();
    });

    it('Calls on toggle on click', () => {
      const onToggle = jest.fn();
      render(<SideNav {...props} onToggle={onToggle} />);
      const collapseButton = screen.getByText('Close page navigation menu');

      userEvent.click(collapseButton);

      expect(onToggle).toHaveBeenCalled();
    });
  });
});
