//Recognize and take info input
//github form
const githubForm = document.getElementById('github-form');
//github form input
const nameInput= document.getElementById('search');
let userName= '';
//user & repo-list
const userList= document.getElementById('user-list');
const reposList = document.getElementById('repos-list');
//add event listener
githubForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    userName= nameInput.value.trim();
    if(userName){
        //clear previous results
        userList.innerHTML='';
        reposList.innerHTML='';
        searchGitHubUsers(userName);
    }

})

function searchGitHubUsers(userName){
    fetch(`https://api.github.com/search/users?q=${userName}`,{
    method:'GET',
    headers:{
        'Content-Type': 'application/json',
        'Accept':'application/vnd.github.v3+json',
    },
    })
    .then((response)=>response.json())
    .then((data)=>{
        if (data.items && data.items.length > 0) {
            data.items.forEach((user) => {
              const userItem = createUserItem(user);
              userList.appendChild(userItem);
            });
          } else {
            userList.innerHTML = '<li>No users found</li>';
          }
        })
        .catch((error) => {
          console.error('Error searching users:', error);
        })
};
function createUserItem(user) {
    const userItem = document.createElement('li');
    userItem.innerHTML = `
    <h4>${user.login}</h4>
    <img src="${user.avatar_url}" width="50" height="50">
    <a href="https://github.com/${user.login}" target="_blank">Link to Profile</a>
    `;
    //click on user to fetch and display their repositories
    userItem.addEventListener('click', () => {
        getUserRepositories(user.login);
    });
    return userItem;
}
function getUserRepositories(userName){
    fetch(`https://api.github.com/users/${userName}/repos`,{
    method:'GET',
    headers:{
        'Content-Type': 'application/json',
        'Accept':'application/vnd.github.v3+json',
    },
    })
    .then((response)=>response.json())
    .then((reposData)=>{
        if (reposData.length > 0) {
          reposList.innerHTML = ''; // Clear previous repositories
          reposData.forEach((repo) => {
            const repoItem = document.createElement('li');
            repoItem.innerHTML = `
              <a href="${repo.html_url}" target="_blank">${repo.name}</a>
            `;
            reposList.appendChild(repoItem);
          });
        } else {
          reposList.innerHTML = '<li>No repositories found for this user</li>';
        }
      })
      .catch((error) => {
        console.error('Error fetching user repositories:', error);
    });
};





