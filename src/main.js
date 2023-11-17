import "./index.html";
import "./styles.scss";
import useInputDebounce from "./app/hooks/useInputDebounce";
import renderSelectedRepo from "./app/components/selected-repos/selected-repos";

let fiveRepos = [];

const searchDropdown = document.querySelector(".search__dropdown");
const reposInput = document.querySelector(".search__input");
reposInput.focus();

const addSearchSuggestions = (arr) => {
  searchDropdown.innerHTML = "";
  const repoList = arr.reduce((acc, repo) => {
    acc += `
      <li class="search__suggest" data-repo_id=${repo.id}>
        <span>${repo.name}</span>
      </li>
    `;
    return acc;
  }, "");
  searchDropdown.insertAdjacentHTML("beforeend", repoList);
};

//------------- MAIN -------------
async function getQueriedReps(query) {
  query = query.trim();

  if (!query) {
    searchDropdown.innerHTML = "";
    searchDropdown.style.display = "none";
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
    addSearchSuggestions(fiveRepos);
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

const handleSuggestionClick = ({ target }) => {
  const { dataset } = target;

  if (dataset.repo_id) {
    renderSelectedRepo(fiveRepos, dataset.repo_id);
  } else {
    const liElem = target.closest(".search__suggest");
    if (liElem) {
      const repoId = liElem.dataset.repo_id;
      renderSelectedRepo(fiveRepos, repoId);
    }
  }
};

useInputDebounce(handleInputChange);

searchDropdown.addEventListener("click", handleSuggestionClick);
