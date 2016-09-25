import React, { Component } from 'react';

class VisualizerBar extends Component {
  render() {
    const barStyle = {
      height: this.props.height
    }
    return (
      <div className="visualizer__bar" style={barStyle}>
      </div>
    );
  }
}

export default VisualizerBar;
