import React from 'react';
import './Track.css';

export class Track extends React.Component {
    constructor(props) {
        super(props);

        this.addTrack = this.addTrack.bind(this);

        this.removeTrack = this.removeTrack.bind(this);
    }
    addTrack(e) {
        //console.log(this.props)
        this.props.onAdd(this.props.sTrack);
    }
    removeTrack(e) {
        this.props.onRemove(this.props.sTrack);
    }
    renderAction() {
            
            if(this.props.isRemoval){
                return <button className='Track-action' onClick={this.removeTrack}>-</button>
            }else {
                return <button className='Track-action' onClick={this.addTrack}>+</button>
            }
        
    }
    render() {
        
        return (
            <div className="Track">
  <div className="Track-information">
    <h3> {this.props.sTrack.name}</h3>
    <p> {this.props.sTrack.artist} |  {this.props.sTrack.album} </p>
    
  </div>
  {this.renderAction()}
</div>
        );
    }
}