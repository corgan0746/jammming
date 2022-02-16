const client_id = '1edc4b8b80af42cca986d57acb804942';
const URI = 'http://localhost:3000/';
  
let userToken;

let Spotify = {
  searchT(term) {
    
    const access_token = Spotify.getAccessToken(); 
    let options = {method: 'GET', headers:{ Authorization: 'Bearer ' + access_token}};
    let query = fetch(`https://api.spotify.com/v1/search?type=track&q=${term}&limit=30`, options).then(
      res => {return res.json()}
    ).then(jsonRes => {return jsonRes;});
    console.log(query);
    return query;
    
    
  }
  ,
  async getUser(){
    const access_token = Spotify.getAccessToken(); 
    let options = {method: 'GET', headers:{ Authorization: 'Bearer ' + access_token}};
    let query = await fetch(`https://api.spotify.com/v1/me`, options).then(
      res => {return res.json()}
    ).then(jsonRes => {return jsonRes;});
    return query;
  }
  ,
  accessToken(){
    return userToken;
  }
  ,
getAccessToken() {
if(userToken) {
    return userToken;
}

const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);

const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);



if(accessTokenMatch && expiresInMatch) {
  
  userToken = accessTokenMatch[1];
  const expiresIn = Number(expiresInMatch[1]);

  window.setTimeout(() => userToken = '' , expiresIn * 1000);
  window.history.pushState('Access Token', null, '/');
  return userToken;
}else {
  
  const redirectUrl = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${URI}`;
  window.location.href = redirectUrl;
}

}


};

export default Spotify;

