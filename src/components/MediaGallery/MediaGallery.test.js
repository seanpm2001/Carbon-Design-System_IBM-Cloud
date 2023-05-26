import React from 'react';
import { render, fireEvent } from '../../../config/jest/test-utils';
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

    it('does not render the zoom controls by default', () => {
      const { container } = render(<MediaGallery {...modifiedProps} />);
      fireEvent.click(container.querySelector('.pal--media-gallery__image'));

      expect(container.querySelector('.pal--media-gallery__modal-zoom-controls')).not.toBeInTheDocument();
      expect(container.querySelector('.react-transform-wrapper')).not.toBeInTheDocument();
      expect(container.querySelector('.react-transform-component')).not.toBeInTheDocument();
    });
  });

  describe('enable enlarged item index', () => {
    const modifiedMedia = [
      {
        type: 'image',
        url: 'https://picsum.photos/id/167/600/400',
        alt: 'A random image',
        caption: 'A random image',
      },
      {
        type: 'video/mp4',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        alt: 'A random video',
        onError: (event) => {console.log('Wont be called', event.target.src)}
      },
      {
        type: 'youtube',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      },
    ];
    const modifiedProps = {
      ...props,
      media: [...modifiedMedia],
      canClickToEnlarge: true,
      showEnlargeItemIndex: true,
    };

    it('it renders the modal heading with the index and caption text', () => {
      const { baseElement, container,  getByTitle  } = render(<MediaGallery {...modifiedProps} />);
      fireEvent.click(container.querySelector('.pal--media-gallery__image'));
      expect(baseElement).toMatchSnapshot();
    });

    it('it renders the modal heading with the index and alt text', () => {
      const { baseElement, container,  getByTitle  } = render(<MediaGallery {...modifiedProps} />);
      fireEvent.click(container.querySelector('.pal--media-gallery__image'));
      fireEvent.click(container.querySelector('.pal--media-gallery__modal-right'));
      expect(baseElement).toMatchSnapshot();
    });

    it('it renders the modal heading with the index only', () => {
      const { baseElement, container, getByTitle  } = render(<MediaGallery {...modifiedProps} />);
      fireEvent.click(container.querySelector('.pal--media-gallery__image'));
      fireEvent.click(container.querySelector('.pal--media-gallery__modal-right'));
      fireEvent.click(container.querySelector('.pal--media-gallery__modal-right'));
      expect(baseElement).toMatchSnapshot();
    });
  });

  describe('enable zoom feature', () => {
    const modifiedMedia = [
      {
        type: 'image',
        url: 'https://picsum.photos/id/167/600/400',
        alt: 'A random image',
        caption: 'A random image',
      },
      {
        type: 'video/mp4',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        alt: 'A random video',
        onError: (event) => {console.log('Wont be called', event.target.src)}
      },
      {
        type: 'youtube',
        url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      },
    ];
    const modifiedProps = {
      ...props,
      media: [...modifiedMedia],
      canClickToEnlarge: true,
      canZoom: true,
    };

    it('renders zoom controls only in the modal', () => {
      const { container } = render(<MediaGallery {...modifiedProps} />);

      expect(container.querySelector('.pal--media-gallery__modal-zoom-controls')).not.toBeInTheDocument();
      expect(container.querySelector('.react-transform-wrapper')).not.toBeInTheDocument();
      expect(container.querySelector('.react-transform-component')).not.toBeInTheDocument();

      fireEvent.click(container.querySelector('.pal--media-gallery__image'));

      expect(container.querySelector('.pal--media-gallery__modal-zoom-controls')).toBeInTheDocument();
      expect(container.querySelector('.react-transform-wrapper')).toBeInTheDocument();
      expect(container.querySelector('.react-transform-component')).toBeInTheDocument();
    });

    it('render zoom controls only for image type', () => {
      const { container } = render(<MediaGallery {...modifiedProps} />);

      fireEvent.click(container.querySelector('.pal--media-gallery__image'));
      expect(container.querySelector('.pal--media-gallery__modal-zoom-controls')).toBeInTheDocument();
      expect(container.querySelector('.react-transform-wrapper')).toBeInTheDocument();
      expect(container.querySelector('.react-transform-component')).toBeInTheDocument();

      fireEvent.click(container.querySelector('.pal--media-gallery__modal-right'));
      expect(container.querySelector('.pal--media-gallery__video')).toBeInTheDocument();
      expect(container.querySelector('.pal--media-gallery__modal-zoom-controls')).not.toBeInTheDocument();
      expect(container.querySelector('.react-transform-wrapper')).not.toBeInTheDocument();
      expect(container.querySelector('.react-transform-component')).not.toBeInTheDocument();

      fireEvent.click(container.querySelector('.pal--media-gallery__modal-right'));
      expect(container.querySelector('.pal--media-gallery__video')).toBeInTheDocument();
      expect(container.querySelector('.pal--media-gallery__modal-zoom-controls')).not.toBeInTheDocument();
      expect(container.querySelector('.react-transform-wrapper')).not.toBeInTheDocument();
      expect(container.querySelector('.react-transform-component')).not.toBeInTheDocument();
    });
  })

});
