import React from 'react';
import { render, fireEvent } from '../../../test-utils';
import MediaGallery from './MediaGallery';

const props = {
  media: [
    {
      type: 'image',
      url: 'https://picsum.photos/id/167/600/400',
      alt: 'A random image',
      caption: 'A random image',
    },
    {
      type: 'image',
      url: 'https://picsum.photos/id/168/600/400',
      alt: 'A random image',
    },
    {
      type: 'image',
      url: 'https://picsum.photos/id/169/600/400',
      alt: 'A random image',
    },
    {
      type: 'image',
      url: 'https://picsum.photos/id/170/600/400',
      alt: 'A random image',
    },
    {
      type: 'image',
      url: 'https://picsum.photos/id/171/600/400',
      alt: 'A random image',
    },
    {
      type: 'image',
      url: 'https://picsum.photos/id/172/600/400',
      alt: 'A random image',
    },
    {
      type: 'youtube',
      url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    },
  ],
  nextLabel: 'Next Media',
  previousLabel: 'Previous Media',
  optionLabel: 'Media Number',
  selectLabel: 'Select Media',
};

describe('MediaGallery', () => {
  describe('render classes as expected for MediaGallery component', () => {
    it('it renders the MediaGallery base class', () => {
      const { baseElement, container } = render(<MediaGallery {...props} />);
      const baseClass = container.querySelector('.pal--media-gallery');
      expect(baseClass).toBeInTheDocument();
      expect(baseElement).toMatchSnapshot();
    });

    it('it renders the selected media', () => {
      const { container, getByTitle } = render(<MediaGallery {...props} />);
      fireEvent.click(getByTitle('Media Number 7'));
      expect(container.querySelector('.pal--media-gallery__video')).toBeInTheDocument();
    });

    it('it renders the selected media', () => {
      const { container, getByTitle } = render(<MediaGallery {...props} />);
      fireEvent.change(getByTitle('Select Media'), { target: { value: 5 } });
      expect(container.querySelector('.pal--media-gallery__image'))
        .toHaveAttribute('src', 'https://picsum.photos/id/171/600/400');
    });

    it('handles selected null media. render nothing', () => {
      const customProps = props;
      customProps.media = [{
        type: null,
        url: 'https://picsum.photos/id/172/600/400',
        alt: 'A random image',
      }];
      const { container, getByTitle } = render(<MediaGallery {...customProps} />);
      expect(container.querySelector('.pal--media-gallery__image')).not.toBeInTheDocument();
      expect(container.querySelector('.pal--media-gallery__video')).not.toBeInTheDocument();
    });
  });

  describe('enable enlarge feature', () => {
    const modifiedProps = {
      ...props,
      canClickToEnlarge: true,
    };

    it('it renders the MediaGallery with modal dialog', () => {
      const { baseElement, container } = render(<MediaGallery {...modifiedProps} />);
      fireEvent.click(container.querySelector('.pal--media-gallery__image'));
      expect(baseElement).toMatchSnapshot();
    });

    it('click to open the image', () => {
      const { container } = render(<MediaGallery {...modifiedProps} />);
      fireEvent.click(container.querySelector('.pal--media-gallery__image'));
      expect(container.querySelector('.is-visible.pal--media-gallery__modal')).toBeInTheDocument();
      expect(container.querySelector('.pal--media-gallery__modal-right')).toBeInTheDocument();
    });

    it('go to other images using the arrows', () => {
      const { container } = render(<MediaGallery {...modifiedProps} />);
      fireEvent.click(container.querySelector('.pal--media-gallery__image'));
      fireEvent.click(container.querySelector('.pal--media-gallery__modal-right'));
      expect(container.querySelector('.pal--media-gallery__image'))
        .toHaveAttribute('src', 'https://picsum.photos/id/168/600/400');
      expect(container.querySelector('.pal--media-gallery__modal-left')).toBeInTheDocument();
      expect(container.querySelector('.pal--media-gallery__modal-right')).toBeInTheDocument();
      fireEvent.click(container.querySelector('.pal--media-gallery__modal-left'));
      expect(container.querySelector('.pal--media-gallery__image'))
        .toHaveAttribute('src', 'https://picsum.photos/id/167/600/400');
      fireEvent.click(container.querySelector('.cds--modal-close'));
      expect(container.querySelector('.is-visible.pal--media-gallery__modal')).not.toBeInTheDocument();
    });
  });
});
