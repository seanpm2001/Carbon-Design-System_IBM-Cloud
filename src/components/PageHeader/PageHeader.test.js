/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom'

import React from 'react';
import { render } from '@testing-library/react';
import PageHeader from './PageHeader';
import PageHeaderSkeleton from './skeleton';

describe('PageHeader', () => {
  it('renders pal--page-header class', () => {
    const { container } = render(<PageHeader title="Page Header" />);
    const pageHeaderClass = container.querySelector('.pal--page-header');
    expect(pageHeaderClass).toBeInTheDocument();
  });
  it('renders pal--page-header__title-container class', () => {
    const { container } = render(<PageHeader title="Page Header" />);
    const pageHeaderClass = container.querySelector(
      '.pal--page-header__title-container',
    );
    expect(pageHeaderClass).toBeInTheDocument();
  });
  it('renders pal--page-header__title class', () => {
    const { container } = render(<PageHeader title="Page Header" />);
    const pageHeaderClass = container.querySelector('.pal--page-header__title');
    expect(pageHeaderClass).toBeInTheDocument();
  });
  it('renders pal--page-header__icon class', () => {
    const { container } = render(
      <PageHeader title="Page Header" icon={<div></div>} />,
    );
    const iconClass = container.querySelector('.pal--page-header__icon');
    expect(iconClass).toBeInTheDocument();
  });
});

describe('Children prop', () => {
  it('render the pal--page-header_actions class', () => {
    const { container } = render(
      <PageHeader title="Page Header">test</PageHeader>,
    );
    const actionClass = container.querySelector('.pal--page-header__actions');
    expect(actionClass).toBeInTheDocument();
  });

  it('pass the correct actions from children', () => {
    const { container } = render(
      <PageHeader title="Page Header">test</PageHeader>,
    );
    const actionClass = container.querySelector('.pal--page-header__actions');
    expect(actionClass.innerHTML).toBe('test');
  });
});

describe('instance of custom className', () => {
  it('render the custom class', () => {
    // eslint-disable-next-line react/no-children-prop
    const { container } = render(
      <PageHeader className="test" title="Page Header" />,
    );
    const customClass = container.querySelector('.test');
    expect(customClass).toBeInTheDocument();
  });
});

describe('truncated prop', () => {
  it('render the truncated class', () => {
    // eslint-disable-next-line react/no-children-prop
    const { container } = render(
      <PageHeader truncatedTitle title="Page Header" />,
    );
    const truncatedClass = container.querySelector(
      '.pal--page-header__title--truncated',
    );
    expect(truncatedClass).toBeInTheDocument();
  });
});

describe('skeleton component', () => {
  it('renders the skeleton component', () => {
    const { container } = render(
      <PageHeaderSkeleton breadcrumbs title actions />,
    );
    const pageHeaderClass = container.querySelector('.pal--page-header');
    const mainClass = container.querySelector('.pal--page-header__main');
    const breadCrumbClass = container.querySelector(
      '.pal--page-header__breadcrumb',
    );
    const titleContainerClass = container.querySelector(
      '.pal--page-header__title-container',
    );
    const actionsContainerClass = container.querySelector(
      '.pal--page-header__actions',
    );

    expect(pageHeaderClass).toBeInTheDocument();
    expect(mainClass).toBeInTheDocument();
    expect(breadCrumbClass).toBeInTheDocument();
    expect(titleContainerClass).toBeInTheDocument();
    expect(actionsContainerClass).toBeInTheDocument();
  });

  it('renders the skeleton component - no actions', () => {
    const { container } = render(<PageHeaderSkeleton breadcrumbs title />);
    const pageHeaderClass = container.querySelector('.pal--page-header');
    const mainClass = container.querySelector('.pal--page-header__main');
    const breadCrumbClass = container.querySelector(
      '.pal--page-header__breadcrumb',
    );
    const titleContainerClass = container.querySelector(
      '.pal--page-header__title-container',
    );
    const actionsContainerClass = container.querySelector(
      '.pal--page-header__actions',
    );

    expect(pageHeaderClass).toBeInTheDocument();
    expect(mainClass).toBeInTheDocument();
    expect(breadCrumbClass).toBeInTheDocument();
    expect(titleContainerClass).toBeInTheDocument();
    expect(actionsContainerClass).not.toBeInTheDocument();
  });
});

// TODO: find a solution for tag list
// describe('crn and defined actions', () => {
//   it('render tag management and defined actions', () => {
//     const { container } = render(
//       <PageHeader
//         title="Page Header"
//         crn="some-fake-crn"
//         actionButtons={[{ label: 'Action 1', kind: 'secondary' }]}
//         actionMenuItems={[{ itemText: 'Action 2' }]}
//       />,
//     );
//     const tagList = container.querySelector('#ResourceTagList');
//     const tagModal = container.querySelector('#ResourceTagModal');
//     const btn = container.querySelector(
//       '.pal--page-header__actions > .cds--btn--secondary',
//     );
//     const menu = container.querySelector(
//       '.pal--page-header__actions > .pal--actions-panel-wrap .cds--overflow-menu',
//     );
//     expect(tagList).toBeInTheDocument();
//     expect(tagModal).toBeInTheDocument();
//     expect(btn).toBeInTheDocument();
//     expect(menu).toBeInTheDocument();
//   });
// });

