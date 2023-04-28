import { useEffect } from 'react';
import debounce from '../../utils/debounce';

const listeners = [];

const resizeHandler = evt => {
  listeners.forEach(l => l(evt));
};
const debouncedResizeEventListener = debounce(resizeHandler, 250);
const isSSR = typeof window === 'undefined';

/*
Configs are controlled here. The config is used to generate an utility and it's documentation.
*/
const useWindowResize = listener => {
  useEffect(() => {
    if (listener && !listeners.find(l => l === listener) && !isSSR) {
      listeners.push(listener);
      if (listeners.length === 1) {
        window.addEventListener('resize', debouncedResizeEventListener);
      }
    }

    return () => {
      const idx = listeners.findIndex(l => l === listener);
      if (idx > -1) {
        listeners.splice(idx, 1);
        if (listeners.length === 0) {
          window.removeEventListener('resize', debouncedResizeEventListener);
        }
      }
    };
  }, [listener]);
};

/*
Documentation aren't required, but help communicate to developers what the expected input and output of this Utility is.
*/
// export const documentation = {
//   input: 'A function to get called when the window is resized.',
// };

export default useWindowResize;
