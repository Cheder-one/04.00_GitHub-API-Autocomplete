import removeImg from "../assets/x-lg";
import { toggleDropdown } from "../utils";

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
      <button class="selected-repos__repo-remove">${removeImg}</button>
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
};

const handleSuggestionRemove = ({ target }) => {
  if (target.closest(".selected-repos__repo-remove")) {
    const parentNode = target.closest(".selected-repos__repo-card");
    parentNode.remove();
  }
};

repos.addEventListener("click", handleSuggestionRemove);

export default renderSelectedRepo;
