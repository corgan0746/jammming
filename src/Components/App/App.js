//import logo from './logo.svg';
import React from 'react';
import './App.css';
import {SearchBar} from '../SearchBar/SearchBar'
import {SearchResults} from '../SearchResults/SearchResults';
import {Playlist} from '../Playlist/Playlist';
import Spotify from '../../util/Spotify.js'


export class App extends React.Component {
  constructor(props){
    super(props);

   this.state = {searchResults: []
  , playlistName: '', playlistTracks: [], flag: 'Add tracks to this playlist'};

  this.addTrack = this.addTrack.bind(this);

  this.removeTrack = this.removeTrack.bind(this);

  this.updatePlaylistName = this.updatePlaylistName.bind(this);

  this.savePlaylist = this.savePlaylist.bind(this);
  
  this.search = this.search.bind(this);
  } 
  
  
  addTrack(song) {
    console.log('hello');
    console.log(this.state)
    let tracks = this.state.playlistTracks;
      if(tracks.find(savedTrack =>
      savedTrack.id === song.id )){
        return;
      } 
      tracks.push(song);
      this.setState({playlistTracks: tracks})
    console.log(this.state)
    //this.setState()
    this.setState({flag: ''});
  } 
  
  
  removeTrack(song) {
    let tracks = this.state.playlistTracks;
    if(tracks.indexOf(song) < 0){
      return;
    }
    let targetSong = tracks.indexOf(song);
    tracks.splice(targetSong, 1);
    this.setState({playlistTracks: tracks});
  }
  
  
  updatePlaylistName(newName) {
    let aux = this.state.playlistName;
    console.log(aux);
    if(newName === null){
      newName = aux.substring(0, aux.length-1);
    }else {
      newName = aux + newName;
    }
    this.setState({playlistName: newName});
  }



  async savePlaylist() {
   // let currentAccessTok = this.Spotify.
   let trackURIs = [];
   let accesstok = await Spotify.accessToken();
   let header = { Authorization: 'Bearer ' + accesstok};
   let userId = await Spotify.getUser();
   console.log(userId.id);
   let playlistRef;

   this.state.playlistTracks.forEach(element => {
    trackURIs.push(element.uri);
    //return element.uri
  })

  if(this.state.playlistName && trackURIs.length > 0){

   let nameP = JSON.stringify({name: this.state.playlistName});
   let query = await fetch(`https://api.spotify.com/v1/users/${userId.id}/playlists`, {method: 'POST',body: nameP, headers: header }).then(
     (res) => {
      return res.json();
     }).then((res1) => {
       playlistRef = res1.id;
       console.log(res1)    
       
      });

   trackURIs = JSON.stringify(trackURIs);
   let query2 = await fetch(`https://api.spotify.com/v1/playlists/${playlistRef}/tracks`, {method: 'POST',body: trackURIs, headers: header }).then(
    (res) => {
     return res.json();
    }).then((res1) => {
      console.log(res1)     });
      
    let query3 = await fetch(`https://api.spotify.com/v1/audio-features/4aYLAF6ckQ5ooGGGM7sWAa`, {method: 'GET', headers: header } ).then(
      (res) => {
       return res.json();
      }).then((res2) => {
        console.log(res2)     });
   /*if(this.state.playlistName && trackURIs){
   this.state.searchResults.forEach( track => {
     trackURIs.push(track);
     return;
   }) */
   console.log(trackURIs); 
   this.setState({playlistTracks: []});
  }else {
    return
  }

  
}


  async search(term){
    let newArr = [];
    let result = await Spotify.searchT(term);
     console.log(result);
     result.tracks.items.forEach( (element) => {
      
       let obj = {};
       obj.name = element.name;
       
       obj.artist = element.artists[0].name;
       obj.album = element.album.name;
       obj.id = element.id; 
       obj.uri = element.uri;
       if(this.state.playlistTracks.length !== 0) {
         
       for(let i=0;i<this.state.playlistTracks.length;i++){
         console.log(element.id);
         console.log(this.state.playlistTracks[i].id);
        
        if(element.id === this.state.playlistTracks[i].id){
          console.log('exist in list');
          return
        }
        if(i === this.state.playlistTracks.length - 1) {
          console.log('added');
          newArr.push(obj);
          return
        }
      }
      
       }else {
        newArr.push(obj);
       }
         
       
     })
     if(newArr.length > 10){
       newArr.splice(10);
     }
     console.log(newArr);
    this.setState({searchResults : newArr});


  }

  
  render() {
    
  return (
    <div>
  <h1>Ja<span className="highlight">mmm</span>ing</h1>
  <div className="App">
    <SearchBar onSearch={this.search} />
    
    <div className="App-playlist">
       <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults} update={this.addTrack} />
       <Playlist flag={this.state.flag} onSave={this.savePlaylist} onNameChange={this.updatePlaylistName} onRemove={this.removeTrack} name={this.state.playlistName} tracks={this.state.playlistTracks}/>
       
    </div>
  </div>
</div>
  );
  }


  componentDidUpdate(prevProps) {
    console.log(prevProps);
  }
  
}

export default App;
