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
    this.state = {
      currentPos: 0,
      duration: 0
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

    source = audioCtx.createMediaElementSource(audio);
    frequencyData = new Uint8Array(analyser.frequencyBinCount);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    this.setState({
      duration: audio.duration
    })
    audio.play();
    this.renderAudioFrame();
  }
  renderAudioFrame(){
    requestAnimationFrame(this.renderAudioFrame);
    analyser.getByteFrequencyData(frequencyData);
    this.setState({
      currentPos: audioCtx.currentTime
    });
  }
  render() {
    let bars = [];
    frequencyData.forEach(function(value, i){
      if(i < 20 && value > 60){
        value = value - 50;
      }else if(i < 75 && value > 10){
        value = value + 20;
      }else if(i < 100 && value > 30){
        value = value + 70;
      }else if(i > 100 && value > 0){
        value = value + 40;
      }

      bars.push(<VisualizerBar key={i} pos={i} height={value} />);
    });
    let seekValue = 0;
    let seekStyle = {}
    if(audio !== null){
      seekValue = (audio.currentTime/audio.duration)*100;  
      seekStyle = {
        width: seekValue + "%"
      }
    }
    
    return (
      <div className="aoba__visualizerContainer">
        <div className="aoba__visualizer">
          {bars}
        </div>
        <div className="player__seekContainer">
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
