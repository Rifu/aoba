import React, { Component } from 'react';
import './aoba.css';
import VisualizerBar from './VisualizerBar.js';
const track = require('./LetsJump.mp3');

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

    source = audioCtx.createMediaElementSource(audio);
    frequencyData = new Uint8Array(analyser.frequencyBinCount);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    audio.play();
    this.renderAudioFrame();
  }
  renderAudioFrame(){
    requestAnimationFrame(this.renderAudioFrame);
    analyser.getByteFrequencyData(frequencyData);
    this.forceUpdate();
  }
  render() {
    let bars = [];
    frequencyData.forEach(function(value, i){
      if(i < 20 && value > 60){
        value = value - 50;
      }else if(i < 100 && value > 10){
        value = value + 20;
      }else if(i > 100 && value > 30){
        value = value + 70;
      }

      bars.push(<VisualizerBar key={i} pos={i} height={value} />);
    });
    return (
      <div>
        <div className="aoba__visualizer">
          {bars}
        </div>
        <audio id="aoba__player" className="aoba__player" src={track} controls>
        </audio>
      </div>
    );
  }
}

export default Aoba;
