import React from 'react';
import './TrackList.css';
import {Track} from '../Track/Track';

export class TrackList extends React.Component {
   

    render() {
        
        
        //console.log(this.props.track)
        let list = this.props.tracks.map(track1 => {
             
            return (
            <>
            <Track onRemove={this.props.onRemove} isRemoval={this.props.isRemoval} onAdd={this.props.onAdd} sTrack={track1} update={this.props.update}/>
            <br></br>
            </>
            )
        }
           
        ); 
        
        return (
            <div className="TrackList">
            
            {list} 
        </div>
            
        )
           
       
    }
}