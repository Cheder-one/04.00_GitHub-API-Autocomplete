const searchDropdown = document.querySelector(".search__dropdown");
const reposInput = document.querySelector(".search__input");

const toggleDropdown = () => {
  searchDropdown.innerHTML = "";
  searchDropdown.style.display = "none";
  reposInput.focus();
};

export default toggleDropdown;
