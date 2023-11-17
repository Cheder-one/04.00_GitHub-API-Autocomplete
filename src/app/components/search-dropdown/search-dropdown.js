import { toggleDropdown } from "../../utils";
import renderSelectedRepo from "../selected-repos/selected-repos";

const reposInput = document.querySelector(".search__input");

const handleSuggestionClick = ({ target }, fiveRepos) => {
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

  reposInput.value = "";
  toggleDropdown();
};

export default handleSuggestionClick;
