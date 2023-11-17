import debounce from "../utils/debounce";

const useInputDebounce = (handler) => {
  const subFn = debounce(handler, 400);

  document.addEventListener("input", subFn);
  return () => document.removeEventListener("input", subFn);
};

export default useInputDebounce;
