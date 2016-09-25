import React, { Component } from 'react';

class PlaylistTrack extends Component {
  render() {
    let buttonClass = "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored";
    if(this.props.currentTrackPos === this.props.pos){
      buttonClass = "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent"
    }
    return (
      <div className="playlist__track" onClick={this.props.onClick}>
        <button className={buttonClass}>
          {this.props.track.title}
        </button>
      </div>
    );
  }
}

export default PlaylistTrack;