describe('Provisioning', () => {
  it('render provisioning class', () => {
    // eslint-disable-next-line react/no-children-prop
    const { container } = render(
      <PageHeader isProvisioning title="Page Header" />,
    );
    const pageHeaderClass = container.querySelector('.pal--page-header--provisioning');
    expect(pageHeaderClass).toBeInTheDocument();
    const gridRowClass = container.querySelector('.cds--row');
    expect(gridRowClass).toBeInTheDocument();
    const iconContainerClass = container.querySelector('.pal--page-header__icon-container');
    expect(iconContainerClass).toBeInTheDocument();
    const mainContainerClass = container.querySelector('.pal--page-header__main-container');
    expect(mainContainerClass).toBeInTheDocument();
  });

  it('render icon class', () => {
    // eslint-disable-next-line react/no-children-prop
    const { container } = render(
      <PageHeader isProvisioning title="Page Header" icon={<div />} />,
    );
    const v2Class = container.querySelector('.pal--page-header__icon-container .pal--page-header__icon');
    expect(v2Class).toBeInTheDocument();
    const v1Class = container.querySelector('.pal--page-header__title-container .pal--page-header__icon');
    expect(v1Class).toBeNull();
  });

  it('renders the skeleton component', () => {
    const { container } = render(
      <PageHeaderSkeleton breadcrumbs title actions isProvisioning />,
    );
    const pageHeaderClass = container.querySelector('.pal--page-header');
    const bxRow = container.querySelector('.cds--row');
    const mainContainerClass = container.querySelector('.pal--page-header__main-container');
    const mainClass = container.querySelector('.pal--page-header__main');
    const breadCrumbClass = container.querySelector(
      '.pal--page-header__breadcrumb',
    );
    const titleContainerClass = container.querySelector(
      '.pal--page-header__title-container',
    );
    const actionsContainerClass = container.querySelector(
      '.pal--page-header__actions',
    );
    const iconClass = container.querySelector('.pal--page-header__icon');

    expect(pageHeaderClass).toBeInTheDocument();
    expect(bxRow).toBeInTheDocument();
    expect(mainContainerClass).toBeInTheDocument();
    expect(mainClass).toBeInTheDocument();
    expect(breadCrumbClass).toBeInTheDocument();
    expect(titleContainerClass).toBeInTheDocument();
    expect(actionsContainerClass).toBeInTheDocument();
    expect(iconClass).not.toBeInTheDocument();
  });

  it('renders the skeleton component - with icon', () => {
    const { container } = render(<PageHeaderSkeleton icon title isProvisioning/>);
    const pageHeaderClass = container.querySelector('.pal--page-header');
    const mainClass = container.querySelector('.pal--page-header__main');
    const iconClass = container.querySelector('.pal--page-header__icon');
    const titleContainerClass = container.querySelector(
      '.pal--page-header__title-container',
    );

    expect(pageHeaderClass).toBeInTheDocument();
    expect(mainClass).toBeInTheDocument();
    expect(titleContainerClass).toBeInTheDocument();
    expect(iconClass).toBeInTheDocument();
  });
});


describe('Experimental', () => {
  it('render experimental class', () => {
    const { container } = render(
      <PageHeader experimental title="Page Header" />,
    );
    const pageHeaderClass = container.querySelector('.pal--page-header--experimental');
    expect(pageHeaderClass).toBeInTheDocument();
  });

  it('render world header class without illustration', () => {
    const { container } = render(
      <PageHeader experimental isWorld title="Page Header" />,
    );
    const pageHeaderClass = container.querySelector('.pal--page-header--world');
    expect(pageHeaderClass).toBeInTheDocument();

    const mainClass = container.querySelector('.pal--page-header__main-container');
    expect(mainClass).toBeInTheDocument();

    const illustrationClass = container.querySelector('.pal--page-header__illustration-container');
    expect(illustrationClass).not.toBeInTheDocument();
  });

  it('render world header illustration class', () => {
    // eslint-disable-next-line react/no-children-prop
    const { container } = render(
      <PageHeader experimental isWorld illustration='...' title="Page Header" />,
    );
    const pageHeaderClass = container.querySelector('.pal--page-header--world');
    expect(pageHeaderClass).toBeInTheDocument();

    const illustrationClass = container.querySelector('.pal--page-header__illustration-container');
    expect(illustrationClass).toBeInTheDocument();

    const mainClass = container.querySelector('.pal--page-header__main-container');
    expect(mainClass).toBeInTheDocument();
  });

  it('render return link class', () => {
    // eslint-disable-next-line react/no-children-prop
    const { container } = render(
      <PageHeader experimental returnLink='./' title="Page Header" />,
    );
    const linkClass = container.querySelector('.pal--page-header__return-link');
    expect(linkClass).toBeInTheDocument();
  });
});
