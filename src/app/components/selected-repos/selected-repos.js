import { toggleDropdown } from "../../utils";

const repos = document.querySelector(".selected-repos");
const reposInput = document.querySelector(".search__input");
const allSelected = repos.children;

const createRepoCard = ({ id, name, owner, stars }) => {
  repos.insertAdjacentHTML(
    "beforeend",
    `
    <div class="selected-repos__repo-card" data-repo_id="${id}">
      <ul class="selected-repos__repo-data">
        <li class="selected-repos__repo-field">Name: ${name}</li>
        <li class="selected-repos__repo-field">Owner: ${owner}</li>
        <li class="selected-repos__repo-field">Stars: ${stars}</li>
      </ul>
      <button class="selected-repos__repo-remove">
      <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="red" class="bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
      </svg>
      </button>
    </div>
    `
  );
};

const checkIsUniqAdd = (array, id) => {
  const isUniqItem = ![...array]
    .map((repo) => repo.dataset.repo_id)
    .includes(id);
  return isUniqItem;
};

const renderSelectedRepo = (arr, repoId) => {
  const isUniq = checkIsUniqAdd(allSelected, repoId);

  if (isUniq) {
    const selectedRepo = arr.find((repo) => repo.id === parseInt(repoId));
    createRepoCard(selectedRepo);

    reposInput.value = "";
    toggleDropdown();
  }
  if (allSelected.length > 3) {
    const firstChild = repos.firstElementChild;
    repos.removeChild(firstChild);
  }
};

const handleSuggestionRemove = ({ target }) => {
  if (target.closest(".selected-repos__repo-remove")) {
    const parentNode = target.closest(".selected-repos__repo-card");
    parentNode.remove();
  }
};

repos.addEventListener("click", handleSuggestionRemove);

export default renderSelectedRepo;
