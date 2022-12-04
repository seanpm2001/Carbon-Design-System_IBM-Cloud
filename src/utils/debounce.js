export default (fn, time) => {
  let timeout;
  return function internal() {
    const functionCall = () => fn.apply(this, arguments); // eslint-disable-line prefer-rest-params

    clearTimeout(timeout);
    timeout = setTimeout(functionCall, time);
  };
};
