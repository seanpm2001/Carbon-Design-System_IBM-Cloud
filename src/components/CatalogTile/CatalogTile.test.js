import React from 'react';
import { render, screen } from '../../../test-utils';
import userEvent from '@testing-library/user-event';
import CatalogTile from './CatalogTile';

describe('CatalogTile', () => {
  describe('render classes as expected for CatalogTile component', () => {
    it('it renders the CatalogTile base class', () => {
      const { container } = render(<CatalogTile />);
      const baseClass = container.querySelector('.pal--catalog-tile');
      expect(baseClass).toBeInTheDocument();
    });
  });

  describe('CatalogTile Header', () => {
    it('renders the CatalogTile Header class', () => {
      const { container } = render(<CatalogTile></CatalogTile>);
      const catalogTile = container.querySelector('.pal--catalog-tile__header');
      expect(catalogTile).toBeInTheDocument();
    });

    it('renders the CatalogTile Offering Name', () => {
      render(<CatalogTile offeringName="Jabuticaba" />);
      const catalogTileOffer = screen.getByText('Jabuticaba');
      expect(catalogTileOffer).toBeInTheDocument();
    });

    it('renders the CatalogTile header-offering class', () => {
      const { container } = render(<CatalogTile></CatalogTile>);
      const catalogTileClass = container.querySelector(
        '.pal--catalog-tile__header-name',
      );
      expect(catalogTileClass).toBeInTheDocument();
    });

    it('renders the CatalogTile icon class', () => {
      const { container } = render(<CatalogTile></CatalogTile>);
      const catalogTileIcon = container.querySelector(
        '.pal--catalog-tile__icon-container',
      );
      expect(catalogTileIcon).toBeInTheDocument();
    });

    it('renders the CatalogTile provider class', () => {
      const { container } = render(
        <CatalogTile provider={['a', 'b']}></CatalogTile>,
      );
      const catalogTileProviderContainer = container.querySelector(
        '.pal--catalog-tile__tag-container',
      );
      const catalogTileProviderTag = container.querySelector(
        '.pal--catalog-tile__tag',
      );
      expect(catalogTileProviderContainer).toBeInTheDocument();
      expect(catalogTileProviderTag).toBeInTheDocument();
      expect(catalogTileProviderContainer.children.length).toEqual(2);
    });

    it('renders the CatalogTile providerName', () => {
      const { container } = render(
        <CatalogTile providerName={'test'} provider={['a', 'b']}></CatalogTile>,
      );
      const catalogTileProviderContainer = container.querySelector(
        '.pal--catalog-tile__tag-container',
      );
      const catalogTileProviderTag = container.querySelector(
        '.pal--catalog-tile__tag',
      );
      expect(catalogTileProviderContainer).toBeInTheDocument();
      expect(catalogTileProviderTag).toBeInTheDocument();

      // providerName overrides provider
      expect(catalogTileProviderContainer.children.length).toEqual(1);
    });

    it('renders the CatalogTile decorator icon', () => {
      const { container } = render(
        <CatalogTile offeringName="Jabuticaba" decorator={<svg />} />,
      );
      const decoratorContainer = container.querySelector(
        '.pal--catalog-tile__decorator',
      );
      expect(decoratorContainer).toBeInTheDocument();
    });
  });

  describe('Test Description section', () => {
    it('renders the description class', () => {
      const { container } = render(<CatalogTile></CatalogTile>);
      const catalogTileIcon = container.querySelector(
        '.pal--catalog-tile__desc-container',
      );
      expect(catalogTileIcon).toBeInTheDocument();
    });

    it('renders the descriptions text class', () => {
      const { container } = render(
        <CatalogTile description="This is a description"></CatalogTile>,
      );
      const catalogTileDesc = container.querySelector(
        '.pal--catalog-tile__desc .pal--catalog-tile__desc-ellipsis',
      );
      expect(catalogTileDesc).toBeInTheDocument();
    });

    it('renders the descriptions text correctly', () => {
      render(<CatalogTile description="Testing text 123" />);
      const testText = screen.getByText('Testing text 123');
      expect(testText).toBeInTheDocument();
    });

    it('renders tag items from the bottom', () => {
      const { container } = render(<CatalogTile tag={['a', 'b']} />);
      const catalogTileTagContainer = container.querySelector(
        '.pal--catalog-tile__tag-container',
      );
      expect(catalogTileTagContainer).toBeInTheDocument();
    });
  });

  describe('Test Highlight', () => {
    it('renders the CatalogTile Offering Name', () => {
      const offeringName = [
        {
          text: 'Jab',
        },
        {
          highlight: true,
          text: 'utic',
        },
        {
          text: 'aba',
        },
      ];
      const { container } = render(<CatalogTile offeringName={offeringName} />);
      const firstSegment = screen.getByText('Jab');
      const highlightContainer = container.querySelector(
        '.pal--catalog-tile__search-text',
      );
      const lastSegment = screen.getByText('aba');
      expect(firstSegment).toBeInTheDocument();
      expect(highlightContainer).toBeInTheDocument();
      expect(lastSegment).toBeInTheDocument();
    });

    it('renders the CatalogTile provider', () => {
      const provider = [
        [
          {
            highlight: true,
            text: 'foo',
          },
          {
            text: 'bar',
          },
        ],
      ];
      const { container } = render(
        <CatalogTile provider={provider}></CatalogTile>,
      );
      const highlightContainer = container.querySelector(
        '.pal--catalog-tile__tag .pal--catalog-tile__search-text',
      );
      const lastSegment = screen.getByText('bar');
      expect(highlightContainer).toBeInTheDocument();
      expect(lastSegment).toBeInTheDocument();
    });

    it('renders the descriptions text', () => {
      const description = [
        {
          highlight: true,
          text: 'This',
        },
        {
          text: ' is a ',
        },
        {
          highlight: true,
          text: 'description',
        },
      ];
      const { container } = render(
        <CatalogTile description={description}></CatalogTile>,
      );
      const highlightContainer = container.querySelector(
        '.pal--catalog-tile__desc > .pal--catalog-tile__search-text',
      );
      const segment = screen.getByText('is a');
      expect(highlightContainer).toBeInTheDocument();
      expect(segment).toBeInTheDocument();
    });

    it('renders tag items from the bottom', () => {
      const tag = [
        [
          {
            text: 'foo',
          },
          {
            highlight: true,
            text: 'bar',
          },
        ],
      ];
      const { container } = render(<CatalogTile tag={tag} />);
      const highlightContainer = container.querySelector(
        '.pal--catalog-tile__tag .pal--catalog-tile__search-text',
      );
      const firstSegment = screen.getByText('foo');
      expect(highlightContainer).toBeInTheDocument();
      expect(firstSegment).toBeInTheDocument();
    });

    it('renders the decorator icon', () => {
      const offeringName = [
        {
          text: 'Jab',
        },
        {
          highlight: true,
          text: 'utic',
        },
        {
          text: 'aba',
        },
      ];
      const { container } = render(
        <CatalogTile offeringName={offeringName} decorator={<svg />} />,
      );
      const decoratorContainer = container.querySelector(
        '.pal--catalog-tile__decorator',
      );
      expect(decoratorContainer).toBeInTheDocument();
    });
  });

  describe('Test List view', () => {
    it('renders in list mode', () => {
      const { container } = render(
        <CatalogTile
          offeringName="Jabuticaba"
          description="This is a description"
          provider={['a', 'b']}
          tag={['c', 'd']}
          href="/create"
          learnMoreHref="/about"
          mode="list"
        ></CatalogTile>,
      );
      const iconContainer = container.querySelector(
        '.pal--catalog-tile__icon-container',
      );
      const nameContainer = container.querySelector(
        '.pal--catalog-tile__desc-container .pal--catalog-tile__header-name',
      );
      const providerContainer = container.querySelector(
        '.pal--catalog-tile__desc-container .pal--catalog-tile__header .pal--catalog-tile__tag-container',
      );
      const descriptionContainer = container.querySelector(
        '.pal--catalog-tile__desc-ellipsis',
      );
      const tagContainer = container.querySelector(
        '.pal--catalog-tile__desc-container > .pal--catalog-tile__tag-container',
      );
      const buttonContainer = container.querySelector(
        '.pal--catalog-tile__button-container',
      );
      const createButton = container.querySelector(
        '.pal--catalog-tile__button-container .cds--btn--tertiary',
      );
      const learnMoreLink = container.querySelector(
        '.pal--catalog-tile__button-container .cds--link',
      );
      expect(iconContainer).toBeInTheDocument();
      expect(nameContainer).toBeInTheDocument();
      expect(providerContainer).toBeInTheDocument();
      expect(descriptionContainer).toBeInTheDocument();
      expect(tagContainer).toBeInTheDocument();
      expect(buttonContainer).toBeInTheDocument();
      expect(createButton).toBeInTheDocument();
      expect(learnMoreLink).toBeInTheDocument();
    });
  });

  describe('Test view with headerTag', () => { 
    it('renders with headerTag in base mode', () =>{
      const { container } = render(
        <CatalogTile
          offeringName="Jabuticaba"
          description="This is a description"
          href="/create"
          mode="base"
          label="Custom label"
          headerTag={{
            text: 'Solution',
            type: 'blue',
            size: 'md'}}
        ></CatalogTile>,
      );
      const iconContainerWithLabel = container.querySelector(
        '.pal--catalog-tile__icon-container.pal--catalog-tile__icon-with-label',
      );
      const labelContainer = container.querySelector(
        '.pal--catalog-tile__fs-12-fw-400',
      )
      const nameContainer = container.querySelector(
        '.pal--catalog-tile__header-name',
      );
      const descriptionContainer = container.querySelector(
        '.pal--catalog-tile__desc',
      );
      const headerTag = container.querySelector(
        '.cds--tag.header-tag.cds--tag--blue'
      );
      expect(iconContainerWithLabel).toBeInTheDocument();
      expect(labelContainer).toBeInTheDocument();
      expect(nameContainer).toBeInTheDocument();
      expect(descriptionContainer).toBeInTheDocument();
      expect(headerTag).toBeInTheDocument();
    });
    it('renders with headerTag in grid mode', () =>{
      const { container } = render(
        <CatalogTile
          offeringName="Jabuticaba"
          description="This is a description"
          href="/create"
          mode="grid"
          label="Custom label"
          headerTag={{
            text: 'Solution',
            type: 'blue',
            size: 'md'}}
        ></CatalogTile>,
      );
      const iconContainerWithLabel = container.querySelector(
        '.pal--catalog-tile__header-container .pal--catalog-tile__icon-container.pal--catalog-tile__icon-with-label',
      );
      const labelContainer = container.querySelector(
        '.pal--catalog-tile__fs-12-fw-400',
      )
      const nameContainer = container.querySelector(
        '.pal--catalog-tile__header-name',
      );
      const descriptionContainer = container.querySelector(
        '.pal--catalog-tile__desc',
      );
      const headerTag = container.querySelector(
        '.cds--tag.header-tag.cds--tag--blue'
      );
      expect(iconContainerWithLabel).toBeInTheDocument();
      expect(labelContainer).toBeInTheDocument();
      expect(nameContainer).toBeInTheDocument();
      expect(descriptionContainer).toBeInTheDocument();
      expect(headerTag).toBeInTheDocument();
    });

    it('renders with headerTag in list mode', () =>{
      const { container } = render(
        <CatalogTile
          offeringName="Jabuticaba"
          description="This is a description"
          href="/create"
          mode="list"
          label="Custom label"
          headerTag={{
            text: 'Solution',
            type: 'blue',
            size: 'md'}}
        ></CatalogTile>,
      );

      const iconContainerWithLabel = container.querySelector(
        '.pal--catalog-tile__header.pal--catalog-tile__icon-with-label .cds--tag.header-tag.cds--tag--md.cds--tag--blue'
      );
      const iconContainerInHeaderContainer = container.querySelector(
        '.pal--catalog-tile__header-container .pal--catalog-tile__icon-container.pal--catalog-tile__icon-with-label-list'
      );
      const labelContainer = container.querySelector(
        '.pal--catalog-tile__fs-12-fw-400'
      );
      const nameContainer = container.querySelector(
        '.pal--catalog-tile__header-name'
      );
      const descriptionContainer = container.querySelector(
        '.pal--catalog-tile__desc'
      );
      const headerTag = container.querySelector(
        '.cds--tag.header-tag.cds--tag--blue'
      );
      expect(iconContainerWithLabel).toBeInTheDocument();
      expect(iconContainerInHeaderContainer).toBeInTheDocument();
      expect(labelContainer).toBeInTheDocument();
      expect(nameContainer).toBeInTheDocument();
      expect(descriptionContainer).toBeInTheDocument();
      expect(headerTag).toBeInTheDocument();
    });

    it('renders with headerTag in consulting mode', () =>{
      const { container } = render(
        <CatalogTile
          offeringName="Jabuticaba"
          description="This is a description"
          href="/create"
          mode="consulting"
          label="Custom label"
          headerTag={{
            text: 'Solution',
            type: 'blue',
            size: 'md'}}
        ></CatalogTile>,
      );

      const consultingView = container.querySelector(
        '.pal--catalog-tile__consulting-view'
      );
      const iconContainerWithLabel = container.querySelector(
        '.pal--catalog-tile__icon-container.pal--catalog-tile__icon-with-label-list'
      );
      const labelContainer = container.querySelector(
        '.pal--catalog-tile__fs-12-fw-400'
      );
      const nameContainer = container.querySelector(
        '.pal--catalog-tile__header-name'
      );
      const descriptionContainer = container.querySelector(
        '.pal--catalog-tile__desc'
      );
      const headerTag = container.querySelector(
        '.cds--tag.header-tag.cds--tag--blue'
      );
      expect(consultingView).toBeInTheDocument();
      expect(iconContainerWithLabel).not.toBeInTheDocument();
      expect(labelContainer).not.toBeInTheDocument();
      expect(nameContainer).toBeInTheDocument();
      expect(descriptionContainer).toBeInTheDocument();
      expect(headerTag).not.toBeInTheDocument();
    });

    it('renders with headerTag in select mode', () => {
      const { container } = render(
        <CatalogTile
          offeringName="Jabuticaba"
          description="This is a description"
          href="/create"
          mode="select"
          label="Custom label"
          headerTag={{
            text: 'Solution',
            type: 'blue',
            size: 'md'
          }}
        ></CatalogTile>,
      );

      const catalogTileContainer = container.querySelector(
        '.pal--catalog-tile.cds--tile.cds--tile--selectable',
      );
      const iconContainerWithLabel = container.querySelector(
        '.pal--catalog-tile__icon-container.pal--catalog-tile__icon-with-label'
      );
      const labelContainer = container.querySelector(
        '.pal--catalog-tile__fs-12-fw-400'
      );
      const nameContainer = container.querySelector(
        '.pal--catalog-tile__header-name'
      );
      const descriptionContainer = container.querySelector(
        '.pal--catalog-tile__desc'
      );
      const headerTag = container.querySelector(
        '.cds--tag.header-tag.header-tag-select.cds--tag--blue'
      );
      expect(catalogTileContainer).toBeInTheDocument();
      expect(iconContainerWithLabel).toBeInTheDocument();
      expect(labelContainer).toBeInTheDocument();
      expect(nameContainer).toBeInTheDocument();
      expect(descriptionContainer).toBeInTheDocument();
      expect(headerTag).toBeInTheDocument();
    });
   })

  describe('Test Consulting view', () => {
    it('renders in list mode', () => {
      const { container } = render(
        <CatalogTile
          offeringName="Jabuticaba"
          description="This is a description"
          href="/create"
          mode="consulting"
        ></CatalogTile>,
      );
      const iconContainer = container.querySelector(
        '.pal--catalog-tile__icon-container',
      );
      const nameContainer = container.querySelector(
        '.pal--catalog-tile__desc-container .pal--catalog-tile__header-name',
      );
      const descriptionContainer = container.querySelector(
        '.pal--catalog-tile__desc-ellipsis',
      );
      const buttonContainer = container.querySelector(
        '.pal--catalog-tile__button-container',
      );
      const createButton = container.querySelector(
        '.pal--catalog-tile__button-container .cds--btn--tertiary',
      );
      const featuredIconContainer = container.querySelector(
        '.pal--catalog-tile__featured-icon-container',
      );
      expect(iconContainer).toBeInTheDocument();
      expect(nameContainer).toBeInTheDocument();
      expect(descriptionContainer).toBeInTheDocument();
      expect(buttonContainer).toBeInTheDocument();
      expect(createButton).toBeInTheDocument();
      expect(featuredIconContainer).toBeInTheDocument();
    });
  });

  describe('Test Select view', () => {
    it('renders in multiselect mode', () => {
      const { container } = render(
        <CatalogTile
          offeringName="Jabuticaba"
          description="This is a description"
          href="/create"
          mode="select"
        ></CatalogTile>,
      );
      const catalogTileContainer = container.querySelector(
        '.pal--catalog-tile.cds--tile.cds--tile--selectable',
      );
      const checkboxButton = container.querySelector(
        '.cds--tile[role="checkbox"]',
      );
      expect(catalogTileContainer).toBeInTheDocument();
      expect(checkboxButton).toBeInTheDocument();
    });
  });

  describe('Test functions', () => {
    it('Handle Click function', () => {
      const onClickFunction = jest.fn(() => {});
      render(
        <CatalogTile offeringName="Offer" handleClick={onClickFunction} />,
      );
      userEvent.click(screen.getByText('Offer'));
      expect(onClickFunction).toHaveBeenCalled();
    });

    it('Handle Click function for Create button in List mode', () => {
      const onClickFunction = jest.fn(() => {});
      const { container } = render(
        <CatalogTile mode="list" handleClick={onClickFunction} />,
      );
      const createButton = container.querySelector(
        '.pal--catalog-tile__button-container .cds--btn--tertiary',
      );
      userEvent.click(createButton);
      expect(onClickFunction).toHaveBeenCalled();
    });

    it('Handle Click function for Learn more link in List mode', () => {
      const onClickFunction = jest.fn(() => null);
      const { container } = render(
        <CatalogTile
          mode="list"
          learnMoreHref="#"
          handleClick={onClickFunction}
        />,
      );
      const learnMoreLink = container.querySelector(
        '.pal--catalog-tile__button-container .cds--link',
      );
      userEvent.click(learnMoreLink);
      expect(onClickFunction).toHaveBeenCalled();
    });

    it('Handle Click function for Create button in Consulting mode', () => {
      const onClickFunction = jest.fn(() => {});
      const { container } = render(
        <CatalogTile mode="consulting" handleClick={onClickFunction} />,
      );
      const createButton = container.querySelector(
        '.pal--catalog-tile__button-container .cds--btn--tertiary',
      );
      userEvent.click(createButton);
      expect(onClickFunction).toHaveBeenCalled();
    });

    it('Handle Click function in Selectable mode', () => {
      const onClickFunction = jest.fn(() => {});
      render(
        <CatalogTile
          offeringName="Offer"
          mode="select"
          handleClick={onClickFunction}
        />,
      );
      userEvent.click(screen.getByText('Offer'));
      expect(onClickFunction).toHaveBeenCalled();
    });
  });

  describe('Tests skeleton', () => {
    it('Renders the skeleton class', () => {
      const { container } = render(<CatalogTile.skeleton />);
      const catalogTileSkeleton = container.querySelector(
        '.pal--catalog-tile__skeleton',
      );
      expect(catalogTileSkeleton).toBeInTheDocument();
    });
  });
});