import handleSuggestionClick from "./app/components/search-dropdown";
import renderSearchSuggestions from "./app/components/search-input";
import { toggleDropdown, useInputDebounce } from "./app/utils";
import "./index.html";
import "./styles.scss";

const searchDropdown = document.querySelector(".search__dropdown");
const reposInput = document.querySelector(".search__input");
reposInput.focus();

let fiveRepos = [];

async function getQueriedReps(query) {
  query = query.trim();

  if (!query) {
    toggleDropdown();
    return;
  }
  const apiURL = "https://api.github.com/search/repositories";
  const defaultQuery = "&sort=stars&order=desc&per_page=5";
  const fetchURL = `${apiURL}?q=${query}${defaultQuery}`;

  try {
    const responseValue = await fetch(fetchURL);
    if (!responseValue.ok) {
      throw new Error("Ошибка запроса!");
    }
    const jsonData = await responseValue.json();

    const reposCardData = jsonData.items.map((item) => ({
      id: item.id,
      name: item.name,
      owner: item.owner.login,
      stars: item.stargazers_count
    }));

    fiveRepos = reposCardData;
    renderSearchSuggestions(fiveRepos);

    searchDropdown.style.display = "block";
  } catch (err) {
    console.error(err.name);
    console.log(err);
  }
}

const handleInputChange = ({ target }) => {
  const selectedItem = target.value;
  getQueriedReps(selectedItem);
};

useInputDebounce(handleInputChange, 400);

searchDropdown.addEventListener("click", (e) =>
  handleSuggestionClick(e, fiveRepos)
);
