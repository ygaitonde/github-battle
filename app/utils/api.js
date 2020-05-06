import Battle from "../components/battle"

const id = "YOUR_CLIENT_ID"
const sec = "YOUR_SECRET_ID"
const params = `?client_id=${id}&client_secret=${sec}`


function getErrorMessage(message, username){
  if(message==='Not Found'){
    return `${username} doesn't exist`
  }
  return message
}

function getProfile(username){
  return fetch(`https://api.github.com/users/${username}`)
  .then((res)=>res.json())
  .then((profile) => {
    if (profile.message){
      throw new Error(getErrorMessage(profile.message, username))
    }

    return profile
  })
}

function getStarCount(repos){
  return repos.reduce((count,{stargazers_count})=>count+stargazers_count, 0)
}

function calculateScore(followers, repos){
  return (followers * 3) + getStarCount(repos)
}

function getRepos(username){
  return fetch(`https://api.github.com/users/${username}/repos${params}&per_page=100`)
  .then((res) => res.json())
  .then((repos) => {
    if(repos.message){
      throw new Error(getErrorMessage(profile.message, username))
    }

    return repos
  })
}

function getUserData(username){
  return Promise.all([getProfile(username), getRepos(username)]).then(([profile, repos])=>({
    profile,
    score: calculateScore(profile.followers, repos)

  }))
}

function sortPlayers(players){
  return players.sort((a,b)=>b.score-a.score)
}

export function battle(players){
  return Promise.all([
    getUserData(players[0]),
    getUserData(players[1])
  ]).then((results)=>sortPlayers(results))
}


export function fetchPopularRepos (language) {
    const endpoint = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`)
  
    return fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        if (!data.items) {
          throw new Error(data.message)
        }
  
        return data.items
      })
  }