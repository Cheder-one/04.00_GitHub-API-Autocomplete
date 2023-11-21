const searchDropdown = document.querySelector(".search__dropdown");
const reposInput = document.querySelector(".search__input");

export const toggleDropdown = () => {
  searchDropdown.innerHTML = "";
  searchDropdown.style.display = "none";
  reposInput.focus();
};

export const debounce = (fn, delay) => {
  let lastTimer = null;
  return function (...args) {
    clearTimeout(lastTimer);
    lastTimer = setTimeout(() => fn.apply(this, args), delay);
  };
};

export const useInputDebounce = (handler, delay) => {
  const subFn = debounce(handler, delay);

  document.addEventListener("input", subFn);
  return () => document.removeEventListener("input", subFn);
};
