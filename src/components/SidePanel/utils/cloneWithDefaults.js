/**
 * Clones an object, but if the property on the object is undefined it replaces it with
 * a default value.
 * @param {*} obj The object to clone.
 * @param {*} defaults The list of defaults to reference.
 */
const cloneWithDefaults = (obj, defaults) => {
  return Object.keys(obj).reduce((accumulated, key) => {
    const isUndefined = obj[key] === undefined;
    const isEmptyString = obj[key] === '';
    const isNull = obj[key] === null;
    // eslint-disable-next-line no-param-reassign
    accumulated[key] =
      isUndefined || isEmptyString || isNull ? defaults[key] : obj[key];
    return accumulated;
  }, {});
};

export default cloneWithDefaults;
