import React, { Component } from 'react';

class VisualizerBar extends Component {
  render() {
    const barStyle = {
      height: Math.max(0, this.props.height - 10)
    }
    return (
      <div className="visualizer__bar" style={barStyle}>
      </div>
    );
  }
}

export default VisualizerBar;
