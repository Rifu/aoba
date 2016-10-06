import React, { Component } from 'react';
import './playlist.css';
import PlaylistTrack from './PlaylistTrack.js';
import Layout from './Layout.js';

const sakuraTrack = require('./SAKURASKIP.mp3');
const sakuraBg = require('./aoba.png');
const stayTrack = require('./StayAlive.mp3');
const stayBg = require('./emilia.png');
const letsTrack = require('./LetsJump.mp3');
const letsBg = require('./j-neration.png');
const radioTrack = require('./RadioHappy.mp3');
const radioBg = require('./yui.png');
const akariTrack = require('./UsushioGirl.mp3');
const akariBg = require('./akari.jpg');
const cyaronTrack = require('./yozora.mp3');
const cyaronBg = require('./cyaron.png');
const myucelTrack = require('./univerPage.mp3');
const myucelBg = require('./myucel.png');

const sakuraSkip = {
  title: "Sakura Skip",
  url: sakuraTrack,
  background: sakuraBg
}
const stayAlive = {
  title: "Stay Alive",
  url: stayTrack,
  background: stayBg
}
const letsJump = {
  title: "You - Let's Jump! (SOUNDSCVPE REMIX)",
  url: letsTrack,
  background: letsBg
}
const radioHappy = {
  title: "Radio Happy",
  url: radioTrack,
  background: radioBg
}
const cyaron = {
  title: "夜空はなんでも知ってるの？",
  url: cyaronTrack,
  background: cyaronBg
}
const usushioGirl = {
  title: "Usushio Girl",
  url: akariTrack,
  background: akariBg
}
const univerPage = {
  title: "ユニバーページ(y0c1e remix)",
  url: myucelTrack,
  background: myucelBg
}

let tracks = [univerPage, sakuraSkip, radioHappy, letsJump, cyaron, stayAlive, usushioGirl]

class Playlist extends Component {
  constructor(){
    super();
    //const initialPos = Math.floor(Math.random() * tracks.length);
    const initialPos = 0;
    this.state = {
      tracks: tracks,
      currentTrack: tracks[initialPos],
      currentTrackPos: initialPos,
      isLoading: false
    };
    this.playNext = this.playNext.bind(this);
  }
  componentDidMount(){
    const audio = document.getElementById('aoba__player');
    audio.addEventListener('ended', this.playNext);
    this.loadExternalTracks();
  }
  loadExternalTracks(){
    fetch("http://fuyukaide.su/tracks")
    .then(function(response){
      return response.json();
    }).then(function(response){
      response.tracks.forEach(function(item){
        let track = {
          title: item.title,
          url: item.url,
          background: item.background
        }

        tracks.push(item);
      });
      this.setState({
        tracks: tracks
      })
    }.bind(this));
  }
  handleClick(i, items){
    if(i !== this.state.currentTrackPos){
      this.setState({
        currentTrack: items[i],
        currentTrackPos: i,
        isLoading: true
      }, this.updatePlayer);
    }
  }
  playNext(){
    let nextPos = (this.state.currentTrackPos + 1) % this.state.tracks.length;
    this.handleClick(nextPos, this.state.tracks);
  }
  updatePlayer(){
    particlesJS.load('aoba__particles', "/particles-config.json");
    const audio = document.getElementById('aoba__player');
    audio.play();

    setTimeout(function(){
      this.setState({
        isLoading: false
      });
    }.bind(this), 1000);
  }

  render() {
    let tracksHolder = []
    let currentTrackPos = this.state.currentTrackPos;
    let tracks = this.state.tracks;

    this.state.tracks.forEach(function(track, i){
      tracksHolder.push(<PlaylistTrack track={track} key={i} pos={i} currentTrackPos={currentTrackPos} onClick={this.handleClick.bind(this, i, tracks)}/>);
    }.bind(this));

    return (
      <div className="aoba__layoutContainer">
        <div className="playlist__container">
          <header className="aoba__header">
            <div className="aoba__headerIcon">

            </div>
            <div className="aoba__headerTagline">
              今日も一日がんばるぞい
            </div>
          </header>
          {tracksHolder}
          <audio id="aoba__player" className="aoba__player" src={this.state.currentTrack.url} controls>
          </audio>
        </div>
        <Layout background={this.state.currentTrack.background} isLoading={this.state.isLoading} title={this.state.currentTrack.title} />
      </div>
    );
  }
}

export default Playlist;
