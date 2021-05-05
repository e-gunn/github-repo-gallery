const overview = document.querySelector(".overview");
const username = "e-gunn";
const repoList = document.querySelector(".repo-list");
const reposSection = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");

// get information from github profile
const getProfile = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const profile = await res.json();
    // console.log(profile);
    displayProfile(profile);
};
getProfile();

// display infomation from github profile 
const displayProfile = function (profile) {
    // create new div 
    const newDiv = document.createElement("div");
    // populate the div 
    newDiv.classList.add("user-info");
    newDiv.innerHTML = `
        <figure>
            <img alt="user avatar" src=${profile.avatar_url} />
        </figure>
        <div>
            <p><strong>Name:</strong> ${profile.name}</p>
            <p><strong>Bio:</strong> ${profile.bio}</p>
            <p><strong>Location:</strong> ${profile.location}</p>
            <p><strong>Number of public repos:</strong> ${profile.public_repos}</p>
        </div>
    `;
    overview.append(newDiv);
};

// get information from user's public repos 
const getRepos = async function () {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repos = await res.json();
    // console.log(repos);
    displayRepos(repos);
};
getRepos();

// display information from each repo
const displayRepos = function (repos) {
    for (const repo of repos) {
        // create list item for each repo
        let listItem = document.createElement("li");
        // give each list item a heading
        listItem.classList.add("repo");
        listItem.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(listItem);
    }
};

repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        getRepoInfo(repoName);
    }
});

// get specific information from user's repo
const getRepoInfo = async function (repoName) {
    const res = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await res.json();
    // console.log(repoInfo);

    // get languages
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    // console.log(languageData);

    // make a list of languages
    const languages = [];
    for (const language in languageData) {
        languages.push(language);
        // console.log(languages);
    }
    displayRepoInfo(repoInfo, languages);
};

// display specific information from user's repo
const displayRepoInfo = function (repoInfo, languages) {
    repoData.innerHTML = "";
    repoData.classList.remove("hide");
    reposSection.classList.add("hide");
    // create new div 
    const newDiv = document.createElement("div");
    // populate the div 
    newDiv.innerHTML = `
        <h3>Name: ${repoInfo.name}</h3>
            <p>Description: ${repoInfo.description}</p>
            <p>Default Branch: ${repoInfo.default_branch}</p>
            <p>Languages: ${languages.join(", ")}</p>
            <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
    `;
    repoData.append(newDiv);
};