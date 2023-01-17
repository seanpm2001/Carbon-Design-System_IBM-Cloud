import React from 'react';
import { act, render } from '@testing-library/react';
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

describe('MediaGallery a11y', () => {
  it('the MediaGallery component passes the IBMA ruleset', async () => {
    jest.useFakeTimers();
    const main = document.createElement('main');
    let SUT;

    act(() => {
      SUT = render(
        <div className="pal--wrap">
          <MediaGallery {...props} />
        </div>,
        { container: document.body.appendChild(main) },
      );
      jest.runAllTimers();
    });

    await expect(SUT.container).toBeAccessible('Components: MediaGallery');
  });
});
