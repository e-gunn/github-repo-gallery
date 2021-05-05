const overview = document.querySelector(".overview");
const username = "e-gunn";

// get information from github profile
const getProfile = async function () {
    const res = await fetch(`https://api.github.com/users/${username}`);
    const profile = await res.json();
    // console.log(profile);
    displayProfile(profile);
};
getProfile();

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