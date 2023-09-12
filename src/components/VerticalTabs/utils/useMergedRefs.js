import { useCallback, Ref, ForwardedRef } from 'react';

/**
 * Combine multiple refs into a single ref. This use useful when you have two
 * refs from both `React.forwardRef` and `useRef` that you would like to add to
 * the same node.
 */

// Func is copied from @carbon/react libary
const useMergedRefs = refs => {
  return useCallback(node => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref !== null && ref !== undefined) {
        ref.current = node;
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, refs);
};

export default useMergedRefs;
