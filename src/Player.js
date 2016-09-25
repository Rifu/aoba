import React, { Component } from 'react';
import './player.css';

class Player extends Component {
  constructor(){
    super();
    this.state = {
      playing: false
    };
    this.didPlay = this.didPlay.bind(this);
    this.didPause = this.didPause.bind(this);
    this.togglePause = this.togglePause.bind(this);
  }
  componentDidMount(){
    const audio = document.getElementById('aoba__player');
    audio.addEventListener('playing', this.didPlay);
    audio.addEventListener('pause', this.didPause);  
    console.log(this.state.playing)
  }
  didPlay(){
    this.setState({playing: true});
  }
  didPause(){
    this.setState({playing: false});
  }
  togglePause(){
    const audio = document.getElementById('aoba__player');
    if(this.state.playing){
      audio.pause();
    }else{
      audio.play();
    }   
  }
  render() {
    let ctrlBtn = "";
    console.log(this.state.playing)
    if(this.state.playing){
      ctrlBtn = "fa fa-pause"
    }else{
      ctrlBtn = "fa fa-play";
    }
    return (
      <div className="aoba__candyPlayer">
        <div className="player__controls">

          <i className={ctrlBtn} onClick={this.togglePause}></i>
        </div>
      </div>
    );
  }
}

export default Player;
