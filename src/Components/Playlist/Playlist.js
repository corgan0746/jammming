import React from 'react';
import './Playlist.css';
import {TrackList} from '../TrackList/TrackList';

export class Playlist extends React.Component {
    constructor(props){
        super(props);

        

        this.handleNameChange = this.handleNameChange.bind(this);


    }
    handleNameChange(event) {
        console.log(event);
        this.props.onNameChange(event.nativeEvent.data);
    }
    render() {
        
        return (
            <div className="Playlist">
                <input onChange={this.handleNameChange} value={this.props.name} defaultValue={'New Playlist'}/>
                <p>{this.props.flag}</p>
                <TrackList onRemove={this.props.onRemove} isRemoval={true} tracks={this.props.tracks} />
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        );
    }
}