/**
 * Calls a function if a conditional function returns true. Wraps everything in
 * promise.resolve in order to allow for async events.
 * @param {*} conditionalFn
 * @param {*} callBack
 */
const callIf = (conditionalFn, callBack) => (...args) => {
  return Promise.resolve(conditionalFn(...args)).then(condition => {
    return condition && callBack(...args);
  });
};

export default callIf;
