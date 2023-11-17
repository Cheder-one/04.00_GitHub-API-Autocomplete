import renderSelectedRepo from "../selected-repos/selected-repos";

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
};

export default handleSuggestionClick;
