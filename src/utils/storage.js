function callStorage(obj, func, args) {
  try {
    return window[obj][func](...args);
  } catch (e) {
    return undefined;
  }
}

export const local = {
  getItem: (...args) => callStorage('localStorage', 'getItem', args),
  setItem: (...args) => callStorage('localStorage', 'setItem', args),
  removeItem: (...args) => callStorage('localStorage', 'removeItem', args),
}

export const session = {
  getItem: (...args) => callStorage('sessionStorage', 'getItem', args),
  setItem: (...args) => callStorage('sessionStorage', 'setItem', args),
  removeItem: (...args) => callStorage('sessionStorage', 'removeItem', args),
}

export default {
  local,
  session,
};
