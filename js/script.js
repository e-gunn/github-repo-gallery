const overview = document.querySelector(".overview");
const username = "e-gunn";
const repoList = document.querySelector(".repo-list");

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
    let newDiv = document.createElement("div");
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
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page`);
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

