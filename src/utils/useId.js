// Utility to create unique and persistent IDs. Straight up stolen from Carbon https://github.com/carbon-design-system/carbon/blob/master/packages/react/src/internal/useId.js

import { useEffect, useLayoutEffect, useState } from 'react';

function setupGetInstanceId() {
  let instanceId = 0;
  return function getInstanceId() {
    instanceId += 1;
    return instanceId;
  };
}

const getId = setupGetInstanceId();

function canUseDOM() {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
}

const useIsomorphicLayoutEffect = canUseDOM() ? useLayoutEffect : useEffect;
let serverHandoffCompleted = false;

/**
 * Generate a unique ID with an optional prefix prepended to it
 * @param {string} [prefix]
 * @returns {string}
 */
function useId(prefix = 'id') {
  const [id, setId] = useState(() => {
    if (serverHandoffCompleted) {
      return `${prefix}-${getId()}`;
    }
    return null;
  });

  useIsomorphicLayoutEffect(() => {
    if (id === null) {
      setId(`${prefix}-${getId()}`);
    }
  }, [getId]);

  useEffect(() => {
    if (serverHandoffCompleted === false) {
      serverHandoffCompleted = true;
    }
  }, []);

  return id;
}

export default useId;
