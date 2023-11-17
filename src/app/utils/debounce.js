const debounce = (fn, delay) => {
  let lastTimer = null;
  return function (...args) {
    clearTimeout(lastTimer);
    lastTimer = setTimeout(() => fn.apply(this, args), delay);
  };
};

export default debounce;
