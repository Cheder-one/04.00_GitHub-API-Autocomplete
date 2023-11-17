const searchDropdown = document.querySelector(".search__dropdown");

const renderSearchSuggestions = (arr) => {
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

export default renderSearchSuggestions;
