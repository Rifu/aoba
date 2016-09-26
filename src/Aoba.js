import React, { Component } from 'react';
import './aoba.css';
import VisualizerBar from './VisualizerBar.js';

const track = require('./LetsJump.mp3');

const delta = 56;
let audio = null;
let audioCtx = null;
let analyser = null;
let source = null;
let audioFilter = null;
let frequencyData = new Uint8Array();

// const renderAudioFrame = () => {
//   requestAnimationFrame(renderAudioFrame);
//   analyser.getByteFrequencyData(frequencyData);
//   console.log(frequencyData.filter(function(value){
//     return value > 10;
//   }).length);
// }
class Aoba extends Component {
  constructor(){
    super();
    this.state = {
      currentPos: 0,
      duration: 0,
      currentMax: 0
    };
    this.renderAudioFrame = this.renderAudioFrame.bind(this);
  }
  componentDidMount(){
    audio = document.getElementById('aoba__player');

    audioCtx = new AudioContext();
    // audioFilter = audioCtx.createBiquadFilter();
    // audioFilter.type = "bandpass";
    // audioFilter.frequency.value = 250;
    analyser = audioCtx.createAnalyser();
    analyser.fftSize = 256;
    analyser.maxDecibels = -20;
    analyser.minDecibels = -90;
    analyser.smoothingTimeConstant = 0.42;
    source = audioCtx.createMediaElementSource(audio);
    frequencyData = new Uint8Array(analyser.frequencyBinCount);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    this.setState({
      duration: audio.duration
    })
    audio.play();
    this.renderAudioFrame();

    particlesJS.load('aoba__particles', "/particles-config.json");
  }
  renderAudioFrame(){
    requestAnimationFrame(this.renderAudioFrame);
    analyser.getByteFrequencyData(frequencyData);
    const maxValue = Math.max( ...frequencyData );
    if(audioCtx.currentTime < 2){
      this.setState({
        currentMax: 0,
        currentPos: audioCtx.currentTime
      })
    }else{
      if(maxValue > this.state.currentMax){
        this.setState({
          currentMax: maxValue,
          currentPos: audioCtx.currentTime
        });
      }else{
        this.setState({
          currentPos: audioCtx.currentTime
        });
      }
    }
  }
  render() {
    let bars = [];
    let currentMax = this.state.currentMax;
    let hasBeat = false;

    frequencyData.forEach(function(value, i){
      // if(i < 20 && value > 60){
      //   value = value - 50;
      // }else if(i < 75 && value > 10){
      //   value = value + 20;
      // }else if(i < 100 && value > 30){
      //   value = value + 70;
      // }else if(i > 100 && value > 0){
      //   value = value + 40;
      // }

      bars.push(<VisualizerBar key={i} pos={i} height={value} />);

      if(value > currentMax - delta){
        hasBeat = true
      }
    });

    let seekValue = 0;
    let seekStyle = {}
    if(audio !== null){
      seekValue = (audio.currentTime/audio.duration)*100;  
      seekStyle = {
        width: seekValue + "%"
      }
    }
    let aobaBeat = "aoba__beats";
    if(hasBeat){
      aobaBeat = "aoba__beats hasBeat";
    }

    return (
      <div className="aoba__visualizerContainer">
        <div id="aoba__particles" className={aobaBeat}>
        </div>
        <div className="aoba__visualizer">
          {bars}
        </div>
        <div className="player__seekContainer">
          {hasBeat}
          <div className="player__seek" style={seekStyle}>

          </div>
          <div className="player__seek--end">

          </div>
        </div>
      </div>
    );
  }
}

export default Aoba;
