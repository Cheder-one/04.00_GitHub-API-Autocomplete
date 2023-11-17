import "./index.html";
import "./styles.scss";
import { useInputDebounce } from "./app/hooks/index.js";
import {
  handleSuggestionClick,
  renderSearchSuggestions
} from "./app/components/index.js";
import toggleDropdown from "./app/utils/toggleDropdown.js";

const searchDropdown = document.querySelector(".search__dropdown");
const reposInput = document.querySelector(".search__input");
reposInput.focus();

let fiveRepos = [];

//------------- MAIN -------------
async function getQueriedReps(query) {
  query = query.trim();

  if (!query) {
    toggleDropdown();
    return;
  }
  const url = `https://api.github.com/search/repositories?q=${query}`;

  try {
    const responseValue = await fetch(url);
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

    fiveRepos = reposCardData.slice(0, 5);
    renderSearchSuggestions(fiveRepos);

    searchDropdown.style.display = "block";
  } catch (err) {
    console.error(err.name);
    console.log(err);
  }
}
//----------------------------

const handleInputChange = ({ target }) => {
  const selectedItem = target.value;
  getQueriedReps(selectedItem);
};

useInputDebounce(handleInputChange);

searchDropdown.addEventListener("click", (e) =>
  handleSuggestionClick(e, fiveRepos)
);
