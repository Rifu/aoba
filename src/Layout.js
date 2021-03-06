import React, { Component } from 'react';
import './layout.css';
import Player from './Player.js';
import Aoba from './Aoba.js';
const aoba = require('./aoba.png');

class Layout extends Component {
  render() {
    let imgClass = ""
    if(this.props.isLoading){
      imgClass = "loading"
    }

    return (
      <div>
        <div className="aoba__layout">
          <div className="aoba__candy">
            <Aoba />
            <Player title={this.props.title} />
            <img src={this.props.background} className={imgClass} />
          </div>
        </div>
      </div>
    );
  }
}

export default Layout;
